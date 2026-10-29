
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Verify products page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Login using LoginPage
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify the products page
  await expect(page).toHaveURL(/inventory.html/);
  await productsPage.expectProductsPageVisible();

  // Verify product listings are displayed
  const products = page.locator('.inventory_item');
  await expect(products).toHaveCount(6);
});
