# Refactorización por fases

## Alcance acordado

- Landing para portfolio basada en Pikys Detail.
- pnpm como gestor único, con actualización y auditoría de dependencias.
- Arquitectura estática y ordenada; sin framework adicional por defecto.
- Contacto de demostración, sin envío ni backend.
- Usar las skills locales `impeccable` y `frontend-design` para el trabajo frontend.
- Ejecutar una fase acotada por entrega. No publicar como efecto secundario.

## Fase 1 — Base técnica y organización

Estado: completada el 19/10/2026.

- Migrar a pnpm 11.24.0 y fijar Vite 7.3.7 dentro de la misma versión mayor.
- Sustituir `package-lock.json` por `pnpm-lock.yaml`.
- Mover estilos a `src/styles/` y assets a `src/assets/images/`.
- Conectar la entrada JavaScript compartida a ambos HTML.
- Usar resolución ESM explícita en la configuración de Vite.
- Añadir convenciones de edición, README, arquitectura y roadmap.
- Conservar la apariencia y el contacto heredados hasta la fase 2; no presentar esta fase como la landing terminada.

Cierre: instalación reproducible, sintaxis válida, build correcto, resultado del audit documentado, carga de assets y comparación visual básica sin regresiones de la reorganización.

## Fase 2 — Dirección visual y landing

Estado: en curso. Contexto de producto y tres mockups preparados el 19/10/2026; dirección pendiente de elección. Ver PRODUCT.md y docs/design-exploration.md.

- Capturar el contexto de producto y definir la dirección visual con las skills.
- Diseñar el recorrido: hero, servicios, trabajos con material real, nosotros y contacto demo.
- Unificar navegación y footer; integrar el contenido en una sola página.
- Resolver la presentación del contacto como demo visible, sin mecanismos de envío.
- Revisar o retirar Bootstrap al implementar el sistema visual.
- Corregir enlaces inconsistentes, eliminar el WhatsApp de ejemplo y revisar datos comerciales.

Cierre: dirección visual documentada y una landing completa revisable en escritorio y móvil; alcance demo visible y ninguna promesa de funcionalidad ausente.

## Fase 3 — Accesibilidad y rendimiento

Estado: pendiente.

- Validar encabezados, landmarks, nombres accesibles, foco y navegación con teclado.
- Cerrar el menú al navegar y compensar el header en las anclas.
- Corregir contraste y respetar `prefers-reduced-motion`.
- Añadir dimensiones, carga diferida y variantes de imagen cuando corresponda.
- Probar tamaños móviles y escritorio, sin desbordes ni controles tapados.

Las correcciones que sean parte inseparable de los componentes de fase 2 se implementarán allí; esta fase verifica el conjunto.

## Fase 4 — Presentación y publicación preparada

Estado: pendiente.

- Definir el hosting y su ruta base antes de configurar URLs de producción.
- Añadir favicon y metadatos SEO/sociales con información real.
- Medir Lighthouse sobre el build y documentar los resultados.
- Revisar todas las rutas y el tratamiento de `contacto.html`.
- Documentar decisiones y capturas del antes/después para el portfolio.
- Publicar únicamente cuando el usuario lo solicite.

## Registro de verificación

La auditoría previa está en `audit-baseline.md` y describe el commit original `7b61d54`. No representa el estado de seguridad posterior a la actualización.

Verificaciones de fase 1 (19/10/2026):

- Node.js 24.11.1 y pnpm 11.24.0.
- Instalación inicial con pnpm y reinstalación con `--frozen-lockfile --offline`: correctas.
- `pnpm check`: correcto en ambas entradas JS y la configuración de Vite.
- `pnpm build`: correcto con Vite 7.3.7.
- `pnpm audit --audit-level=moderate --json`: 0 vulnerabilidades conocidas en todas las severidades. La auditoría anterior reportaba 6 paquetes con severidad alta. Esto no es una garantía de ausencia de vulnerabilidades futuras ni incluye Bootstrap servido por CDN.
- Portada y contacto del build inspeccionados en navegador en escritorio y móvil: estilos e imágenes cargan; apariencia heredada conservada en los casos revisados.
- Orden de CSS de contacto comprobado: base común antes de estilos específicos.
- Los WebP ya no se copian por duplicado desde `public/imgs`; se emiten las imágenes referenciadas en `/assets`.
- No se realizó Lighthouse ni una auditoría completa de accesibilidad en esta fase. Los hallazgos funcionales/visuales del informe inicial siguen planificados para las fases 2 y 3.
