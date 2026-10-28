
import { test, expect } from '@playwright/test';

test('Verify products page after login', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify the products page
  await expect(page).toHaveURL(/inventory.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Verify product listings are displayed
  const products = page.locator('.inventory_item');

  await expect(products).toHaveCount(6);
});
