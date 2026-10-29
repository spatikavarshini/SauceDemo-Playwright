
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('Verify product details in shopping cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Open SauceDemo and log in
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Get the first product name before adding it
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct
    .locator('.inventory_item_name')
    .innerText();

  // Add the product to the cart
  await firstProduct.getByRole('button', { name: 'Add to cart' }).click();

  // Open the shopping cart
  await productsPage.openCart();

  // Verify cart page
  await expect(page).toHaveURL(/cart.html/);
  await cartPage.expectCartPageVisible();

  // Verify the selected product is in the cart
  await expect(
    page.locator('.cart_item .inventory_item_name')
  ).toHaveText(productName);

  // Verify quantity
  await expect(page.locator('.cart_quantity')).toHaveText('1');
});
