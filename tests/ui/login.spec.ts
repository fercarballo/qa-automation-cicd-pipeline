import { test, expect } from '@fixtures/fixtures';

/**
 * Tests de UI de login. El tag define en qué etapa del pipeline corren:
 *   @smoke      → en cada PR (rápido, bloqueante)
 *   @regression → en la regresión nocturna (completo)
 */
test.describe('UI · Login', () => {
  test('login exitoso lleva al inventario @smoke @regression', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.titleLocator()).toHaveText('Products');
  });

  test('usuario bloqueado muestra error @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorLocator()).toContainText('locked out');
  });
});
