
import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCart: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async expectProductsPageVisible() {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addBackpackToCart() {
    await this.addToCartButton.click();
  }

  async openCart() {
    await this.shoppingCart.click();
  }
}
