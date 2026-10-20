# Despliegue en Vercel

El proyecto está preparado para que su propietario lo despliegue en Vercel. No necesita backend, claves ni servicios de formularios.

## Configuración

Importar la rama que contenga los commits de la refactorización y usar la raíz del repositorio como Root Directory. `vercel.json` define Vite, la instalación con `corepack pnpm install --frozen-lockfile`, el build con `corepack pnpm build` y la salida `dist`. `package.json` fija Node 24.x y pnpm 11.24.0.

En las variables del proyecto de Vercel, configurar `ENABLE_EXPERIMENTAL_COREPACK=1`, según su documentación, para respetar la versión de pnpm fijada. Esto evita que un override genérico de instalación seleccione una versión antigua del gestor.

## Dominio y metadatos

El build toma el dominio público de `SITE_URL`, si se define, o de la variable de Vercel `VERCEL_PROJECT_PRODUCTION_URL` (con las variables de sistema expuestas al build). `SITE_URL` es opcional y público: usar únicamente un origen HTTPS, sin rutas, parámetros ni credenciales.

Con un dominio disponible se generan canonical, `og:url`, URLs absolutas de la imagen social y `sitemap.xml`. `robots.txt` incluye ese sitemap. Sin dominio, el build local funciona y genera robots sin inventar una URL pública; la imagen social usa su ruta local.

La portada incluye descripción, Open Graph, Twitter Card, favicon y una imagen social de 1200×500. El sitemap contiene únicamente la landing; `contacto.html` conserva `noindex` y redirige a `index.html#contacto` mediante HTML, con enlace alternativo.

## Comportamiento del hosting

La navegación usa anclas, por lo que no requiere reglas de SPA ni un catch-all que convierta archivos inexistentes en HTML. Las cabeceras de Vercel incluyen `nosniff`, política de referrer y permisos de cámara, micrófono y geolocalización desactivados. Los assets con hash reciben caché inmutable de un año.

Después del despliegue, verificar portada, contacto heredado, favicon, imagen social, robots, sitemap y dominio canónico. Los resultados locales de Lighthouse no incluyen latencia, caché ni cabeceras del hosting publicado.

Referencias oficiales: [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite), [gestores de paquetes](https://vercel.com/docs/package-managers), [Corepack](https://vercel.com/docs/builds/configure-a-build#corepack) y [variables de sistema](https://vercel.com/docs/environment-variables/system-environment-variables).
