# Arquitectura y decisiones

## Alcance

Pikys Detail se presenta como una landing de portfolio. Se priorizan composición, contenido claro, accesibilidad, responsive y calidad del código. No se implementará un servicio de contacto o reservas.

La raíz de trabajo es `C:\_dev\PikysDetail`. Las copias utilizadas para auditar o preparar cambios no son proyectos activos alternativos. El repositorio y sus documentos son la fuente de verdad.

## Decisiones de la fase 1

1. **Sitio estático con Vite.** Conservar HTML, CSS y JavaScript nativo. No hay necesidad actual de estado complejo, router o framework de componentes.
2. **Un solo gestor.** pnpm 11.24.0 fijado en `package.json`, dependencias directas exactas y un único `pnpm-lock.yaml`. Actualizar las dependencias y consultar advisories es independiente de elegir gestor.
3. **Dependencias mínimas.** Vite permanece como herramienta de desarrollo. Bootstrap desde CDN se conserva temporalmente para no mezclar la migración técnica con el rediseño; su revisión o retirada corresponde a la fase 2.
4. **Entradas explícitas.** La portada carga `src/main.js`, que importa los estilos comunes. Contacto carga `src/contact.js`, que importa primero la entrada común y después sus estilos específicos. Esto preserva el orden de la cascada tanto en desarrollo como en producción. La configuración de Vite usa URLs de módulo ESM, sin depender de `__dirname`.
5. **Assets con responsabilidad clara.** Las fotografías, logos e iconos están en `src/assets/images/` y Vite genera sus URLs finales. `public/` se reserva para archivos estáticos sin procesamiento. Esto elimina la duplicación anterior entre `/imgs` y `/assets` en el build.
6. **Estructura proporcional.** `src/styles/main.css` y `src/styles/contact.css` conservan los estilos actuales. Durante el rediseño se separarán tokens, base y secciones cuando exista código real que lo necesite, evitando capas vacías o archivos por cada selector.
7. **Contexto duradero.** El README explica el uso, este documento guarda decisiones y el roadmap indica el orden y estado. `AGENTS.md` conserva las restricciones para próximas sesiones.

## Arquitectura de la landing final

Una página principal con secciones semánticas, navegación por anclas y un footer global fuera de `main`. El contenido seguirá en HTML. Los módulos de navegación y de interacción se crearán únicamente cuando se implementen esos comportamientos.

El contacto será contenido de demostración identificado antes de que alguien intente usarlo. Si el diseño incluye campos, no habrá POST, GET con datos personales, endpoint externo ni mensaje de éxito ficticio. Se decidirá su presentación visual en la fase 2.

Al integrar el contacto se retirará la entrada duplicada y se definirá qué hacer con `contacto.html`, según las capacidades del hosting finalmente elegido. No se asume que `_redirects` funcione en todos los proveedores.

## Reglas de evolución

- Mantener el rediseño separado del cambio de gestor y rutas para poder revisar cada fase.
- Reutilizar patrones cuando haya duplicación real, no introducir una capa de componentes por anticipación.
- No añadir contenido comercial no verificado. Las fotografías actuales son los assets disponibles, no evidencia de todos los servicios ni un antes/después.
- Definir el sistema visual con las skills instaladas y guardar las decisiones cuando se cierre la dirección de diseño.
- Probar el bundle generado, no solamente el servidor de desarrollo.
- Elegir base pública, canonical y metadatos con dominio al definir el destino de publicación.
