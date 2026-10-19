# Arquitectura y decisiones

## Alcance

Pikys Detail es una landing de portfolio. El contenido, el diseño responsive y la accesibilidad se resuelven con una arquitectura estática. No hay backend de contacto ni reservas.

## Estructura actual

1. **HTML como fuente de contenido.** `index.html` contiene hero, servicios, trabajos, nosotros y contacto. Una cabecera y un footer globales evitan duplicaciones. Cada sección tiene un encabezado y un destino de navegación.
2. **CSS proporcional al proyecto.** `src/styles/main.css` reúne fuentes, tokens de color y espaciado, estilos base, secciones y adaptaciones. No se crean capas vacías ni archivos por selector. Las reglas responsive se agrupan al final.
3. **JavaScript limitado a la navegación.** `src/main.js` inicializa `src/modules/navigation.js`. El módulo controla el menú móvil, `aria-expanded`, cierre al navegar, clic exterior y Escape. Escape restaura el foco al botón. Sin JavaScript se muestran los enlaces; en escritorio siempre permanecen visibles.
4. **Desplegables nativos.** Los servicios usan `details` y `summary`, con un nombre compartido para mantener uno abierto en navegadores compatibles. No necesitan librerías ni contenido generado con JavaScript.
5. **Contacto de demostración.** Un `fieldset disabled`, precedido por la explicación de la demo, presenta campos etiquetados y un botón deshabilitado. No hay `form`, endpoint, envío, almacenamiento ni confirmación ficticia.
6. **Ruta heredada.** `contacto.html` se conserva como entrada mínima con redirección HTML a `./index.html#contacto` y enlace alternativo. Se retiraron los estilos y el código de contacto independientes, además de la regla de hosting `_redirects` que asumía un proveedor.
7. **Recursos locales.** Imágenes y fuentes están en `src/assets/`; Vite emite únicamente los recursos referenciados con sus URLs finales. `public/` contiene el favicon. No se cargan Bootstrap, fuentes o scripts de CDN.
8. **Herramientas mínimas.** Vite es la única dependencia directa de desarrollo. pnpm 11.24.0, dependencias exactas y un único lockfile reproducen el entorno. La configuración de Vite resuelve rutas mediante ESM y compila ambas entradas HTML.

## Adaptación y accesibilidad

- Composición fluida en escritorio. A 960 px se habilita el menú compacto y se reorganiza la franja de presentación; a 600 px las secciones pasan a una columna. Entre 961 y 1200 px se ajusta el espacio de la franja.
- Cabecera sticky, compensación de anclas, enlace para saltar al contenido y foco visible. Los iconos decorativos se ocultan a tecnologías de asistencia.
- Las imágenes incluyen dimensiones y alternativas textuales. Las fotografías de secciones posteriores se cargan de forma diferida.
- `prefers-reduced-motion` desactiva el desplazamiento suave y las transiciones.

## Reglas de evolución

Mantener el contenido principal en HTML y extraer módulos solo cuando exista responsabilidad real. No añadir reseñas, precios, métricas ni resultados comerciales sin material verificado. Distinguir imágenes ilustrativas de fotografías originales.

Probar el build, además del servidor de desarrollo. Antes de publicar, definir hosting y ruta base para resolver canonical, metadatos sociales y compatibilidad de rutas. La optimización y medición de rendimiento tienen su propia fase; ver `roadmap.md`.
