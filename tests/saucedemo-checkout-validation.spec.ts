
import { test, expect } from '@playwright/test';

test('Verify checkout validation for empty customer details', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add a product
  await page.locator('.inventory_item').first()
    .getByRole('button', { name: 'Add to cart' })
    .click();

  // Open cart and begin checkout
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Continue without entering customer details
  await page.getByRole('button', { name: 'Continue' }).click();

  // Verify validation message
  await expect(
    page.locator('[data-test="error"]')
  ).toContainText('First Name is required');
});
