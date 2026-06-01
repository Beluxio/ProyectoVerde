// Tipos TypeScript de ProyectoVerde
// Contrato de datos entre frontend y Supabase

export type PlantCategory =
  | "interior"
  | "exterior"
  | "suculenta"
  | "aromatica"
  | "medicinal"
  | "frutal"
  | "cactus"
  | "helecho"
  | "bambu";

export type PlantSize = "pequena" | "mediana" | "grande";
export type PlantDifficulty = "facil" | "media" | "dificil";

export interface Plant {
  id: string;
  slug: string;
  name: string;
  scientific_name: string | null;
  description: string;
  price: number;
  stock: number;

  // Cuidados
  care_water: string | null;
  care_light: string | null;
  care_temp_min: number | null;
  care_temp_max: number | null;
  care_substrate: string | null;
  care_humidity: string | null;
  care_fertilizer: string | null;
  care_difficulty: PlantDifficulty | null;

  // Contenido educativo
  psychological_benefits: string | null;
  medicinal_uses: string | null;
  geographical_origin: string | null;
  fun_facts: string | null;
  harmful_pests: string | null;
  recommended_repellents: string | null;

  // Clasificación
  category: PlantCategory | null;
  size: PlantSize | null;
  tags: string[] | null;

  // Imágenes
  images: string[] | null;
  main_image: string | null;

  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | "pendiente"
  | "pagado"
  | "preparando"
  | "enviado"
  | "entregado"
  | "cancelado";

export interface ShippingAddress {
  calle: string;
  colonia: string;
  ciudad: string;
  estado: string;
  cp: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: ShippingAddress | null;
  subtotal: number;
  shipping_cost: number;
  total_amount: number;
  status: OrderStatus;
  payment_id: string | null;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  plant_id: string;
  plant_name: string;
  plant_slug: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export type ArticleCategory =
  | "conservacion"
  | "beneficios"
  | "jardineria"
  | "biodiversidad"
  | "medicina_natural"
  | "fauna_nociva";

export interface NatureArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  category: ArticleCategory;
  tags: string[] | null;
  read_time: number | null;
  is_published: boolean;
  published_at: string | null;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Item del carrito (estado local con Zustand)
export interface CartItem {
  plant: Pick<Plant, "id" | "slug" | "name" | "price" | "main_image" | "stock">;
  quantity: number;
}
