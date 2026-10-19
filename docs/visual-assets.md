# Recursos de la propuesta azul

El 19/10/2026 se eligió la primera propuesta para Pikys Detail. `design/approved-landing.png` conserva el mockup aprobado, como referencia de diseño. La landing implementada utiliza esa dirección y añade las secciones restantes dentro de la misma paleta y tipografía.

## Tipografía

- Archivo Black: marca tipográfica ancha.
- Kanit Bold: titulares.
- Manrope variable: navegación y texto de lectura.

Las fuentes están en `src/assets/fonts/`, junto con sus licencias SIL Open Font License. Proceden del repositorio oficial Google Fonts y se sirven desde el proyecto, sin llamadas a una CDN.

## Imágenes utilizadas

- `workshop-blue.png`: escena panorámica ilustrativa del taller, generada para la dirección aprobada.
- `detail-blue.png`: detalle ilustrativo de faro y carrocería azul, generado para la misma propuesta.
- `auto1.webp` y `lavado1.webp`: fotografías originales de la galería suministradas con el proyecto.
- `nosotros.webp`: fotografía original de la sección sobre el emprendimiento.

Las imágenes ilustrativas están identificadas en la apertura; no constituyen evidencia de resultados de clientes ni un antes/después. Las fotografías originales no se reinterpretan como pruebas de servicios adicionales. Los demás recursos heredados se conservan en origen, pero no se incluyen en el build si no están referenciados.

## Optimización pendiente

Los dos PNG de apertura suman aproximadamente 4,84 MB sin comprimir. La siguiente fase debe preparar variantes modernas y tamaños adaptados conservando la apariencia aprobada, optimizar la entrega de fuentes y medir el resultado. La adaptación visual a móvil está implementada; no se ha realizado Lighthouse todavía.
