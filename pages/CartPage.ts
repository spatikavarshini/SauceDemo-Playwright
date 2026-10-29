
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly removeBackpackButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.removeBackpackButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectCartPageVisible() {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
