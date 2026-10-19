# Pikys Detail

Landing de detailing automotriz desarrollada como proyecto de portfolio. La refactorización se realiza por fases; la primera organiza la base técnica y conserva la presentación actual.

El objetivo es demostrar diseño frontend, accesibilidad, adaptación a móvil y organización del código. El contacto será una demostración visual: no habrá backend, envío de mensajes ni confirmaciones de envío ficticias. La interfaz actual de contacto todavía está pendiente de adaptarse a ese alcance en la fase 2.

## Desarrollo

Usar Node.js 24 (ver `.node-version`) y pnpm 11.24.0. La versión de pnpm está fijada en `packageManager`; si se utiliza Corepack, debe respetar ese campo. No hace falta instalar pnpm globalmente si ya está disponible.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm check
pnpm build
pnpm preview
pnpm audit --audit-level=moderate
```

`check` valida la sintaxis de los puntos de entrada; no reemplaza la revisión visual o de accesibilidad. `build` genera `dist/`; `preview` permite revisar ese resultado localmente. `audit` consulta vulnerabilidades conocidas del árbol instalado, pero no garantiza ausencia de todas las vulnerabilidades.

Usar exclusivamente `pnpm-lock.yaml` y versionar sus cambios junto con `package.json`. La migración incluye la actualización de Vite y sus dependencias; cambiar de gestor por sí solo no corrige vulnerabilidades. Las dependencias se fijan sin rangos y los scripts de instalación de dependencias solo se autorizan para esbuild en `pnpm-workspace.yaml`.

## Organización

```text
index.html                 Portada; contenido principal en HTML
contacto.html              Página existente, temporal hasta unificar la landing
src/
  main.js                  Entrada compartida de Vite y estilos globales
  contact.js               Entrada temporal del contacto; importa la base primero
  styles/
    main.css               Estilos existentes de la landing
    contact.css            Estilos existentes del contacto
  assets/
    images/                Fotos, logos e iconos procesados por Vite
public/
  _redirects               Configuración heredada; pendiente del hosting final
docs/
  architecture.md          Decisiones y responsabilidades
  roadmap.md               Fases, alcance y criterios de cierre
  audit-baseline.md        Auditoría histórica previa a los cambios
AGENTS.md                  Convenciones para trabajar en el repositorio
```

No hay framework de componentes, backend ni monorepo. `pnpm-workspace.yaml` declara el único paquete y su política de scripts. No se crean carpetas vacías para funciones futuras.

## Skills de frontend

Las skills instaladas en este proyecto se encuentran en `.agents/skills/impeccable/` y `.agents/skills/frontend-design/`. Sus instrucciones se leen cuando corresponda; no forman parte del bundle del sitio. Las instalaciones locales de herramientas se conservan y no se reorganizan como código de aplicación.

Para que Codex las descubra en su selector, abrir el proyecto `C:\_dev\PikysDetail` como carpeta de trabajo. Un chat iniciado en otra carpeta no las descubre por el hecho de mencionar su ruta. Si siguen sin aparecer tras abrir la carpeta correcta, reiniciar Codex. Nombres de invocación: `$impeccable` y `$frontend-design`.

## Estado

Consultar `docs/roadmap.md` para el estado de cada fase y `docs/architecture.md` para las decisiones. La auditoría inicial describe la versión anterior; los resultados actuales de verificación se registran por fase en el roadmap. El rediseño y la adaptación del contacto a demo están pendientes.

No se ha elegido hosting ni dominio definitivo. No publicar ni configurar canonical o sitemap con un dominio inventado. La configuración de dos entradas se conserva hasta integrar Contacto en la landing.
