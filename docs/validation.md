# Validación final

19/10/2026. Build de producción servido en loopback. Las cifras describen pruebas locales de laboratorio; no son datos de usuarios reales ni una certificación integral de accesibilidad.

## Calidad técnica

- `pnpm install --frozen-lockfile --offline`: correcto con pnpm 11.24.0.
- `pnpm check`: correcto.
- `pnpm test`: cuatro pruebas correctas de dominio, precedencia de variables, URLs inválidas y metadatos por entrada.
- `pnpm build` y `corepack pnpm build`: correctos.
- Build real con origen HTTPS de prueba: canonical, robots y sitemap correctos. El build final se restauró sin dominio ficticio ni sitemap de prueba.
- `pnpm audit --audit-level=moderate --json`: cero vulnerabilidades conocidas en todas las severidades para el árbol consultado.
- `git diff --check`: correcto.

## Lighthouse 13.5.0

| Entorno | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
| --- | ---: | ---: | ---: | ---: |
| Chrome móvil, antes de optimizar (`46f595a`) | 68 | 100 | 100 | 92 |
| Chrome móvil, final | 96 | 100 | 100 | 100 |
| Chrome escritorio, final | 100 | 100 | 100 | 100 |
| Edge escritorio, final | 100 | 100 | 100 | 100 |

Se utilizaron los perfiles móvil/escritorio de Lighthouse y throttling simulado. La versión host es Chromium 155; Edge se comprobó con su ejecutable y el host UA incluye Edg/155. Las cifras exactas y parámetros están en `performance-results.json`. Los informes completos de la ejecución se conservan localmente, fuera del repositorio.

El LCP móvil baja de 29.101 ms a 2.709 ms; escritorio alcanza aproximadamente 813 ms. CLS final: cero en los entornos medidos. La transferencia móvil medida baja de 5.522.112 B a 411.756 B. El LCP móvil sigue siendo una medida de laboratorio de 2,7 s; no se presenta como cumplimiento garantizado de Core Web Vitals en producción.

## Revisión manual en navegador

- Anchos CSS de viewport: 320, 390, 640, 768, 960, 961, 1280, 1440 y 1600 px, incluidos ambos lados del corte de navegación. Sin desbordes horizontales; fotografías y fuentes cargadas. Capturas de página completa inspeccionadas.
- Menú: clic y Enter abren, Escape cierra y devuelve foco; los enlaces cierran el menú. Tab desde el menú cerrado continúa al CTA, sin pasar por enlaces ocultos.
- Servicios: Enter abre/cierra; abrir otro cierra el anterior en el navegador comprobado. Foco visible inspeccionado.
- Contacto: el encabezado queda visible bajo la cabecera sticky; no hay `form` y todos los campos/botón coinciden con `:disabled`.
- Ruta `contacto.html`: redirige a `index.html#contacto` y mantiene enlace alternativo en origen.
- Consola: sin errores ni avisos durante los recorridos finales.
- Contrastes calculados: texto secundario/fondo 5,79:1, texto principal/fondo 16,59:1 y blanco/cobalto 9,51:1. Los textos secundarios de contacto y campos también superan 4,5:1.

## Movimiento, zoom y límites

Edge se auditó con `--force-prefers-reduced-motion`; el CSS desactiva desplazamiento suave y transiciones con esa preferencia. La superficie no contiene entradas que oculten contenido ni animaciones automáticas.

El navegador integrado no respondió al atajo de zoom nativo; se comprobó reflow a 640 CSS px, equivalente al ancho disponible de una ventana de 1280 px al 200 %, además del ancho de 320 px. No se declara una prueba de zoom real. No se realizaron pruebas con lector de pantalla físico, dispositivos táctiles físicos, Firefox o Safari; Chrome y Edge comparten Chromium.

La revisión independiente del refinamiento visual queda separada del registro histórico del comparador, cuyo estado automático de fase 2 conserva una inconsistencia documentada localmente. No se alteraron recibos ni se declararon fases de esa herramienta cerradas.

El despliegue, las cabeceras efectivas del hosting y la validación final sobre el dominio público corresponden al propietario, según [deployment.md](deployment.md).
