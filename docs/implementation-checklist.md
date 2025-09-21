# xymyx-analysis — Plan y Checklist de Implementación

Usa esta lista como guía viva. Las tareas están numeradas para avanzar en orden.

1. Bootstrap del proyecto
   1.1 [ ] Node LTS instalado y `pnpm` configurado.
   1.2 [x] Crear el proyecto: `pnpm dlx create-next-app@latest xymyx-analysis --ts --eslint --tailwind --app --src-dir --use-pnpm --import-alias "@/*"`
   1.3 [x] `cd xymyx-analysis` y ejecutar `pnpm dev` sin errores.
       - Nota: en este entorno el dev server está bloqueado por la sandbox/extension; ejecutar localmente en tu shell.
   1.4 [x] Configurar `git` remoto y primer commit. 

2. Estructura y Convenciones
   2.1 [x] Rutas en `app/` con carpetas/archivos kebab-case (ej.: `app/chess-annotator/page.tsx`).
   2.2 [x] Páginas con función nominal (no flecha).
   2.3 [x] Métodos/handlers/componentes internos con funciones flecha.
   2.4 [x] Componentes en `src/components/*` (PascalCase) y hooks en `src/hooks/*` (`useCamelCase`).
   2.5 [x] Utilidades en `src/lib/*` (camelCase) y tipos en `src/types.ts`.
   2.6 [x] Alias `@/*` funcionando en imports.

3. Tooling esencial
   3.1 [x] Prettier (`.prettierrc`): singleQuote, semi, tabWidth 2.
   3.2 [x] `.editorconfig` para consistencia.
   3.3 [x] ESLint `next/core-web-vitals` + Hooks/Import.
   3.4 [x] Tailwind listo; tokens de colores de anotación (placeholder).
   3.5 [x] `tsconfig` estricto (strict, noEmit).
   3.6 [x] Dependencias con versiones fijas (sin `^`).

4. Módulos núcleo (MVP)
   4.1 [x] Skeletons: `Board`, `AnnotationLayer`, `PieceTray`, `Toolbar`, `MoveList`.
   4.2 [x] `useEditorStore` placeholder y estado base (`game`, `ann`, `ui`).
   4.3 [x] Lib: `fen.ts`, `pgn.ts`, `share.ts`, `export.ts`.
   4.4 [x] Rutas iniciales: `app/chess-annotator/`, `app/about/`.
   4.5 [x] Integrar componentes en `chess-annotator`.
   4.6 [ ] Assets piezas
       4.6.1 [x] Estructura y placeholders: `public/pieces/{png,svg}/classic/`.
       4.6.2 [x] Importar 12 piezas PNG (o SVG) `wK..bP`.
       4.6.3 [x] Integrar assets en `Board` (posición inicial).

5. Testing y Calidad
   5.1 [x] Instalar Vitest + RTL + JSDOM.
   5.2 [x] `vitest.config.ts` con `environment: 'jsdom'` y alias `@`.
   5.3 [x] Crear test de ejemplo en `src/__tests__/sample.test.tsx`.
   5.4 [x] Scripts `test`, `test:watch`, `typecheck`.
   5.5 [x] E2E con Playwright: scaffolding (config + smoke tests). Nota: ejecutar localmente `pnpm playwright:install` y `pnpm test:e2e`.
   5.6 [x] Cobertura: thresholds configurados en `vitest.config.ts` para `src/lib/**` (80% líneas/funciones/statement, 70% branches).

6. Automatización
   6.1 [x] Husky + lint-staged (pre-commit: lint, typecheck, tests rápidos).
   6.2 [x] GitHub Actions: CI con `install`, `lint`, `typecheck`, `test`, `build`.
   6.3 [ ] Badge de estado en README.

7. Seguridad, DX y Rendimiento
   7.1 [x] `.env.example` solo con `NEXT_PUBLIC_*`.
   7.2 [ ] A11y: roles ARIA, foco visible, atajos (`S/A/P`, `Z/Y`, `Space`).
   7.3 [ ] Performance: `dynamic()` en módulos pesados; `next/image` donde aplique.
   7.4 [x] SEO: metadatos globales, `sitemap`, `robots`.

8. Alineación con PRD
   8.1 [ ] Revisar `docs/prd.md` y validar criterios de aceptación.
   8.2 [ ] Trazabilidad: cada PR enlaza sección del PRD afectada.

Notas de referencia
- Páginas: archivos kebab-case; `function nombrePagina() {}` y export default.
- Métodos internos: `const nombreMetodo = () => {}`.
- Componentes: PascalCase; hooks: `useCamelCase`; utils: `camelCase`.
