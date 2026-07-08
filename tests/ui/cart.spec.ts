import { test, expect } from '@fixtures/fixtures';

test.describe('UI · Carrito', () => {
  test('agregar un producto actualiza el badge del carrito @regression', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    expect(await inventoryPage.getCartCount()).toBe(1);
  });
});
