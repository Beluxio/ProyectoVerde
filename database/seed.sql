-- ============================================================
-- ProyectoVerde — Datos iniciales: 10 plantas mexicanas
-- Ejecutar DESPUÉS de schema.sql
-- ============================================================

INSERT INTO plants (
    slug, name, scientific_name, description, price, stock,
    care_water, care_light, care_temp_min, care_temp_max, care_substrate, care_humidity, care_fertilizer, care_difficulty,
    psychological_benefits, medicinal_uses, geographical_origin, fun_facts, harmful_pests, recommended_repellents,
    category, size, tags, is_active, is_featured
) VALUES

-- 1. Pothos / Epipremno
(
    'pothos-dorado',
    'Pothos Dorado',
    'Epipremnum aureum',
    'Una de las plantas de interior más populares y resistentes. Sus hojas moteadas de verde y dorado alegran cualquier espacio. Perfecta para principiantes: perdona el olvido y se adapta a casi cualquier condición de luz.',
    120.00, 25,
    'Riego moderado cada 7-10 días. Deja secar el 50% del sustrato entre riegos. En invierno, cada 14 días.',
    'Tolera luz indirecta brillante hasta sombra parcial. Evita el sol directo que quema las hojas.',
    15, 32,
    'Sustrato universal con buena drenabilidad. Mezcla 70% tierra + 30% perlita.',
    'Media. Aprecia humedad pero no la exige.',
    'Fertilizante líquido balanceado (20-20-20) cada 30 días en temporada de crecimiento (primavera-verano).',
    'facil',
    'Reduce el estrés y la ansiedad al purificar el aire de toxinas como formaldehído y benceno. Estudios de la NASA confirman que mejora la calidad del aire interior, lo que favorece la concentración y la calidad del sueño.',
    'Aunque no es medicinal, el aire que purifica beneficia el sistema respiratorio. En aromaterapia ambiental, los espacios con plantas como el pothos generan sensación de calma.',
    'Originario de las Islas Salomón, ampliamente naturalizado en regiones tropicales de México como Veracruz, Tabasco y la costa del Pacífico. Crece silvestre trepando árboles en selvas húmedas.',
    'Puede trepar más de 40 metros en la naturaleza. En agua, su tallo puede enraizar en días, lo que la convierte en la planta perfecta para propagación. Las variedades doradas son más comunes en cultivo que en la naturaleza.',
    'Cochinilla harinosa, araña roja y trips son sus principales amenazas.',
    'Para cochinilla: jabón potásico diluido. Para araña roja: neem oil + agua + jabón neutro. Preventivo: aumentar humedad ambiental.',
    'interior', 'pequena',
    ARRAY['purifica_aire','facil_cuidado','poca_luz','trepadoras','propagacion_facil'],
    true, true
),

-- 2. Sábila / Aloe Vera
(
    'aloe-vera',
    'Sábila (Aloe Vera)',
    'Aloe barbadensis miller',
    'La planta medicinal por excelencia. Su gel interior es un tesoro natural para la piel, quemaduras y el sistema digestivo. Absolutamente resistente, ideal para personas que viajan frecuentemente o olvidan regar.',
    95.00, 40,
    'Riego muy escaso: cada 14-21 días en verano, cada 30-45 días en invierno. Es suculenta — el exceso de agua la mata.',
    'Pleno sol o luz indirecta brillante. Mínimo 4-6 horas de luz al día.',
    5, 38,
    'Mezcla especial para cactus/suculentas o tierra + 50% arena gruesa + grava.',
    'Baja. Ambiente seco la favorece, como su hábitat natural desértico.',
    'Fertilizante para cactus muy diluido, solo en primavera y verano, 1 vez por mes.',
    'facil',
    'Las plantas suculentas como el aloe reducen el cansancio visual en espacios de trabajo. Su presencia evoca resiliencia y fortaleza, cualidades que el subconsciente asocia positivamente. En terapia hortícola se usa para trabajar la paciencia.',
    'El gel fresco es antiinflamatorio y cicatrizante comprobado. Usos: quemaduras solares, irritaciones cutáneas, psoriasis leve, estreñimiento (gel interno con precaución), reflujo gástrico. Rico en vitaminas B12, C, E y antioxidantes.',
    'Originaria de la Península Arábiga, ampliamente cultivada en todo México, especialmente en estados áridos como Oaxaca, Guerrero, San Luis Potosí y Sonora. Es planta sagrada en muchas culturas mesoamericanas.',
    'Una hoja de aloe puede producir suficiente gel para tratar una quemadura grande. Los aztecas la llamaban "la varita del cielo". México es uno de los principales exportadores mundiales de gel de aloe vera.',
    'Pudrición radicular por exceso de riego es su principal enemigo. Cochinilla ocasionalmente.',
    'Preventivo: asegurar drenaje perfecto y maceta con agujeros. Para cochinilla: alcohol isopropílico con algodón directo sobre el insecto.',
    'suculenta', 'pequena',
    ARRAY['medicinal','sin_riego_frecuente','sol_directo','pet_safe','propagacion_facil'],
    true, true
),

-- 3. Lavanda
(
    'lavanda',
    'Lavanda',
    'Lavandula angustifolia',
    'La reina de las plantas aromáticas. Sus espigas moradas no solo son visualmente espectaculares, sino que perfuman el ambiente y ahuyentan naturalmente mosquitos e insectos. Perfecta en exterior soleado.',
    150.00, 15,
    'Riego moderado cuando el sustrato esté seco. Es tolerante a la sequía una vez establecida. Evita el exceso de agua.',
    'Pleno sol, mínimo 6-8 horas de luz directa. No prospera en sombra.',
    -15, 35,
    'Sustrato muy bien drenado, ligeramente alcalino. Mezcla tierra + 40% arena + algo de cal.',
    'Baja. La prefiere seca. Alta humedad favorece hongos.',
    'Poca fertilización. Exceso de nutrientes reduce el aroma. Compost leve en primavera.',
    'media',
    'El aroma de la lavanda es uno de los más estudiados en aromaterapia. Reduce el cortisol (hormona del estrés), mejora la calidad del sueño, alivia la ansiedad y ayuda contra cefaleas tensionales. Tiene efecto ansiolítico comprobado clínicamente.',
    'Aceite esencial: ansiolítico, relajante, antiséptico, antifúngico. Flores secas en almohadas mejoran el insomnio. Infusión para estrés y dolores de cabeza. Aplicación tópica para cicatrización.',
    'Originaria del Mediterráneo. En México se cultiva exitosamente en zonas de clima semi-árido y templado: Hidalgo, Puebla, Estado de México, Baja California y zonas altas de Oaxaca.',
    'La lavanda atrae abejas y mariposas, siendo fundamental para la polinización local. Los romanos la usaban para perfumar baños públicos. El nombre viene del latín "lavare" (lavar).',
    'Mosca de la lavanda, caracoles y pudrición por exceso de humedad.',
    'Repelente natural contra mosquitos: aceite esencial puro. Para plagas: bacillus thuringiensis (BT) orgánico. Preventivo: buena circulación de aire.',
    'aromatica', 'pequena',
    ARRAY['aromatica','repelente_insectos','medicinal','mariposas','exterior'],
    true, true
),

-- 4. Cactus San Pedro
(
    'cactus-san-pedro',
    'Cactus Candelabro',
    'Euphorbia ingens',
    'Majestuoso cactus columnnar que puede alcanzar alturas impresionantes. Sus siluetas arquitectónicas son tendencia en decoración moderna. Requiere mínima atención y vive décadas con los cuidados básicos.',
    180.00, 12,
    'Riego muy escaso: cada 3 semanas en verano, nulo o casi nulo en invierno. Suculento adaptado a la sequía.',
    'Pleno sol o luz muy brillante. Sin luz suficiente se etiolará (crece delgado y débil).',
    10, 40,
    'Sustrato para cactus con alto drenaje. Mezcla tierra + 60% arena + grava volcánica.',
    'Muy baja. Ambiente seco es ideal.',
    'Casi nula. Fertilizante para cactus muy diluido, solo en primavera, 1 vez.',
    'facil',
    'Los cactus simbolizan resiliencia y adaptación, cualidades que su presencia refuerza subliminalmente. Cuidar un cactus enseña sobre los propios límites y el autorespeto. En psicología positiva se usan como metáfora de fortaleza interior.',
    'El látex de algunas euforbiáceas tiene propiedades que se estudian contra células cancerígenas (uso experimental, no casero). La savia es irritante — no consumir. El simple acto de cuidarlos tiene efectos meditiativos.',
    'Nativa de África oriental y del sur. Ampliamente cultivada en zonas áridas de México: Sonora, Chihuahua, Baja California, Querétaro y Puebla, donde el clima seco replica su hábitat.',
    'Puede vivir más de 200 años. Crece apenas 15-20 cm por año. La euforbiaceo contiene latex tóxico — usar guantes al manipular. Es excelente capturador de CO2 durante la noche (metabolismo CAM).',
    'Cochinilla harinosa entre las costillas y pudrición basal por encharcamiento.',
    'Cochinilla: pincel con alcohol isopropílico. Pudrición: mejorar drenaje, reducir riego, aplicar fungicida cobre.',
    'cactus', 'mediana',
    ARRAY['sin_riego_frecuente','sol_directo','arquitectonica','larga_vida','decorativa'],
    true, false
),

-- 5. Menta
(
    'menta-piperita',
    'Menta Piperita',
    'Mentha × piperita',
    'La hierba más versátil de la cocina y la medicina natural. Su aroma mentolado fresco refresca el ambiente, repele insectos y tiene decenas de usos culinarios y terapéuticos. Crece vigorosa y se multiplica fácilmente.',
    80.00, 30,
    'Riego frecuente, mantener sustrato húmedo pero no encharcado. En verano cada 2-3 días.',
    'Luz indirecta brillante o sol parcial. Tolera algo de sombra pero pierde intensidad de aroma.',
    -15, 35,
    'Sustrato rico en materia orgánica con buen drenaje. Tierra + compost al 30%.',
    'Alta. Le encanta la humedad ambiental.',
    'Abono nitrogenado ligero mensual para follaje abundante y aromático.',
    'facil',
    'El aroma a menta activa el sistema nervioso simpático, mejora el estado de alerta, la concentración y el rendimiento cognitivo. Estudios muestran que reduce la fatiga mental. En espacios de estudio o trabajo es especialmente beneficiosa.',
    'Antiespasmódico digestivo (infusión para cólicos, gases, SII). Descongestionante nasal. Analgésico tópico (dolores musculares, cefaleas). Antiemético (náuseas, mareo). Antibacteriano natural en enjuague bucal.',
    'Originaria de Europa, ampliamente naturalizada en México. Crece silvestre cerca de cuerpos de agua en estados como Puebla, Tlaxcala, Estado de México e Hidalgo. También cultivada en huertos familiares de todo el país.',
    'Es un híbrido natural de menta acuática y menta verde. No produce semillas viables — solo se propaga por esquejes o rizomas. Una sola planta puede colonizar un jardín completo en una temporada si se deja sin control.',
    'Áfidos (pulgones), mosca blanca y araña roja en climas secos.',
    'Pulgones: jabón potásico o nicotina natural. Preventivo: aceite de neem semanal. Mosca blanca: trampas amarillas + neem.',
    'aromatica', 'pequena',
    ARRAY['aromatica','medicinal','culinaria','repelente_insectos','propagacion_facil','comestible'],
    true, false
),

-- 6. Monstera Deliciosa
(
    'monstera-deliciosa',
    'Monstera (Costilla de Adán)',
    'Monstera deliciosa',
    'El ícono del diseño de interiores moderno. Sus enormes hojas perforadas son únicas en el reino vegetal y pueden alcanzar tamaños espectaculares con los cuidados correctos. Una pieza viva de arte natural.',
    350.00, 8,
    'Riego moderado cada 7-10 días. Espera a que los primeros 5 cm de tierra estén secos. Sensible al exceso.',
    'Luz indirecta brillante. Tolera poca luz pero crece más lento. Sin sol directo que quema las hojas.',
    15, 30,
    'Sustrato bien aireado: tierra + perlita + corteza de pino en partes iguales.',
    'Media-alta. Agradece nebulizaciones semanales o charola con piedras y agua.',
    'Fertilizante balanceado mensual en primavera-verano. Pausa en otoño-invierno.',
    'media',
    'Las plantas de hojas grandes como la monstera reducen el ruido ambiental y crean espacios de mayor privacidad visual, lo que favorece la relajación. Su tamaño genera sensación de conexión con la naturaleza tropical, efectivo para combatir el "síndrome de déficit de naturaleza".',
    'El fruto maduro de la monstera es comestible y delicioso (sabor entre piña y plátano). Las hojas inmaduras son irritantes. Algunas culturas de Mesoamérica usaban sus raíces aéreas para tratar mordeduras de serpiente.',
    'Originaria de los bosques tropicales de México y Centroamérica. Se encuentra silvestre en selvas húmedas de Veracruz, Chiapas, Tabasco, Campeche, Quintana Roo y Oaxaca.',
    'Las perforaciones de sus hojas (fenestras) son una adaptación para resistir vientos fuertes en la selva. Solo produce fruto comestible después de varios años y en condiciones óptimas. Es la misma planta que aparece en miles de estampados de moda.',
    'Trips, cochinilla y manchas por exceso de riego.',
    'Trips: insecticida sistémico o spinosad orgánico. Cochinilla: jabón potásico + alcohol. Preventivo: inspección semanal.',
    'interior', 'grande',
    ARRAY['tendencia','statement_plant','purifica_aire','hojas_grandes','tropical'],
    true, true
),

-- 7. Lavanda de agua / Espada de San Jorge
(
    'sansevieria-trifasciata',
    'Sansevieria (Lengua de Suegra)',
    'Dracaena trifasciata',
    'La planta más resistente del planeta. Sobrevive semanas sin riego, crece en casi cualquier luz, purifica el aire eficientemente y libera oxígeno por la noche. Ideal para dormitorios o personas muy ocupadas.',
    140.00, 20,
    'Riego muy escaso: cada 14-21 días en verano, cada 30-45 en invierno. El exceso de agua es letal.',
    'Tolera desde sombra casi total hasta sol directo. Extraordinariamente adaptable.',
    10, 35,
    'Sustrato con buen drenaje. Mezcla universal con 40% perlita o arena gruesa.',
    'Muy baja. Acepta cualquier nivel de humedad ambiental.',
    'Fertilizante muy diluido, solo 2-3 veces al año en temporada cálida.',
    'facil',
    'Produce oxígeno de noche (metabolismo CAM) mejorando la calidad del sueño. La NASA la incluye entre las mejores plantas depuradoras de aire interior, eliminando benceno, formaldehído, xileno y tolueno. Su geometría vertical tiene efecto ordenador y calmante.',
    'Filtrado de aire comprobado por estudios de la NASA. La presencia de plantas que absorben toxinas del aire reduce síntomas de SBS (Síndrome del Edificio Enfermo): dolores de cabeza, fatiga, irritación ocular.',
    'Originaria de África occidental tropical. Ampliamente naturalizada y cultivada en toda la República Mexicana por su extraordinaria resistencia al sol y la sequía. Se encuentra en jardines de casi todos los estados.',
    'Puede fotosintezar con tan solo 50 lux de iluminación (la luz de una vela). Estudios confirman que puede purificar hasta 80% de ciertos contaminantes del aire en 24 horas. Es casi imposible matarla por negligencia.',
    'Pudrición de raíces por exceso de riego. Prácticamente sin plagas.',
    'Preventivo único: NO REGAR EN EXCESO. Si aparece cochinilla, jabón insecticida.',
    'interior', 'mediana',
    ARRAY['purifica_aire','oxigeno_nocturno','poca_luz','sin_riego_frecuente','dormitorio'],
    true, true
),

-- 8. Helecho de Boston
(
    'helecho-boston',
    'Helecho de Boston',
    'Nephrolepis exaltata',
    'El gran humidificador natural. Sus frondes verdes arqueadas son espectaculares y tiene una capacidad única para añadir humedad al ambiente, beneficiando pieles secas y vías respiratorias.',
    130.00, 18,
    'Riego frecuente: mantener el sustrato uniformemente húmedo. Cada 3-5 días en verano, cada 7 en invierno.',
    'Luz indirecta brillante o sombra parcial. Sin sol directo.',
    10, 28,
    'Sustrato rico y bien drenado: tierra + turba + perlita.',
    'Alta. Necesita humedad constante. Nebulizar hojas 2-3 veces por semana o usar charola húmeda.',
    'Fertilizante nitrogenado mensual en primavera-verano para mantener el verde intenso.',
    'media',
    'Los helechos tienen el mayor índice de bioeficiencia para humidificar ambientes interiores secos. En invierno o con aire acondicionado, aumentan la humedad hasta un 20%, lo que reduce la irritación de mucosas, mejora la piel seca y reduce la propagación de virus respiratorios.',
    'Humidificador natural que beneficia el sistema respiratorio. La humedad que generan alivia síntomas de rinitis, asma leve y piel seca. No tiene usos medicinales directos, pero su efecto ambiental es terapéutico.',
    'Originario de las regiones tropicales de América, incluyendo México. Crece silvestre en selvas húmedas de Chiapas, Oaxaca, Veracruz y la Península de Yucatán, siempre en zonas de alta humedad.',
    'Los helechos son de los organismos más antiguos de la Tierra: llevan 360 millones de años prácticamente sin cambios evolutivos. Son plantas no vasculares que no producen flores ni semillas — se reproducen por esporas.',
    'Mosca del sustrato, cochinilla, trips y araña roja en ambientes secos.',
    'Mosca del sustrato: trampas amarillas + reducir riego. Araña roja: aumentar humedad + aceite de neem. Trips: jabón potásico.',
    'helecho', 'mediana',
    ARRAY['humidificador_natural','purifica_aire','baño','alta_humedad','veterano'],
    true, false
),

-- 9. Suculenta Echeveria
(
    'echeveria-elegans',
    'Echeveria Rosa de Piedra',
    'Echeveria elegans',
    'La joya del mundo suculento. Sus rosetas perfectas en tonos azul-gris con bordes rosados parecen esculpidas. Una de las suculentas más populares de México y el mundo. Coleccionable, resistente y hermosa.',
    75.00, 50,
    'Riego escaso: cada 10-14 días en verano, cada 21-30 en invierno. Verter agua directamente al sustrato, nunca a la roseta.',
    'Pleno sol o luz muy brillante. Con poca luz pierde su coloración y se etiolará.',
    5, 35,
    'Sustrato para suculentas o mezcla tierra + 50% arena gruesa + grava volcánica.',
    'Muy baja. Ambiente seco ideal.',
    'Fertilizante para suculentas, muy diluido, 1-2 veces en primavera.',
    'facil',
    'El cuidado de suculentas es terapéutico: su pequeño tamaño las hace manejables, su lentitud de crecimiento enseña paciencia y su belleza geométrica tiene efecto meditativo. Son ideales en terapia hortícola con niños y adultos mayores.',
    'No tiene usos medicinales directos, pero el bienestar emocional que genera su cuidado tiene efectos físicos reales: reducción del cortisol y la presión arterial.',
    'Endémica de Hidalgo y Tamaulipas, México. Habita en zonas rocosas semi-áridas. Es una de las suculentas más representativas de la flora mexicana y símbolo del semidesierto del Altiplano.',
    'Existen más de 150 especies de echeverias, casi todas endémicas de México. Son de las plantas más fotografiadas en redes sociales. Se pueden propagar por hojas individuales: una sola hoja puesta en sustrato genera una nueva planta completa.',
    'Cochinilla y pudrición basal por exceso de agua o agua en la roseta.',
    'Cochinilla: pincel con alcohol + jabón potásico. Preventivo: regar siempre en el sustrato, nunca mojar las hojas.',
    'suculenta', 'pequena',
    ARRAY['endemica_mexico','coleccionable','sin_riego_frecuente','sol_directo','propagacion_facil','regalo'],
    true, true
),

-- 10. Epazote
(
    'epazote',
    'Epazote',
    'Dysphania ambrosioides',
    'Planta sagrada de la cocina mexicana. Su aroma intenso y característico es indispensable en frijoles, mole, tamales y caldos. Además de su valor culinario, tiene propiedades medicinales reconocidas por siglos.',
    65.00, 35,
    'Riego moderado, cuando el sustrato esté parcialmente seco. Cada 5-7 días en temporada cálida.',
    'Pleno sol o luz brillante. Requiere buena iluminación para desarrollar su aroma característico.',
    5, 38,
    'Sustrato bien drenado con materia orgánica. Tierra de jardín + compost.',
    'Media. Tolera ambientes secos pero prefiere algo de humedad.',
    'Abono orgánico (composta o humus de lombriz) mensual.',
    'facil',
    'Cultivar plantas culinarias como el epazote genera sentido de autosuficiencia y conexión cultural con las raíces. En grupos vulnerables, los huertos de plantas comestibles tienen efectos documentados en autoestima, sentido de pertenencia y nutrición.',
    'Antiparasitario intestinal tradicional (ascaridiol como principio activo). Carminativo para gases y distensión abdominal. Emenagogas suaves. En uso externo: antiinflamatorio para picaduras. PRECAUCIÓN: tóxico en dosis excesivas, no usar en embarazo.',
    'Originario de América tropical. Planta sagrada en la medicina tradicional azteca y maya. Crece silvestre en todo México, especialmente en zonas de cultivo y orillas de campos. Completamente naturalizado y considerado parte del patrimonio gastronómico nacional.',
    'El epazote ha sido parte de la cocina mesoamericana por al menos 5,000 años. Aparece mencionado en códices aztecas como planta medicinal. El ascaridiol que contiene fue aislado en el siglo XX como el primer antiparasitario del mundo moderno extraído de una planta.',
    'Pulgones y trips. Relativamente resistente a plagas por sus aceites esenciales repelentes.',
    'Pulgones: jabón potásico o neem. Al tener aceites esenciales propios, actúa como repelente natural de muchos insectos.',
    'aromatica', 'pequena',
    ARRAY['culinaria','medicinal','tradicional_mexicana','aromatica','patrimonial','comestible'],
    true, false
);

-- ============================================================
-- Artículos educativos iniciales
-- ============================================================
INSERT INTO nature_articles (slug, title, excerpt, content, category, tags, is_published, published_at) VALUES

(
    'por-que-las-plantas-nos-hacen-felices',
    '¿Por qué las plantas nos hacen más felices? La ciencia lo explica',
    'Estudios de neurociencia y psicología ambiental revelan por qué la presencia de plantas reduce el estrés, mejora el humor y potencia la creatividad.',
    '# ¿Por qué las plantas nos hacen más felices?

La **biofilia** — el amor innato del ser humano hacia la naturaleza — no es un concepto romántico: es biología evolutiva. Pasamos el 99% de nuestra historia como especie rodeados de naturaleza. Nuestro sistema nervioso literalmente no sabe funcionar sin ella.

## Lo que dice la ciencia

Un estudio publicado en *Environmental Health Perspectives* encontró que personas que viven cerca de espacios verdes tienen:
- **33% menos riesgo** de depresión
- **18% menos probabilidad** de síntomas de ansiedad
- **Menores niveles de cortisol** (hormona del estrés)

En Japón existe una práctica llamada **Shinrin-yoku** (baño de bosque) que ha demostrado, en más de 30 estudios clínicos, que caminar entre árboles por 2 horas reduce la presión arterial, el pulso cardíaco y los niveles de cortisol.

## En tu casa también funciona

No necesitas un bosque. Un estudio de la Universidad de Exeter encontró que tener plantas en oficinas aumenta la productividad en un **15%** y reduce el ausentismo por enfermedad. Las plantas purificadoras de aire como el pothos, la sansevieria y el helecho reducen los contaminantes volátiles (COV) del interior hasta en un 73%.

## La conexión con la tierra

Investigadores del Bristol Royal Infirmary descubrieron que la bacteria *Mycobacterium vaccae*, presente en la tierra de jardín, estimula las neuronas productoras de serotonina en el cerebro humano — el mismo efecto que algunos antidepresivos, sin efectos secundarios.

**Cuidar una planta es, literalmente, cuidarte a ti mismo.**',
    'beneficios',
    ARRAY['psicologia','bienestar','biofilia','ciencia'],
    true, now()
),

(
    'areas-verdes-en-peligro',
    'Las áreas verdes urbanas de México están en crisis — y todos podemos hacer algo',
    'México pierde 500,000 hectáreas de bosque al año. Las ciudades mexicanas tienen apenas 4 m² de área verde por habitante, cuando la OMS recomienda mínimo 9 m².',
    '# Las áreas verdes urbanas de México están en crisis

## Los números que nos deben preocupar

México pierde aproximadamente **500,000 hectáreas de bosque al año**, según la SEMARNAT. La Ciudad de México tiene apenas **4.8 m² de área verde por habitante**, cuando la Organización Mundial de la Salud recomienda un mínimo de **9 m²** para garantizar calidad de vida.

Para comparación: Viena tiene 120 m² por habitante. Bogotá, que comenzó su transformación verde hace 20 años, ya supera los 9 m².

## ¿Por qué debería importarte?

Las áreas verdes no son "lujo estético". Son infraestructura vital:

- **Reducen hasta 8°C** la temperatura en zonas urbanas (el efecto isla de calor)
- **Capturan CO₂** y compensan emisiones vehiculares
- **Absorben agua pluvial**, reduciendo inundaciones
- **Mejoran la salud mental** de todos los habitantes cercanos
- **Albergan biodiversidad** que equilibra los ecosistemas urbanos

## Lo que cada persona puede hacer

1. **Crear jardines verticales** en balcones y fachadas
2. **Adoptar árboles** en tu calle a través de programas municipales
3. **Compostar** residuos orgánicos para enriquecer la tierra
4. **Exigir** a tu gobierno local que amplíe los espacios verdes
5. **Enseñar** a los niños a conocer, nombrar y cuidar las plantas de su entorno

Cada planta en maceta que cuidas en casa es un voto por un mundo más verde. Cada jardín es un acto político.',
    'conservacion',
    ARRAY['mexico','ciudades','crisis_ambiental','accion'],
    true, now()
);
