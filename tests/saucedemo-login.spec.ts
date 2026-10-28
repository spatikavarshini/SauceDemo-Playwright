
import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  // Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Enter username
  await page.getByPlaceholder('Username').fill('standard_user');

  // Enter password
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory.html/);

  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();
});

test('Verify login fails with invalid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the login error is displayed
  await expect(
    page.getByText('Username and password do not match any user in this service')
  ).toBeVisible();

  // Verify that login did not succeed
  await expect(page).not.toHaveURL(/inventory.html/);
});

test('Verify login with empty credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Click Login without entering credentials
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify validation error
  await expect(
    page.getByText('Username is required')
  ).toBeVisible();

  // Verify the user remains on the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
