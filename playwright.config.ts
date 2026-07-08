import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/config/env';

/**
 * Configuración central. La particularidad de este proyecto: en una sola suite
 * conviven tests de UI (que usan navegador) y tests de API (que no).
 *
 * Lo resolvemos con PROYECTOS que se separan por `testMatch`:
 *   - chromium / firefox / webkit → solo los tests de tests/ui/  (con baseURL de la UI)
 *   - api                          → solo los tests de tests/api/ (con baseURL de la API)
 *
 * Así, el mismo `playwright test` orquesta ambos mundos, y podemos elegir qué
 * correr con --project (clave para el pipeline: PR corre chromium+api; nightly, todo).
 *
 * Reporter: HTML + lista por defecto. En el job de regresión nocturna, que hace
 * SHARDING, el workflow pasa `--reporter=blob` por línea de comandos (sobrescribe
 * esto) para después mergear los reportes de todos los shards en uno solo.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      testMatch: /ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: ENV.uiBaseURL },
    },
    {
      name: 'firefox',
      testMatch: /ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'], baseURL: ENV.uiBaseURL },
    },
    {
      name: 'webkit',
      testMatch: /ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'], baseURL: ENV.uiBaseURL },
    },
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: ENV.apiBaseURL,
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});
