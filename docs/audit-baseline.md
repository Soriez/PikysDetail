# Auditoría de Pikys Detail

Fecha: 19 de octubre de 2026.

## Alcance y resultado

Se revisó el código local de `C:\_dev\PikysDetail`, correspondiente al commit `7b61d54` de `main`, con remoto `https://github.com/Soriez/PikysDetail.git`.

El proyecto tiene una base pequeña y válida para una landing: HTML, CSS, Vite y Bootstrap desde CDN. El build de producción funciona. Los problemas principales están en el contacto, el recorrido de conversión, la navegación móvil, la accesibilidad y la consistencia del código.

La auditoría no modifica el repositorio original. Las verificaciones se ejecutaron sobre una copia de los archivos versionados en `audit-baseline/`, dentro de esta carpeta de trabajo. No se copiaron las carpetas locales de herramientas ni se alteraron sus archivos sin seguimiento.

## Comprobaciones realizadas

- Instalación reproducible con `npm ci`, utilizando el lockfile existente.
- `npm run build`: correcto, con Vite 7.1.9 resuelto por el lockfile.
- Inspección del build servido localmente en navegador, en escritorio y con viewport móvil.
- Verificación de carga de las ocho imágenes de la portada: todas cargaron.
- Apertura del menú móvil y navegación a Servicios.
- Revisión de la página Contacto, su formulario y sus estilos.
- Inspección estática de enlaces, encabezados, metadatos, imágenes y configuración de despliegue.
- Consulta de vulnerabilidades mediante `npm audit`: 6 paquetes clasificados con severidad alta; 0 críticos.
- Cálculo de contraste del botón de contacto: blanco sobre `#00ff88`, aproximadamente 1,34:1.

Limitaciones: no se ejecutó Lighthouse ni se midieron Core Web Vitals en producción; no se enviaron mensajes ni se verificó la titularidad de teléfonos o perfiles sociales. El servidor estático utilizado para inspección no representa un proveedor de formularios. Los problemas del formulario se identifican por su implementación, que carece de un mecanismo de entrega.

## Hallazgos prioritarios

### 1. El formulario no entrega consultas — prioridad alta

**Evidencia:** `contacto.html:54`, `<form action="#" method="post">`. No existe backend, proveedor de formularios ni código JavaScript que procese el envío. `src/main.js` solo importa CSS y tampoco está incluido como módulo en las páginas.

**Impacto:** el visitante completa datos, pero la implementación no los envía a un destinatario. El comportamiento final del POST dependerá del hosting.

**Cambio propuesto:** integrar el contacto en la landing y elegir un canal real. Para el primer alcance, un enlace de WhatsApp con mensaje precompletado permite consultar sin añadir un backend. Si se conserva un formulario, conectar su endpoint y diseñar validación, envío, éxito y error; no mostrar éxito sin confirmación del servicio.

### 2. WhatsApp utiliza un número de ejemplo — prioridad alta

**Evidencia:** `index.html:213` y `contacto.html:109` apuntan a `https://wa.me/5491234567890`; el teléfono publicado en el footer es distinto.

**Impacto:** la consulta se deriva a un destinatario incorrecto o a una cuenta inexistente.

**Cambio propuesto:** confirmar el número comercial y centralizarlo. El teléfono publicado es un candidato, pero no se verificó que tenga WhatsApp ni que sea el destino correcto.

### 3. La portada no tiene una acción principal — prioridad alta para la landing

**Evidencia:** el hero de `index.html:57–82` contiene presentación, cualidades e imagen; no ofrece un enlace para reservar o consultar. Los servicios tampoco ofrecen un siguiente paso contextual.

**Impacto:** el visitante debe descubrir por su cuenta cómo contactar. El título “En Pikys Detail” presenta la marca, pero no explica el beneficio ni la ubicación.

**Cambio propuesto:** título con servicio y beneficio concreto, ubicación visible, un CTA principal de consulta y uno secundario hacia servicios o trabajos. Repetir la consulta después de los servicios y al final del recorrido. Evitar promesas, precios o cifras que no se puedan verificar.

### 4. La navegación móvil queda abierta y cubre el destino — prioridad media

**Evidencia:** ambos botones `.navbar-toggler` carecen de `aria-label`, `aria-controls` y estado inicial `aria-expanded` (`index.html:23–30`, `contacto.html:24–31`). En la prueba, después de pulsar Servicios, el menú conservó `collapse show` y `aria-expanded="true"`; la sección quedó parcialmente detrás del menú fijo.

También existe un desajuste entre el espacio reservado y la altura del navbar: en la portada móvil el `padding-top` del body fue de 70 px y la altura del navbar cerrado fue de aproximadamente 82 px. No hay compensación de anclas mediante `scroll-margin-top` o `scroll-padding-top`.

**Cambio propuesto:** botón con nombre y estado accesibles, cierre al elegir un enlace y compensación del header fijo al navegar. Si se reemplaza Bootstrap, definir también comportamiento de teclado, foco y cierre.

### 5. Hay fallos de contraste y semántica — prioridad media

**Evidencia:** `src/contacto.css:77–79` fija fondo verde `#00ff88` y texto blanco en todos los botones. La relación de contraste es aproximadamente 1,34:1, insuficiente incluso para texto grande. El selector global también afecta el botón del menú.

La portada salta de `h2` a `h5` en las tarjetas (`index.html:89,97` y siguientes). Contacto comienza con `h2` y no tiene `h1`. `contacto.html:130` contiene un segundo cierre `</main>` sin apertura correspondiente. En la portada, el footer queda dentro de `main`, por lo que no expone el mismo landmark de pie global que en Contacto. Los textos alternativos “Logo” y “Hero” son poco informativos.

`src/style.css:70–71` elimina la sombra de foco del menú sin un indicador propio. La animación flotante y el scroll suave no contemplan `prefers-reduced-motion`.

**Cambio propuesto:** corregir contraste, jerarquía de encabezados, landmarks y marcado; proporcionar foco visible, alternativas de imagen según su función y reducción de movimiento.

### 6. La duplicación ya produce inconsistencias — prioridad media

**Evidencia:** header y footer están repetidos en ambos HTML. Facebook apunta a `gabriel.oriez` en la portada (`index.html:209`) y a `pikysdetail` en Contacto (`contacto.html:105`). Desde Contacto, Servicios y Nosotros apuntan a `index.html` sin el fragmento de sección; el logo apunta a `#` y no vuelve a la portada.

`src/contacto.css` redefine `body`, `header`, `main`, `nav a`, `button` y `footer` encima del CSS compartido. Eso mezcla estilos del formulario con estructura global y altera el menú y el espaciado. Hay reglas sin uso, como `.btn-custom` y `.card-icon`.

**Cambio propuesto:** una única página para el alcance de landing, estilos delimitados por componente y datos comerciales consistentes. Extraer módulos solo cuando haya comportamiento o reutilización que lo justifique. Eliminar código sin uso y agregar formato/lint básico.

### 7. Hay oportunidades de rendimiento, sin un problema de peso extremo — prioridad media/baja

**Evidencia:** las imágenes están en WebP y suman unos 351 KB en origen, una base razonable. Ninguna de las diez etiquetas `img` entre ambas páginas declara `width` y `height`, ni usa carga diferida. No hay variantes responsive con `srcset`.

El build contiene aproximadamente 701 KB de archivos WebP: Vite copia `public/imgs` y además genera versiones con hash de las imágenes referenciadas mediante `public/imgs/...`. Es duplicación en la salida; no significa que el navegador descargue ambas copias de cada imagen.

Bootstrap completo se descarga desde CDN aunque el proyecto usa una porción de sus componentes. El CSS personalizado también repite colores, gradientes, sombras y media queries.

**Cambio propuesto:** reservar dimensiones de imagen, aplicar `loading="lazy"` debajo del primer pliegue y priorizar la imagen principal cuando las mediciones lo justifiquen. Elegir entre assets importados desde `src/assets` o URLs correctas desde `public`. Crear variables CSS para color, tipografía, espacio y ancho de contenido. Medir el coste real antes de decidir cuánto CSS/JS retirar.

### 8. Faltan metadatos y una definición de despliegue — prioridad media

**Evidencia:** ambas páginas solo incluyen charset y viewport. No hay descripción, Open Graph, favicon declarado, canonical ni archivos `robots.txt` o sitemap. El título “Contacto” no identifica el negocio.

`vite.config.js` configura dos entradas y no especifica `base`. `public/_redirects` contiene una regla de fallback global a `index.html`, propia de determinados hostings; no representa una configuración universal ni es necesaria por defecto para una landing sin router. Puede devolver la portada con estado 200 para rutas inexistentes en proveedores que apliquen esa regla.

**Cambio propuesto:** fijar el dominio y hosting antes de generar canonical, sitemap y base. Para publicar bajo un subdirectorio, configurar la base correspondiente. Añadir metadatos de la landing y vista previa social. Considerar datos estructurados del negocio con información confirmada; no inventar horarios, reseñas o puntuaciones.

### 9. El lockfile requiere mantenimiento de seguridad — prioridad media, antes de publicar la refactorización

**Evidencia:** `npm audit`, consultado el 19/10/2026, reportó seis paquetes con severidad alta: `vite`, `rollup`, `postcss`, `nanoid`, `picomatch` y `source-map-js`. El lockfile instala Vite 7.1.9. Todos pertenecen a la cadena de herramientas de desarrollo/build de este proyecto.

**Impacto:** hay vulnerabilidades conocidas en las herramientas. El reporte por sí solo no demuestra que la página estática publicada permita explotarlas; debe evaluarse cada advisory y su contexto. El JavaScript de Bootstrap cargado desde CDN no está cubierto por este audit de npm.

**Cambio propuesto:** actualizar dependencias y lockfile de forma controlada, revisar compatibilidad de Node/Vite y repetir instalación, build y audit. No ejecutar `npm audit fix --force` sin evaluar los cambios.

## Dirección propuesta para el portfolio

Conservar la identidad del negocio, sus fotografías reales y el contraste oscuro con verde como punto de partida. Sustituir el uso repetido de brillo, gradientes y sombras por una jerarquía más cuidada: tipografía legible, aire, imágenes con intención y botones claros. Esto es una dirección de diseño propuesta, pendiente de desarrollar visualmente.

La landing debería responder, en orden: qué hacen, qué resultado ofrecen, qué servicio me conviene, qué trabajos reales lo demuestran y cómo consulto.

Recorrido sugerido:

1. Header compacto: marca, Servicios, Trabajos, Nosotros y CTA de consulta.
2. Hero: beneficio concreto, servicio y localidad, fotografía principal y CTA.
3. Servicios: alcance breve y diferencias entendibles, con consulta contextual.
4. Trabajos reales: galería y antes/después únicamente si existen fotografías adecuadas.
5. Proceso: cómo se consulta, cómo se define el servicio y cómo se coordina la entrega; texto confirmado con el negocio.
6. Nosotros: historia familiar breve y fotografía real.
7. Preguntas frecuentes sobre dudas efectivamente relevantes, con respuestas verificadas.
8. Contacto integrado: WhatsApp, ubicación y canales coherentes.
9. Footer simple con información comercial y enlaces consistentes.

No agregar testimonios inventados, contadores sin respaldo o precios y tiempos no confirmados. Revisar especialmente las afirmaciones sobre duración de tratamientos y protección contra rayones.

## Arquitectura sugerida

Mantener una solución estática con HTML semántico, CSS organizado y JavaScript modular para las interacciones necesarias. Vite ya resuelve el build; el alcance actual no exige migrar a React ni incorporar un backend. La decisión de retirar Bootstrap puede tomarse junto con el rediseño para evitar conservar dos sistemas de estilos superpuestos.

Estructura orientativa, ajustable durante la implementación:

```text
index.html
src/
  main.js
  styles/
    tokens.css
    base.css
    layout.css
    components.css
  modules/
    navigation.js
  assets/
    images/
public/
  favicon.svg
  robots.txt
README.md
vite.config.js
```

Mantener el contenido principal en HTML generado/estático; no construir toda la landing mediante `innerHTML` solo para reducir líneas. Centralizar los datos comerciales repetidos según la herramienta elegida, sin complicar una página que solo tiene una instancia de cada sección. Si se elimina `contacto.html`, conservar su URL antigua mediante una redirección real del hosting hacia la sección de contacto.

## Orden de implementación

1. Definir el contenido real: WhatsApp, redes, servicios ofrecidos, fotografías disponibles y destino de publicación.
2. Resolver contacto, navegación y estructura de una sola página.
3. Implementar el sistema visual y las secciones, comenzando por móvil.
4. Corregir accesibilidad, imágenes y metadatos; actualizar dependencias.
5. Verificar build de producción, navegación con teclado, anclas, enlaces, estados de contacto y tamaños de pantalla.
6. Medir Lighthouse sobre producción y corregir los problemas observados, sin prometer puntuaciones antes de medir.
7. Documentar instalación, decisiones y mejoras en un README; preparar capturas comparables del antes y después para presentar el trabajo en el portfolio.

## Criterios de finalización

- Un visitante puede identificar el servicio y llegar a una consulta real desde el hero.
- Los enlaces comerciales y los destinos de contacto son correctos y consistentes.
- No existe un formulario que aparente enviar datos sin hacerlo.
- El menú móvil cierra al navegar y las secciones no quedan bajo el header.
- Hay foco visible, controles con nombre, jerarquía de encabezados coherente y contraste suficiente.
- El contenido funciona sin desbordes horizontales en los tamaños probados.
- Las imágenes cargan, reservan su espacio y las secundarias usan carga diferida cuando corresponde.
- `npm ci` y `npm run build` funcionan; el resultado del nuevo audit queda documentado.
- El despliegue funciona en la ruta elegida y las URLs antiguas reciben el tratamiento previsto.
- El README explica cómo ejecutar y publicar el proyecto y qué se mejoró.

## Referencias técnicas

- Vite, assets públicos: https://vite.dev/guide/assets.html#the-public-directory
- Vite, base pública de despliegue: https://vite.dev/guide/build.html#public-base-path
- Bootstrap, estructura y accesibilidad de navbar: https://getbootstrap.com/docs/5.3/components/navbar/

Las referencias respaldan las recomendaciones sobre assets, base de despliegue y navbar. Los hallazgos específicos provienen del código local y de las comprobaciones descritas arriba.
