# Recursos visuales

La primera propuesta azul fue elegida el 19/10/2026. `design/approved-landing.png` conserva el mockup aprobado; las capturas de implementación están en `portfolio/`.

## Fuentes locales

Archivo Black para la marca, Kanit Bold para titulares y Manrope variable para lectura y navegación. Las fuentes originales y sus licencias SIL Open Font License permanecen en `src/assets/fonts/`. La entrega utiliza WOFF2 de las fuentes completas, conservando todos sus glifos y pesos: 135.468 B en conjunto, frente a 431.824 B de los TTF. Se precargan las tres familias utilizadas en el primer viewport.

Conversión realizada con fontTools 4.67.0 y Brotli 1.2.0. No hay llamadas a servicios de fuentes externos.

## Imágenes

`workshop-blue.png` y `detail-blue.png` son los masters ilustrativos aprobados. Se conservan como material de origen; la página carga exclusivamente sus derivados WebP responsive. Los mayores derivados suman 422.776 B frente a los 4.837.321 B de los PNG.

La apertura móvil usa una variante recortada del mismo master para evitar descargar partes que quedan fuera del encuadre. El recorte conserva la composición de 64vw y el `object-position` del 53 %; no genera una escena nueva. La galería utiliza versiones de 640 px junto con los originales de 1200 px. Vite emite las variantes referenciadas; el navegador descarga las que necesita mediante `picture`, `srcset` y `sizes`.

`auto1.webp`, `lavado1.webp` y `nosotros.webp` son fotografías originales suministradas con el proyecto. La apertura declara sus imágenes ilustrativas y la galería identifica el material original. No se presentan como un antes/después de clientes ni como testimonios.

Los derivados se codificaron con sharp 0.35.5: WebP de apertura al 84 %, móvil/galería al 82 %; la vista social es un recorte de 1200×630 del taller, JPEG al 85 %. Los masters y los recursos heredados que no están referenciados no se transfieren en la landing.

## Capturas

Las capturas de portfolio proceden del navegador, con el original `7b61d54` en una copia aislada y el build final en loopback. Se guardan como WebP para que la documentación sea ligera. El registro de validación distingue estas capturas visuales del baseline de rendimiento del commit `46f595a`.
