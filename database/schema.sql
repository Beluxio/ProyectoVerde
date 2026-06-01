-- ============================================================
-- ProyectoVerde — Schema de Supabase (PostgreSQL + pgvector)
-- Ejecutar en el SQL Editor de Supabase en este orden
-- ============================================================

-- 1. Habilitar extensión de vectores para el RAG chatbot
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- CATÁLOGO DE PLANTAS
-- ============================================================
CREATE TABLE plants (
    id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug            text UNIQUE NOT NULL,
    name            text NOT NULL,
    scientific_name text,
    description     text NOT NULL,
    price           numeric(10,2) NOT NULL,
    stock           integer DEFAULT 0 CHECK (stock >= 0),

    -- Guía de cuidado
    care_water      text,
    care_light      text,
    care_temp_min   integer,
    care_temp_max   integer,
    care_substrate  text,
    care_humidity   text,
    care_fertilizer text,
    care_difficulty text CHECK (care_difficulty IN ('facil','media','dificil')),

    -- Contenido educativo
    psychological_benefits  text,
    medicinal_uses          text,
    geographical_origin     text,
    fun_facts               text,
    harmful_pests           text,   -- plagas comunes de esta planta
    recommended_repellents  text,   -- remedios orgánicos y químicos

    -- Clasificación
    category    text CHECK (category IN ('interior','exterior','suculenta','aromatica','medicinal','frutal','cactus','helecho','bambu')),
    size        text CHECK (size IN ('pequena','mediana','grande')),
    tags        text[],             -- ["purifica_aire","facil_cuidado","pet_friendly","poca_luz"]

    -- Imágenes (URLs de Supabase Storage)
    images      text[],
    main_image  text,

    -- Control
    is_active   boolean DEFAULT true,
    is_featured boolean DEFAULT false,
    created_at  timestamptz DEFAULT now(),
    updated_at  timestamptz DEFAULT now()
);

-- Índice para búsquedas por categoría y destacadas
CREATE INDEX idx_plants_category ON plants(category) WHERE is_active = true;
CREATE INDEX idx_plants_featured ON plants(is_featured) WHERE is_active = true;

-- ============================================================
-- PEDIDOS
-- ============================================================
CREATE TABLE orders (
    id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number    text UNIQUE NOT NULL DEFAULT 'PV-' || to_char(now(), 'YYYYMMDD') || '-' || floor(random()*9000+1000)::text,

    -- Datos del cliente
    customer_name   text NOT NULL,
    customer_email  text NOT NULL,
    customer_phone  text,
    shipping_address jsonb,          -- {calle, colonia, ciudad, estado, cp}

    -- Totales
    subtotal        numeric(10,2) NOT NULL,
    shipping_cost   numeric(10,2) DEFAULT 0,
    total_amount    numeric(10,2) NOT NULL,

    -- Estado y pago
    status          text DEFAULT 'pendiente'
                    CHECK (status IN ('pendiente','pagado','preparando','enviado','entregado','cancelado')),
    payment_id      text,            -- ID de Mercado Pago
    payment_method  text,            -- "tarjeta","oxxo","transferencia"
    payment_status  text,

    notes           text,
    created_at      timestamptz DEFAULT now(),
    updated_at      timestamptz DEFAULT now()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);

-- ============================================================
-- ITEMS DE PEDIDOS
-- ============================================================
CREATE TABLE order_items (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id    uuid REFERENCES orders(id) ON DELETE CASCADE,
    plant_id    uuid REFERENCES plants(id),
    plant_name  text NOT NULL,       -- snapshot del nombre al momento de compra
    plant_slug  text NOT NULL,
    quantity    integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price  numeric(10,2) NOT NULL,
    subtotal    numeric(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

-- ============================================================
-- ARTÍCULOS EDUCATIVOS / CONCIENTIZACIÓN
-- ============================================================
CREATE TABLE nature_articles (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug        text UNIQUE NOT NULL,
    title       text NOT NULL,
    content     text NOT NULL,       -- Markdown
    excerpt     text,
    cover_image text,
    author      text DEFAULT 'ProyectoVerde',
    category    text CHECK (category IN ('conservacion','beneficios','jardineria','biodiversidad','medicina_natural','fauna_nociva')),
    tags        text[],
    read_time   integer,             -- minutos estimados de lectura
    is_published boolean DEFAULT false,
    published_at timestamptz,
    created_at   timestamptz DEFAULT now(),
    updated_at   timestamptz DEFAULT now()
);

CREATE INDEX idx_articles_category ON nature_articles(category) WHERE is_published = true;

-- ============================================================
-- LOGS DEL CHATBOT (para mejorar el RAG con el tiempo)
-- ============================================================
CREATE TABLE chat_logs (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id  text NOT NULL,
    role        text NOT NULL CHECK (role IN ('user','assistant')),
    content     text NOT NULL,
    plant_slug  text,                -- si la pregunta fue sobre una planta específica
    tool_used   text,                -- qué herramienta del agente se usó
    sources     text[],              -- fragmentos del knowledge base que se usaron
    created_at  timestamptz DEFAULT now()
);

CREATE INDEX idx_chat_logs_session ON chat_logs(session_id);

-- ============================================================
-- KNOWLEDGE BASE DEL RAG (pgvector)
-- Tabla donde se guardan los fragmentos de documentos con sus embeddings
-- ============================================================
CREATE TABLE plant_knowledge (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    content     text NOT NULL,                    -- texto del fragmento
    embedding   vector(1536),                     -- OpenAI text-embedding-3-small
    source_file text,                             -- "cuidado_plantas/cactus.md"
    category    text CHECK (category IN ('cuidado','medicina','plagas','botanica','general')),
    plant_slug  text,                             -- NULL si es conocimiento general
    chunk_index integer,                          -- posición del chunk en el doc original
    created_at  timestamptz DEFAULT now()
);

-- Índice vectorial para búsqueda semántica eficiente
CREATE INDEX ON plant_knowledge
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);

-- ============================================================
-- SUSCRIPTORES A NEWSLETTER (opcional, para marketing)
-- ============================================================
CREATE TABLE newsletter_subscribers (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email       text UNIQUE NOT NULL,
    name        text,
    is_active   boolean DEFAULT true,
    source      text DEFAULT 'web',   -- "web","chatbot","qr"
    created_at  timestamptz DEFAULT now()
);

-- ============================================================
-- FUNCIÓN: actualizar updated_at automáticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER plants_updated_at BEFORE UPDATE ON plants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER articles_updated_at BEFORE UPDATE ON nature_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — seguridad básica
-- ============================================================
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE nature_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Plantas y artículos: lectura pública
CREATE POLICY "plantas_lectura_publica" ON plants FOR SELECT USING (is_active = true);
CREATE POLICY "articulos_lectura_publica" ON nature_articles FOR SELECT USING (is_published = true);

-- Pedidos: solo el backend (service role) puede insertar/leer
CREATE POLICY "ordenes_solo_servicio" ON orders
    USING (auth.role() = 'service_role');
CREATE POLICY "order_items_solo_servicio" ON order_items
    USING (auth.role() = 'service_role');

-- Chat logs: inserción pública (cualquier usuario puede chatear), lectura solo service
CREATE POLICY "chat_logs_insertar" ON chat_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "chat_logs_leer_servicio" ON chat_logs FOR SELECT USING (auth.role() = 'service_role');

-- Knowledge base: solo el backend (para el RAG)
CREATE POLICY "knowledge_solo_servicio" ON plant_knowledge
    USING (auth.role() = 'service_role');

-- Newsletter: inserción pública
CREATE POLICY "newsletter_insertar" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ============================================================
-- FUNCIÓN RPC para búsqueda vectorial (usada por el RAG service)
-- ============================================================
CREATE OR REPLACE FUNCTION search_plant_knowledge(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.75,
    match_count int DEFAULT 5,
    filter_category text DEFAULT NULL
)
RETURNS TABLE (
    id uuid,
    content text,
    source_file text,
    category text,
    plant_slug text,
    similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        pk.id,
        pk.content,
        pk.source_file,
        pk.category,
        pk.plant_slug,
        1 - (pk.embedding <=> query_embedding) AS similarity
    FROM plant_knowledge pk
    WHERE
        (filter_category IS NULL OR pk.category = filter_category)
        AND 1 - (pk.embedding <=> query_embedding) > match_threshold
    ORDER BY pk.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;
