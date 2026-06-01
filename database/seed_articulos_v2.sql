-- ============================================================
-- ProyectoVerde — 4 artículos nuevos para /naturaleza
-- Ejecutar en Supabase SQL Editor
-- ============================================================

INSERT INTO nature_articles (slug, title, excerpt, content, category, tags, read_time, is_published, published_at) VALUES

-- 1. PLAGAS COMUNES
(
    'plagas-comunes-plantas-interior',
    'Las 5 plagas más comunes en plantas de interior y cómo combatirlas sin químicos',
    'Cochinilla, araña roja, pulgones, trips y mosca blanca. Aprende a identificarlas a tiempo y eliminarlas con remedios orgánicos que ya tienes en casa.',
    '# Las 5 plagas más comunes en plantas de interior

Tener plantas en casa es una alegría — hasta que aparece una plaga. La buena noticia: si la detectas temprano, casi siempre puedes resolverla con ingredientes de tu cocina. Sin químicos, sin gastos innecesarios.

## Por qué aparecen las plagas

Las plagas no atacan plantas sanas al azar. Aparecen cuando hay:
- **Estrés hídrico**: riego irregular o excesivo
- **Poca luz**: plantas que no reciben la luz que necesitan
- **Baja humedad**: ambientes muy secos favorecen arañas rojas
- **Plantas hacinadas**: sin circulación de aire
- **Plantas nuevas sin cuarentena**: la causa número uno

**Regla de oro**: cuando traigas una planta nueva a casa, ponla en cuarentena 2 semanas alejada de las demás.

---

## 1. Cochinilla Harinosa

**Cómo se ve**: Masas blancas y algodonosas en las uniones de tallos, debajo de las hojas y en las raíces. La planta se debilita y las hojas amarillean.

**Tratamiento orgánico**:
- Alcohol isopropílico al 70% con un cotonete directo sobre cada insecto
- Jabón potásico diluido (2-3 ml por litro) en spray sobre toda la planta
- Aceite de neem + jabón neutro + agua (5 ml + 2 ml + 1 litro)
- Repetir cada 5-7 días durante 3-4 semanas

**Prevención**: Inspección semanal, especialmente en plantas suculentas, cactus y orquídeas.

---

## 2. Araña Roja

**Cómo se ve**: Puntitos amarillos o plateados en las hojas, telas finísimas en el envés, especialmente en clima seco. Las hojas pierden color y caen.

**Tratamiento orgánico**:
- **Aumentar la humedad ambiental** es el paso más importante — las arañas rojas odian la humedad
- Duchear la planta con agua a presión moderada para retirarlas físicamente
- Aceite de neem al envés de las hojas (repite cada 5 días)
- Jabón potásico en spray, especialmente al envés

**Prevención**: Nebulizar las plantas en verano o con calefacción encendida. El ambiente seco es su mejor aliado.

---

## 3. Pulgones (Áfidos)

**Cómo se ve**: Grupos de insectos pequeños (verdes, negros o amarillos) en brotes tiernos y flores. Las hojas se enrollan y aparece una sustancia pegajosa (melaza).

**Tratamiento orgánico**:
- Chorro de agua a presión para retirarlos físicamente
- Jabón de Castilla o jabón potásico (20 gotas por litro de agua)
- Infusión de ajo y chile: 1 cabeza de ajo + 2 chiles hervidos en agua, colar y aplicar en spray
- Si tienes jardín: introduce mariquitas — son sus depredadores naturales

**Prevención**: Plantar albahaca o lavanda cerca. Los pulgones aborrecen estos aromas.

---

## 4. Trips

**Cómo se ve**: Rayaduras plateadas en las hojas, pequeños puntos negros (excrementos), flores y brotes deformados. Son muy pequeños y rápidos.

**Tratamiento orgánico**:
- Trampas adhesivas azules (son irresistibles para los trips)
- Aceite de neem al envés de las hojas, 2 veces por semana
- Spinosad orgánico (derivado de bacteria del suelo, disponible en viveros)
- Nemátodos entomopatógenos en el sustrato — atacan las larvas en la tierra

**Prevención**: Cuarentena estricta de plantas nuevas. Los trips viajan en ropa, pelo y viento.

---

## 5. Mosca Blanca

**Cómo se ve**: Nube de pequeñas moscas blancas al mover la planta. Hojas amarillas y pegajosas. Las larvas se adhieren al envés y succionan la savia.

**Tratamiento orgánico**:
- Trampas amarillas pegajosas (altamente efectivas — una por planta)
- Jabón potásico en spray al envés, 2 veces por semana
- Aceite de neem + jabón semanal
- Extracto de canela como repelente natural

**Prevención**: Trampas amarillas preventivas. Evitar exceso de nitrógeno que genera hojas blandas que les encantan.

---

## El kit anti-plagas que deberías tener en casa

Con solo estos 4 ingredientes puedes tratar el 90% de las plagas caseras:

1. **Aceite de neem** — el insecticida orgánico más versátil
2. **Jabón potásico** — daña la membrana de los insectos
3. **Alcohol isopropílico** — para cochinilla y trips directamente
4. **Trampas adhesivas** (amarillas + azules) — monitoreo y control

Recuerda: aplica siempre por la mañana o al atardecer, nunca bajo sol directo. Y si tienes dudas, pregúntale a **VerdBot** — nuestro chatbot botanico te ayudará a identificar exactamente qué tiene tu planta.
',
    'fauna_nociva',
    ARRAY['plagas','organico','cochinilla','araña_roja','pulgones','interior'],
    8,
    true, now()
),

-- 2. PLANTAS PARA OFICINA
(
    'plantas-perfectas-para-oficina',
    '7 plantas perfectas para tu oficina o escritorio (y por qué mejoran tu trabajo)',
    'La ciencia confirma que tener plantas en tu espacio de trabajo aumenta la productividad hasta un 15% y reduce el estrés laboral. Estas son las mejores opciones para cada tipo de oficina.',
    '# 7 plantas perfectas para tu oficina

Un estudio de la Universidad de Exeter encontró que los empleados que trabajaban en oficinas con plantas tenían un **15% más de productividad**, mejor memoria de trabajo y menores niveles de estrés que quienes trabajaban en espacios sin plantas.

No es magia. Es biología: nuestro sistema nervioso evolucionó rodeado de naturaleza. Cuando la ve, se relaja.

## Cómo elegir la planta correcta para tu espacio

Antes de elegir, hazte estas preguntas:
- ¿Cuánta luz natural tiene tu espacio? (mucha / poca / artificial)
- ¿Puedes regar con frecuencia o prefieres olvidarte?
- ¿Hay aire acondicionado o calefacción constante?

---

## 1. ZZ Plant — Para oficinas sin ventana

La campeona absoluta de la baja luz. Prospera incluso con iluminación artificial y puede pasar semanas sin riego. Sus hojas verde brillante casi parecen hechas de plástico. Ideal para cubículos y pasillos.

**Luz necesaria**: Mínima
**Riego**: Cada 2-3 semanas
**Bonus**: Purifica xileno y tolueno del aire

---

## 2. Pothos Dorado — Para escritorios con poca luz

El clásico indestructible. Su crecimiento colgante hacia abajo es relajante visualmente, y su capacidad de purificar el aire es de las más altas documentadas. Funciona en cualquier nivel de luz.

**Luz necesaria**: Baja a media
**Riego**: Cada 7-10 días
**Bonus**: Elimina formaldehído del aire

---

## 3. Sansevieria — Para dormitorios y habitaciones

Libera oxígeno durante la noche (no durante el día como la mayoría), lo que mejora la calidad del sueño. Perfecta en el buró. Imposible matarla por olvido.

**Luz necesaria**: Cualquiera
**Riego**: Cada 2-3 semanas
**Bonus**: Oxígeno nocturno, mejor sueño

---

## 4. Romero — Para escritorios de estudio

Si tienes luz suficiente, el romero es la planta de estudio por excelencia. Su aroma mejora la memoria y la concentración según estudios científicos reales. Bonus: puedes usarlo en tu cocina.

**Luz necesaria**: Sol directo o muy brillante
**Riego**: Escaso
**Bonus**: Mejora memoria un 75% según estudios

---

## 5. Violeta Africana — Para espacios con luz artificial

Florece perfectamente bajo luz fluorescente o LED. Sus flores constantes generan bienestar visual sin requerir sol natural. Pequeña y ordenada, no ocupa espacio.

**Luz necesaria**: Artificial funciona
**Riego**: Por la base, cada semana
**Bonus**: Flores todo el año

---

## 6. Calathea — Para reuniones y salas de espera

Sus hojas decorativas con patrones únicos son conversación visual. Perfecta para impresionar clientes o crear ambientes de reunión más humanos y creativos.

**Luz necesaria**: Indirecta media
**Riego**: Regular con agua sin cloro
**Bonus**: Pet-friendly, 100% no tóxica

---

## 7. Suculentas — Para el escritorio con mucho sol

Si tienes una ventana con sol directo, un grupo de suculentas es la solución perfecta. Requieren riego mensual y el sol que nadie más quiere. Coleccionables y con personalidad propia.

**Luz necesaria**: Sol directo
**Riego**: Mensual
**Bonus**: Satisfacción de coleccionar

---

## Tip final: el efecto multiplicador

Un estudio de la Universidad de Exeter encontró que el efecto positivo en productividad y bienestar aumentaba proporcionalmente al número de plantas visibles. No es cuestión de tener una planta perfecta — es crear un entorno con múltiples plantas en el campo visual.

Empieza con una. Luego agrega otra. Tu cerebro te lo agradecerá.',
    'beneficios',
    ARRAY['oficina','productividad','poca_luz','escritorio','bienestar'],
    7,
    true, now()
),

-- 3. JARDÍN VERTICAL
(
    'como-hacer-jardin-vertical-en-casa',
    'Cómo hacer un jardín vertical en casa con plantas fáciles (y por qué cambia todo)',
    'Los jardines verticales son la solución perfecta para espacios pequeños. Más que decoración, son ecosistemas vivos que transforman paredes vacías en fuentes de bienestar, aire limpio y alimento.',
    '# Cómo hacer un jardín vertical en casa

¿Sin espacio para un jardín? La pared es espacio. Un jardín vertical puede transformar cualquier muro vacío en un ecosistema vivo que purifica el aire, regula la temperatura y cambia completamente la energía de un espacio.

## ¿Por qué un jardín vertical?

- **Purificación de aire**: múltiples plantas trabajando juntas multiplican el efecto
- **Regulación de temperatura**: reduce hasta 3°C la temperatura de la pared
- **Reducción del ruido**: las plantas absorben sonido
- **Bienestar visual**: una pared verde reduce el estrés cada vez que la ves
- **Alimento propio**: con hierbas aromáticas, tienes condimentos frescos

## Los 3 sistemas principales

### 1. Sistema de bolsillos de tela
El más económico y versátil. Bolsillos de fieltro colgados en la pared.
- **Costo**: $200-500 MXN para empezar
- **Plantas ideales**: Pothos, helechos, suculentas, hierbas

### 2. Módulos plásticos tipo puzzle
Piezas individuales que se conectan entre sí. Puedes expandir por secciones.
- **Costo**: $500-1,500 MXN
- **Plantas ideales**: Plantas de raíz compacta, suculentas, lechugas

### 3. Macetas colgantes en riel
El más elegante visualmente. Un riel de metal del que cuelgan macetas a diferentes alturas.
- **Costo**: $800-2,500 MXN
- **Plantas ideales**: Plantas colgantes, hierbas, flores

## Las mejores plantas para jardín vertical

**Zona alta** (más luz, menos acceso):
- Pothos y philodendron (cuelgan hacia abajo magnificamente)
- Tradescantia (crece rápido, colorida)

**Zona media** (balance de luz):
- Helechos de Boston (humidificadores naturales)
- Hierbas aromáticas: menta, albahaca, tomillo, romero

**Zona baja** (más sombra, fácil acceso):
- Suculentas y cactus pequeños
- Plantas que se riegan frecuentemente (fácil alcance)

## Cuidados esenciales del jardín vertical

**Riego**: El reto principal. El agua fluye hacia abajo, así que riega empezando desde arriba. Los sistemas de goteo automatizados son la solución ideal.

**Sustrato**: Usa sustrato ligero para que las paredes no soporten mucho peso. Mezcla tierra + perlita en partes iguales.

**Fertilización**: Los sustratos se agotan más rápido. Fertilizante líquido diluido mensualmente es suficiente.

**Renovación**: Cada 12-18 meses, retira las plantas que no prosperaron y reemplázalas. Los jardines verticales son sistemas vivos que evolucionan.

## El impacto real en tu hogar

Una pared verde de 1 metro cuadrado con 20 plantas equivale en purificación de aire a tener esas 20 plantas individuales distribuidas en tu hogar. La concentración multiplica el efecto.

Y visualmente, no hay decoración que se acerque al impacto de una pared viva. Una vez que tienes jardín vertical, el resto de la decoración pasa a segundo plano.',
    'jardineria',
    ARRAY['jardin_vertical','pequenos_espacios','hierbas','interior','diy'],
    6,
    true, now()
),

-- 4. PLANTAS PET-FRIENDLY
(
    'plantas-seguras-para-mascotas',
    'Plantas seguras para hogares con mascotas — y cuáles evitar absolutamente',
    'El 70% de las plantas más populares de decoración son tóxicas para perros y gatos. Aprende cuáles son completamente seguras y cómo crear un jardín hermoso sin poner en riesgo a tu mascota.',
    '# Plantas seguras para hogares con mascotas

Si tienes perros o gatos en casa, elegir tus plantas es una decisión de seguridad. Muchas de las plantas más populares de decoración —pothos, filodendros, lirios— pueden causar desde irritación hasta falla renal en mascotas.

La buena noticia: hay docenas de plantas hermosas completamente seguras.

## Las plantas MÁS PELIGROSAS (evítalas con mascotas)

Estas plantas son comúnmente vendidas pero pueden ser letales:

- **Pothos y Filodendro**: Contienen oxalatos de calcio. Irritación severa en boca, esófago y estómago. Pueden causar dificultad para respirar.
- **Lirio de paz (Spathiphyllum)**: Tóxico para gatos. Puede causar falla renal.
- **Aloe Vera**: Tóxico para perros y gatos al ingerirse. Causa vómito y diarrea.
- **ZZ Plant (Zamioculcas)**: Todas sus partes son tóxicas si se ingieren.
- **Nochebuena**: Su látex irrita la boca y el sistema digestivo.
- **Cactus columnares con látex (Euforbiáceas)**: El látex es tóxico.

> Si tu mascota consume alguna de estas plantas, contacta inmediatamente a tu veterinario.

## Las plantas 100% seguras (certificadas por ASPCA)

La ASPCA (American Society for the Prevention of Cruelty to Animals) mantiene una base de datos de plantas tóxicas y no tóxicas. Estas son completamente seguras:

### Para interior:

🟢 **Calathea / Maranta** — Completamente no tóxica. Sus hojas decorativas son seguras incluso si tu gato las mastica.

🟢 **Orquídea Phalaenopsis** — Segura para perros y gatos. Ninguna parte es tóxica.

🟢 **Haworthia** (suculenta de interior) — Safe para todas las mascotas.

🟢 **Helechos de Boston** — No tóxico. El problema es que los gatos los aman y los destrozan para jugar.

🟢 **Bromelia** — Completamente segura y muy decorativa.

🟢 **Clorofito** (cintas) — Seguro, aunque puede tener efecto alucinógeno leve en gatos (similar a la hierba gatera).

### Para exterior:

🟢 **Girasoles** — Seguros para perros y gatos.

🟢 **Cempasúchil (Tagetes)** — Seguro para mascotas y repele insectos.

🟢 **Rosas** — Las flores son seguras, pero cuida las espinas.

🟢 **Hierbas aromáticas** (romero, tomillo, albahaca) — Seguras. El gato puede masticarlas sin problema.

## Estrategias para tener plantas "peligrosas" con mascotas

Si ya tienes plantas tóxicas y no quieres deshacerte de ellas:

1. **Colócalas en altura** — En repisas o colgantes donde tu mascota no pueda alcanzarlas
2. **Macetas pesadas difíciles de voltear** — Los gatos voltean macetas por accidente
3. **Gel repelente natural** — Cáscaras de cítricos o lavanda cerca de las macetas
4. **Zona prohibida con barrera** — Un área de la casa exclusiva para plantas que la mascota no accede

## Crear un "jardín mascota" en tu hogar

Una tendencia creciente es crear un rincón especial con plantas que la mascota SÍ puede interactuar:

- **Hierba gatera (Nepeta cataria)** — Para gatos: euforia garantizada
- **Hierba de trigo (wheatgrass)** — Digestiva para perros y gatos
- **Menta** — Segura y a los gatos les encanta olerla
- **Salvia** — Segura y aromática

Tener un espacio propio de plantas reduce el interés de la mascota por las demás plantas del hogar.

---

*Ante cualquier duda sobre si una planta específica es segura, consulta la base de datos de la ASPCA en aspca.org/pet-care/animal-poison-control o contacta a tu veterinario.*',
    'conservacion',
    ARRAY['mascotas','perros','gatos','toxicas','seguras','pet_friendly'],
    8,
    true, now()
);

-- Verificar artículos totales
SELECT COUNT(*) as total_articulos FROM nature_articles WHERE is_published = true;
