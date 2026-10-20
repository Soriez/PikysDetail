# Recursos visuales

La primera propuesta azul fue elegida el 19/10/2026. `design/approved-landing.png` conserva el mockup aprobado; las capturas de implementación están en `portfolio/`.

## Fuentes locales

Archivo Black para la marca, Kanit Bold para titulares y Manrope variable para lectura y navegación. Las fuentes originales y sus licencias SIL Open Font License permanecen en `src/assets/fonts/`. La entrega utiliza WOFF2 de las fuentes completas, conservando todos sus glifos y pesos: 135.468 B en conjunto, frente a 431.824 B de los TTF. Se precargan las tres familias utilizadas en el primer viewport.

Conversión realizada con fontTools 4.67.0 y Brotli 1.2.0. No hay llamadas a servicios de fuentes externos.

## Imágenes

El 20/10/2026 se sustituyó la reconstrucción generada de la portada por `auto1.webp`, la fotografía original del taller suministrada con el proyecto. En escritorio se carga esa fotografía de 1200×500, con su variante existente de 640 px. La apertura móvil utiliza recortes de 480 y 781 px del mismo original, sin generación de contenido ni retoques; se conserva el encuadre de 64vw y la posición del 53 %.

Los archivos de la portada generada y sus variantes se retiraron. `detail-blue.png` y sus derivados siguen siendo el detalle ilustrativo del faro, identificado como tal. `lavado1.webp` y `nosotros.webp` conservan el material original de las demás secciones.

La imagen social también utiliza la fotografía original completa de 1200×500. Los derivados se codifican con sharp 0.35.5, WebP al 84 % y JPEG social al 85 %. La galería mantiene sus variantes responsive y los originales suministrados.

## Capturas

Las capturas de portfolio proceden del navegador, con el original `7b61d54` en una copia aislada y el build final en loopback. Se guardan como WebP para que la documentación sea ligera. El registro de validación distingue estas capturas visuales del baseline de rendimiento del commit `46f595a`.
