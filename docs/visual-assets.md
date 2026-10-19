# Recursos de la propuesta azul

El 19/10/2026 se eligió la primera propuesta de diseño para Pikys Detail. `design/approved-landing.png` conserva esa referencia visual; no es una captura de una landing ya implementada.

## Tipografía

- Archivo Black: marca tipográfica ancha.
- Kanit Bold: titulares principales.
- Manrope variable: navegación y texto de lectura.

Las fuentes se alojan en `src/assets/fonts/`. Se obtuvieron del repositorio oficial Google Fonts y se incluyen sus licencias SIL Open Font License. No se necesita una llamada a una CDN para cargarlas.

## Imágenes

Las fotografías originales permanecen en `src/assets/images/`. Las dos imágenes nuevas son ilustraciones fotográficas generadas para reproducir la dirección elegida:

- `workshop-blue.png`: reconstrucción panorámica de la escena del taller.
- `detail-blue.png`: detalle ilustrativo de un faro y la carrocería azul.

Estas imágenes no prueban resultados de clientes ni constituyen un antes/después. La landing debe distinguir las imágenes ilustrativas del material original del negocio. No se utilizarán para inventar testimonios o prestaciones.

## Estado de esta entrega

La estructura técnica, el cambio a pnpm y las exclusiones de secretos y herramientas locales ya tienen su propio commit. Este conjunto reúne el material visual, las fuentes y sus licencias. La integración en HTML/CSS queda después de la revisión de recursos, conservando una unidad de trabajo por commit.
