import { test as base } from '@playwright/test';
import { LoginPage } from '@ui/LoginPage';
import { InventoryPage } from '@ui/InventoryPage';
import { AuthClient, BookingClient } from '@api/clients';

/**
 * Fixtures combinados para UI y API.
 *
 * Un solo `test` extendido sirve a ambos mundos: los tests de UI piden los
 * fixtures de páginas; los de API piden los clients. Como los fixtures son
 * "lazy", cada test solo construye lo que usa (un test de API nunca instancia
 * un Page Object, y viceversa).
 */

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authClient: AuthClient;
  bookingClient: BookingClient;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },
});

export { expect } from '@playwright/test';
