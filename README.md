# Pipeline CI/CD — Playwright (UI + API) sobre GitHub Actions

Pipeline de **Integración Continua** de nivel Senior, construido sobre una suite combinada de tests de **UI** (SauceDemo) y **API** (Restful-Booker) con **Playwright + TypeScript**.

El foco de este proyecto **no** es el código de tests (eso está en los Proyectos [1](https://github.com/fercarballo/playwright-e2e-framework-saucedemo) y [2](https://github.com/fercarballo/api-testing-framework-restful-booker)), sino la **orquestación**: cómo se ejecutan esos tests de forma automática, rápida y confiable en cada cambio, con las prácticas que se esperan de un perfil **QA Automation Sr**.

<!-- Los badges muestran el estado en vivo de cada workflow. -->
![PR Checks](https://github.com/fercarballo/qa-automation-cicd-pipeline/actions/workflows/pr-checks.yml/badge.svg)
![Nightly Regression](https://github.com/fercarballo/qa-automation-cicd-pipeline/actions/workflows/nightly-regression.yml/badge.svg)

---

## Qué demuestra este proyecto

| Práctica de CI/CD | Dónde se ve |
|---|---|
| **Pipeline en 2 velocidades** | PR rápido/bloqueante vs regresión nocturna completa |
| **Quality gates** | `lint` + `typecheck` como job previo al smoke |
| **Job dependencies** | `smoke` depende de `quality-gates` (`needs:`) |
| **Smoke bloqueante** | Solo `@smoke` en Chromium + API: feedback en segundos |
| **Cron scheduling** | La regresión corre sola cada noche (`schedule`) |
| **Disparo manual** | `workflow_dispatch` (botón "Run workflow") |
| **Matriz + sharding** | La regresión se parte en 3 y corre en paralelo |
| **Merge de reportes** | Los 3 reportes parciales (blob) se unen en un HTML |
| **Notificación de fallo** | Job `notify` con `if: failure()` |
| **Concurrency control** | Cancela runs viejos del mismo branch |
| **Cross-browser** | Chromium, Firefox y WebKit en la nocturna |
| **UI + API en un pipeline** | Proyectos de Playwright separados por `testMatch` |

---

## Los dos workflows

### 1. `pr-checks.yml` — en cada PR y push a `main` (rápido, **bloqueante**)

```
┌─ quality-gates ─┐        ┌─ smoke ─────────────┐
│  npm run lint   │  ───►  │  @smoke             │
│  npm typecheck  │  needs │  Chromium + API     │
└─────────────────┘        └─────────────────────┘
```

Da feedback en segundos. Si el lint o los tipos fallan, ni siquiera corre los tests. El smoke corre solo lo crítico (`@smoke`) en un navegador + API.

### 2. `nightly-regression.yml` — cada noche (cron) o a demanda (completo)

```
┌─ regression (matriz) ──────────────┐
│  shard 1/3 │ shard 2/3 │ shard 3/3 │   (en paralelo, cross-browser)
└──────┬───────────┬───────────┬─────┘
       └───────────┴───────────┴──► merge-report ──► HTML único
                                     notify (if: failure)
```

Corre TODA la suite en los 3 navegadores + API, repartida en 3 shards paralelos, y junta los reportes en uno solo.

---

## Estructura

```
proyecto-3-cicd/
├── .github/workflows/
│   ├── pr-checks.yml            # ⭐ pipeline rápido/bloqueante de PR
│   └── nightly-regression.yml   # ⭐ regresión nocturna (cron + sharding + merge)
├── src/
│   ├── config/env.ts            # baseURL de UI y de API + credenciales
│   ├── ui/                      # Page Objects (mínimos)
│   ├── api/                     # clients + schemas (Zod)
│   └── fixtures/fixtures.ts     # fixtures combinados UI + API
├── tests/
│   ├── ui/                      # login, cart (usan navegador)
│   └── api/                     # auth, booking (HTTP puro)
├── docs/
│   ├── GUIA-DE-APRENDIZAJE.md   # el "por qué" de todo el CI/CD
│   └── Guia-de-Aprendizaje.pdf
├── playwright.config.ts         # proyectos UI (x3 browsers) + api
├── eslint.config.mjs            # quality gate de lint
└── package.json
```

---

## Cómo correr en local

```bash
npm install
npx playwright install       # navegadores (para los tests de UI)

npm test                     # toda la suite (UI x3 + API)
npm run test:pr              # lo que corre el gate de PR (smoke chromium+api)
npm run test:ui              # solo UI, cross-browser
npm run test:api             # solo API
npm run lint                 # quality gate: ESLint
npm run typecheck            # quality gate: TypeScript
npm run report               # abre el reporte HTML
```

---

## Cómo verlo funcionando en GitHub Actions

1. Pestaña **Actions** del repo.
2. **PR Checks** corre en cada push a `main`.
3. **Nightly Regression** corre cada noche, o dispararlo a mano con **Run workflow**.
4. Al terminar, cada run deja **reportes descargables** (artifacts).

---

## Documentación de estudio

**[docs/GUIA-DE-APRENDIZAJE.md](docs/GUIA-DE-APRENDIZAJE.md)** explica cada concepto de CI/CD con alternativas y pros/contras: qué es CI/CD, anatomía de un workflow de GitHub Actions, quality gates, la estrategia de 2 velocidades, sharding, merge de reportes, cron, matrices, secretos y notificaciones.

---

## Roadmap (portfolio QA Automation Sr)

1. [Framework E2E web (Playwright)](https://github.com/fercarballo/playwright-e2e-framework-saucedemo) — ✅
2. [Testing de API (Playwright + Zod)](https://github.com/fercarballo/api-testing-framework-restful-booker) — ✅
3. **Pipeline CI/CD** ← *estás acá*
4. Caza de flakiness y estabilidad
5. Visual regression + contract testing (Pact)

---

## Licencia

MIT.
