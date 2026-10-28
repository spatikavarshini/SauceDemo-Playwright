
import { test, expect } from '@playwright/test';

test('Verify adding a product to the cart', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify products page
  await expect(page).toHaveURL(/inventory.html/);

  // Add the first product to the cart
  const firstProduct = page.locator('.inventory_item').first();

  await firstProduct
    .getByRole('button', { name: 'Add to cart' })
    .click();

  // Verify cart badge displays 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Verify the button changes to Remove
  await expect(
    firstProduct.getByRole('button', { name: 'Remove' })
  ).toBeVisible();
});
