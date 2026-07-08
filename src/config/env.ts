/**
 * Configuración de ambiente. Este proyecto prueba DOS sistemas:
 *   - una UI (SauceDemo)
 *   - una API (Restful-Booker)
 * Por eso hay una baseURL para cada uno, más las credenciales de la API.
 */

export const ENV = {
  uiBaseURL: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
  apiBaseURL: process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com',
  apiUsername: process.env.API_USERNAME ?? 'admin',
  apiPassword: process.env.API_PASSWORD ?? 'password123',
} as const;
