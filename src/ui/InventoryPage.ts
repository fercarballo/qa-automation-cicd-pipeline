import { Locator, Page } from '@playwright/test';

/**
 * Page Object del inventario (SauceDemo), mínimo.
 */
export class InventoryPage {
  private readonly title: Locator;
  private readonly items: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  titleLocator(): Locator {
    return this.title;
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.items
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      return Number((await this.cartBadge.textContent())?.trim() ?? '0');
    }
    return 0;
  }
}
