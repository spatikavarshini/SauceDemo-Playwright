
import { test, expect } from '@playwright/test';

test('Verify product details in shopping cart', async ({ page }) => {
  // Open SauceDemo and log in
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Get the first product name before adding it
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct
    .locator('.inventory_item_name')
    .innerText();

  // Add the product to the cart
  await firstProduct
    .getByRole('button', { name: 'Add to cart' })
    .click();

  // Open the shopping cart
  await page.locator('.shopping_cart_link').click();

  // Verify cart page
  await expect(page).toHaveURL(/cart.html/);
  await expect(
    page.getByText('Your Cart', { exact: true })
  ).toBeVisible();

  // Verify the selected product is in the cart
  await expect(
    page.locator('.cart_item .inventory_item_name')
  ).toHaveText(productName);

  // Verify quantity
  await expect(page.locator('.cart_quantity')).toHaveText('1');
});
