
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Complete checkout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Add a product
  await productsPage.addBackpackToCart();
  await productsPage.openCart();

  // Begin checkout
  await cartPage.expectCartPageVisible();
  await cartPage.proceedToCheckout();

  // Enter customer information
  await checkoutPage.enterCustomerDetails(
    'Test',
    'User',
    '560001'
  );

  await checkoutPage.continueCheckout();

  // Verify checkout overview
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(
    page.getByText('Checkout: Overview', { exact: true })
  ).toBeVisible();

  // Finish checkout
  await checkoutPage.finishCheckout();

  // Verify order confirmation
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(
    page.getByText('Thank you for your order!', { exact: true })
  ).toBeVisible();
});
