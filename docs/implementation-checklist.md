# xymyx-analysis — Plan y Checklist de Implementación

Usa esta lista como guía viva. Marca cada item al completarlo y añade notas breves donde aplique.

## Fase 1 — Bootstrap del proyecto
- [ ] Node LTS instalado y `pnpm` configurado.
- [x] Crear el proyecto:
  - [x] `pnpm dlx create-next-app@latest xymyx-analysis --ts --eslint --tailwind --app --src-dir --use-pnpm --import-alias "@/*"`
- [ ] `cd xymyx-analysis` y ejecutar `pnpm dev` sin errores.
- [ ] Configurar `git` remoto y primer commit.

## Fase 2 — Estructura y Convenciones
- [x] Rutas en `app/` con carpetas/archivos kebab-case (ej.: `app/chess-annotator/page.tsx`).
- [x] Páginas definidas con función nominal (no flecha):
  - [x] Ejemplo: `function chessAnnotatorPage() { return <main/> } export default chessAnnotatorPage`
- [x] Métodos/handlers/componentes internos con funciones flecha:
  - [x] Ejemplo: `const metricsPanel = () => <aside/>`
- [x] Componentes en `src/components/*` (PascalCase), hooks en `src/hooks/*` (`useCamelCase`).
- [x] Utilidades en `src/lib/*` (camelCase); tipos en `src/types.ts`.
- [x] Alias `@/*` funcionando en imports.

## Fase 3 — Tooling esencial
- [x] Prettier configurado (`.prettierrc`): singleQuote, semi, tabWidth 2.
- [x] `.editorconfig` para consistencia de fin de línea/indentación.
- [x] ESLint extendiendo `next/core-web-vitals`, plugins de Hooks e Import ordenado.
- [x] Tailwind listo y purga verificada; tokens para colores de anotación.
- [x] `tsconfig` en modo estricto (noImplicitAny, strictNullChecks).
- [x] Dependencias con versiones fijas (sin `^`).

## Fase 4 — Módulos núcleo (MVP)
- [x] Crear skeletons:
  - [x] `src/components/Board.tsx`, `AnnotationLayer.tsx`, `PieceTray.tsx`, `Toolbar.tsx`, `MoveList.tsx`.
  - [x] `src/hooks/useEditorStore.ts` (placeholder sin Zustand) y estado base (`game`, `ann`, `ui`).
  - [x] `src/lib/fen.ts`, `pgn.ts`, `share.ts`, `export.ts`.
- [x] Rutas iniciales: `app/chess-annotator/page.tsx`, `app/about/page.tsx`.
- [x] Integrar componentes básicos en `chess-annotator` (Board, AnnotationLayer, PieceTray, Toolbar, MoveList).
- [ ] Assets: `public/pieces/png/classic/{wK.png…bP.png}` según PRD.

## Fase 5 — Testing y Calidad
- [x] Instalar pruebas unitarias/UI: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`.
- [x] `vitest.config.ts` con `environment: 'jsdom'` y alias `@`.
- [ ] Ubicación de tests: `src/**/__tests__/*.test.tsx` o `*.spec.ts(x)`.
- [x] Script `test`, `test:watch`, `typecheck` (`tsc --noEmit`).
- [ ] E2E con Playwright para flujos clave (setup, annotate, play, export/share).
- [ ] Cobertura objetivo ≥80% en `src/lib/**`.

## Fase 6 — Automatización
- [ ] Husky + lint-staged (pre-commit: `lint`, `typecheck`, tests rápidos).
- [ ] GitHub Actions: CI con `install`, `lint`, `typecheck`, `test`, `build`.
- [ ] Badge de estado en README.

## Fase 7 — Seguridad, DX y Rendimiento
- [ ] `.env.example` solo con `NEXT_PUBLIC_*`; sin secretos en repo.
- [ ] A11y: roles ARIA, foco visible, atajos (`S/A/P`, `Z/Y`, `Space`).
- [ ] Performance: `dynamic()` para módulos pesados; `next/image` donde aplique.
- [ ] SEO básico: metadatos por ruta, `sitemap`, `robots`.

## Fase 8 — Alineación con PRD
- [ ] Revisar docs/prd.md y validar criterios de aceptación.
- [ ] Trazabilidad: cada PR enlaza sección del PRD afectada.

## Definiciones rápidas
- Nombres de página: archivos kebab-case (ej.: `chess-boards/page.tsx`).
- Páginas: `function nombrePagina() {}`. Métodos internos: `const nombreMetodo = () => {}`.
- Componentes: PascalCase; hooks: `useCamelCase`; utils: `camelCase`.
