# Pikys Detail

Landing de detailing automotriz desarrollada como proyecto de portfolio. La propuesta azul reúne servicios, fotografías del proyecto, historia del emprendimiento y un contacto de demostración en una sola página.

El contacto no envía mensajes ni reserva turnos. Sus campos están deshabilitados y la interfaz explica ese alcance antes de mostrarlos.

## Desarrollo

Usar Node.js 24 (ver `.node-version`) y pnpm 11.24.0, fijado en `packageManager`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm check
pnpm test
pnpm build
pnpm preview
pnpm audit --audit-level=moderate
```

`check` valida la sintaxis de JavaScript y de la configuración; no sustituye las pruebas en navegador. `build` genera `dist/` y `preview` sirve ese resultado localmente. `audit` consulta vulnerabilidades conocidas del árbol de dependencias.

Usar exclusivamente `pnpm-lock.yaml`. Cambiar de gestor por sí solo no corrige vulnerabilidades: las actualizaciones y la auditoría se gestionan por separado. Las dependencias directas se fijan sin rangos y `pnpm-workspace.yaml` autoriza únicamente el script de instalación de esbuild.

## Organización

```text
index.html                 Contenido y secciones de la landing
contacto.html              Compatibilidad con la URL anterior
src/main.js                Inicialización de interacciones
src/modules/navigation.js  Menú móvil con mejora progresiva
src/styles/main.css        Tokens, base, secciones y responsive
src/assets/images/         Material visual procesado por Vite
src/assets/fonts/          Fuentes locales y licencias
public/                    Favicon e imagen social
scripts/                   Metadatos generados durante el build
tests/                     Casos de configuración del despliegue
docs/                      Arquitectura, fases y validación
```

HTML semántico, CSS y JavaScript nativo sobre Vite, sin framework de interfaz ni servicios externos. Los servicios utilizan desplegables nativos; la navegación sigue disponible sin JavaScript. `contacto.html` dirige a la sección de contacto y ofrece un enlace alternativo.

## Diseño y estado

La cabecera, la fotografía panorámica y la franja cobalto reproducen la dirección elegida. Las imágenes de apertura son ilustrativas y están identificadas; la galería y la sección sobre el emprendimiento conservan fotografías originales. Las fuentes y sus licencias se alojan en el proyecto.

Implementación y optimización terminadas para el alcance de portfolio. Lighthouse local: rendimiento 96 en móvil y 100 en escritorio; accesibilidad automática, buenas prácticas y SEO 100. Las métricas y sus límites están documentados.

El proyecto está preparado para Vercel; el despliegue lo realiza el propietario. `vercel.json` fija la instalación y el build mediante Corepack para respetar pnpm 11.24.0. Configurar `ENABLE_EXPERIMENTAL_COREPACK=1` en Vercel. El dominio de producción se toma de `SITE_URL` o de `VERCEL_PROJECT_PRODUCTION_URL`, sin URL ficticia en el build local.

- [Arquitectura](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Validación de la landing](docs/validation.md)
- [Recursos visuales](docs/visual-assets.md)
- [Auditoría del código original](docs/audit-baseline.md)

- [Caso de portfolio y antes/después](docs/portfolio-case-study.md)
- [Despliegue en Vercel](docs/deployment.md)
