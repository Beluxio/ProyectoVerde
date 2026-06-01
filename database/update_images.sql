-- ============================================================
-- ProyectoVerde — Imágenes de Unsplash para las 10 plantas
-- Ejecutar en Supabase SQL Editor
-- ============================================================

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=800&q=80']
WHERE slug = 'pothos-dorado';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=800&q=80']
WHERE slug = 'aloe-vera';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80']
WHERE slug = 'lavanda';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80']
WHERE slug = 'cactus-san-pedro';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1471943038886-44e9c2c96d8b?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1471943038886-44e9c2c96d8b?w=800&q=80']
WHERE slug = 'menta-piperita';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80']
WHERE slug = 'monstera-deliciosa';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=800&q=80']
WHERE slug = 'sansevieria-trifasciata';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&q=80']
WHERE slug = 'helecho-boston';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&q=80']
WHERE slug = 'echeveria-elegans';

UPDATE plants SET
  main_image = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  images = ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80']
WHERE slug = 'epazote';

-- Verificar que se actualizaron
SELECT slug, name, main_image IS NOT NULL as tiene_imagen FROM plants ORDER BY name;
