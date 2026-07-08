// Configuración de ESLint (flat config, el formato moderno de ESLint 9).
// ESLint es un "quality gate": analiza el código en busca de problemas
// (variables sin usar, promesas sin await, etc.) ANTES de correr los tests.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'blob-report/',
      'test-results/',
      'playwright/.cache/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
