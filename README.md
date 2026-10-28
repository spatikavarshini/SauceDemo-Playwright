
# SauceDemo E-Commerce Test Automation

## Project Overview
A web UI automation project built using Playwright and TypeScript to test the SauceDemo demo shopping application.

## Technologies Used
- Playwright
- TypeScript
- Node.js
- npm
- GitHub Actions (planned CI/CD)

## Automated Test Scenarios
1. Login with valid credentials
2. Login with an invalid password
3. Login with empty credentials
4. Verify product listings
5. Add a product to the cart
6. Verify product details and quantity in the cart
7. Remove a product from the cart
8. Validate checkout with empty customer details
9. Complete the checkout workflow

## Test Results
Latest local Chromium run: 9 tests passed.

## Run the Tests

Install dependencies:

```bash
npm install
npx playwright install
```

Run all tests in Chromium:

```bash
npx playwright test --project=chromium --workers=1
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project Structure

```text
SauceDemo-Playwright/
├── tests/
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## Notes
This project uses the public SauceDemo demo website for practice.
Test results may change as the website or test environment changes.
