
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();
});

test('Verify login fails with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_password');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    'Username and password do not match any user in this service'
  );

  await expect(page).not.toHaveURL(/inventory.html/);
});

test('Verify login with empty credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    'Username is required'
  );

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
