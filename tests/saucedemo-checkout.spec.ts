
import { test, expect } from '@playwright/test';

test('Complete checkout successfully', async ({ page }) => {
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

  // Enter customer information
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('User');
  await page.getByPlaceholder('Zip/Postal Code').fill('560001');

  await page.getByRole('button', { name: 'Continue' }).click();

  // Verify checkout overview
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(
    page.getByText('Checkout: Overview', { exact: true })
  ).toBeVisible();

  // Finish checkout
  await page.getByRole('button', { name: 'Finish' }).click();

  // Verify order confirmation
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(
    page.getByText('Thank you for your order!', { exact: true })
  ).toBeVisible();
});
