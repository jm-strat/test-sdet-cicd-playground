import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://cdn.stratpoint.io/training-2026/playwright-training-site.html';

test('landing page has correct title', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/FORCETESTERRORINTHEREPORT/);
});

test('valid login credentials shows success message', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByTestId('login-email').fill('test@example.com');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await expect(page.getByTestId('login-message')).toContainText('Login successful');
});

test('invalid login credentials shows error message', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByTestId('login-email').fill('wrong@example.com');
  await page.getByTestId('login-password').fill('wrongpassword');
  await page.getByTestId('login-submit').click();
  await expect(page.getByTestId('login-message')).toContainText('Invalid email or password');
});
