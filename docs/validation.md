# Validación de la landing

Revisión local del 19/10/2026 sobre el build de producción, servido con `pnpm preview` en loopback. Alcance: implementación de la fase 2; no es una certificación completa de accesibilidad o rendimiento.

## Resultado técnico

- `pnpm check`: correcto para la entrada, el módulo de navegación y la configuración de Vite.
- `pnpm build`: correcto; genera la landing, la redirección heredada y los recursos locales.
- Consola del navegador: sin errores ni avisos durante los recorridos comprobados.

## Revisión en navegador

- Anchos de viewport: 320, 390, 768, 1280, 1440, 1536 y 1600 px. Sin desbordes horizontales en el documento ni en los encabezados, navegación, franja de apertura o campos de la demo.
- Capturas de página completa en móvil, tablet y escritorio, más primer viewport en el tamaño del mockup. Imágenes cargadas y composición inspeccionadas; las imágenes diferidas se recorrieron antes de capturarlas.
- Menú móvil: apertura y cierre, enlaces, cierre con Escape y restauración del foco al botón.
- Servicios: despliegue con clic y teclado; al abrir otro servicio se cierra el anterior en el navegador comprobado.
- Navegación a contacto: cierre del menú y encabezado visible por debajo de la cabecera fija.
- `contacto.html`: redirección a `index.html#contacto` comprobada.
- Contacto demo: cero elementos `form`; campos y botón deshabilitados; explicación visible, sin mecanismo de envío ni éxito ficticio.
- Foco visible observado en los servicios y el menú. Regla de movimiento reducido comprobada en el código; no se ha emulado esa preferencia en esta ronda de navegador.

## Límites y fase siguiente

Quedan para la fase 3 la optimización de imágenes y fuentes, las mediciones de rendimiento, las comprobaciones ampliadas con tecnología de asistencia y la validación en otros motores de navegador. No se ha ejecutado Lighthouse ni se han realizado envíos reales, ya que el contacto es una demo.

La auditoría de dependencias y los resultados de la migración inicial están registrados en `roadmap.md`. Elegir pnpm no sustituye las actualizaciones ni garantiza ausencia de vulnerabilidades futuras.
