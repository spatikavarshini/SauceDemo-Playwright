
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('Verify adding a product to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify products page
  await expect(page).toHaveURL(/inventory.html/);
  await productsPage.expectProductsPageVisible();

  // Add the first product to the cart
  const firstProduct = page.locator('.inventory_item').first();
  await firstProduct.getByRole('button', { name: 'Add to cart' }).click();

  // Verify cart badge displays 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Verify the button changes to Remove
  await expect(
    firstProduct.getByRole('button', { name: 'Remove' })
  ).toBeVisible();
});
