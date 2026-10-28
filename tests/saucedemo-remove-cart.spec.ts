
import { test, expect } from '@playwright/test';

test('Verify removing a product from the cart', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add the first product
  const firstProduct = page.locator('.inventory_item').first();

  await firstProduct
    .getByRole('button', { name: 'Add to cart' })
    .click();

  // Verify item was added
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Remove the product
  await firstProduct.getByRole('button', { name: 'Remove' }).click();

  // Verify the cart badge disappears
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

  // Open cart and verify it is empty
  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.cart_item')).toHaveCount(0);
});
