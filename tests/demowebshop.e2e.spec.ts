import { test, expect } from '@playwright/test';
import { SELECTORS } from './selectors';

test('User can complete registration and add a product to the shopping cart', async ({ page }) => {
  await test.step('Open home page and verify', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  
    const response = await page.request.get('/');
    
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
    await expect(page).toHaveURL(SELECTORS.urls.homePage);
    await expect(page).toHaveTitle(/Demo Web Shop/i);
    await expect(page.locator(SELECTORS.header.logo)).toBeVisible();
    await expect(page.getByRole('link', { name: SELECTORS.header.registerLinkName })).toBeVisible();
    await expect(page.getByRole('link', { name: SELECTORS.header.loginLinkName })).toBeVisible();
    await expect(page.getByRole('heading', { name: SELECTORS.header.welcomeHeading })).toBeVisible();
  });

    // Registration flow
    await test.step('Click on Register', async () => {
      await page.locator(SELECTORS.registration.link).click();
      
      await expect(page.locator(SELECTORS.registration.page)).toBeVisible();
    await expect(page).toHaveURL(SELECTORS.urls.register);
    });

    const firstName = 'Eran';
    const lastName = 'Endvelt';
    const email = `Eran.Endvelt+${Date.now()}@example.com`;
    const password = `EranPass123`;

    await test.step('Fill in personal details', async () => {
      await page.locator(SELECTORS.registration.genderFemale).check();
      await expect(page.locator(SELECTORS.registration.genderFemale)).toBeChecked();

      await page.locator(SELECTORS.registration.genderMale).check();
      await page.getByLabel(SELECTORS.registration.firstNameLabel).fill(firstName);
      await page.getByLabel(SELECTORS.registration.lastNameLabel).fill(lastName);
      await page.getByLabel(SELECTORS.registration.emailLabel).fill(email);

      await expect(page.locator(SELECTORS.registration.genderMale)).toBeChecked();
      await expect(page.getByLabel(SELECTORS.registration.firstNameLabel)).toHaveValue(firstName);
      await expect(page.getByLabel(SELECTORS.registration.lastNameLabel)).toHaveValue(lastName);
      await expect(page.getByLabel(SELECTORS.registration.emailLabel)).toHaveValue(email);
    });

    await test.step('Enter a password', async () => {
      await page.locator(SELECTORS.registration.password).fill(password);
      await page.locator(SELECTORS.registration.confirmPassword).fill(password);
      await expect(page.locator(SELECTORS.registration.password)).toHaveValue(password);
      await expect(page.locator(SELECTORS.registration.confirmPassword)).toHaveValue(password);
    });

    await test.step('Click on Register', async () => {
      await page.locator(SELECTORS.registration.submit).click();
      await expect(page.getByText(SELECTORS.registration.successText)).toBeVisible();
    await expect(page).toHaveURL(SELECTORS.urls.registerResult);
    });

    await test.step('Click on Continue', async () => {
    await page.locator(SELECTORS.registration.continueBtn).click();
    await expect(page).toHaveURL(SELECTORS.urls.homePage);
    await expect(page.getByRole('heading', { name: SELECTORS.header.welcomeHeading })).toBeVisible();
  });

    await test.step('Validate email appears in header', async () => {
      await expect(page.getByRole('link', { name: email })).toBeVisible();
    });
    // Digital downloads and cart flow
    let selectedProductName: string;
    await test.step('Click on Digital Downloads', async () => {
    await page.getByRole('link', { name: SELECTORS.downloads.linkName }).first().click();
    await expect(page).toHaveURL(SELECTORS.urls.digitalDownloads);
    await expect(page.locator(SELECTORS.downloads.breadcrumb)).toContainText('Home');
    await expect(page.locator(SELECTORS.downloads.breadcrumb)).toContainText('Digital downloads');
      await expect(page.locator(SELECTORS.downloads.productImage).first()).toBeVisible();
    });

    await test.step('Select random product and add to cart', async () => {
      const items = page.locator(SELECTORS.downloads.card);
      const itemCount = await items.count();
      await expect(itemCount).toBeGreaterThan(0);
      const targetIndex = Math.floor(Math.random() * itemCount);
      const targetItem = items.nth(targetIndex);
      selectedProductName = (await targetItem.locator(SELECTORS.downloads.titleLink).first().textContent())?.trim() || '';
      await targetItem.getByRole('button', { name: 'Add to cart' }).click();
      const notificationBar = page.locator(SELECTORS.downloads.notificationBar);
      const notificationMessage = page.locator(SELECTORS.downloads.notificationMessage);
      await expect(notificationBar).toBeVisible();
      await expect(notificationMessage).toHaveText(SELECTORS.downloads.addedToCartText);
      await page.locator(SELECTORS.downloads.notificationClose).click().catch(() => {});
    });

    await test.step('Click on Shopping Cart', async () => {
      await page.locator(SELECTORS.cart.link).first().click();
      await expect(page.getByRole('heading', { name: SELECTORS.cart.heading })).toBeVisible();
    await expect(page).toHaveURL(SELECTORS.urls.cart);
    });

    await test.step('Verify product in cart matches selection', async () => {
      const cartFirstProduct = page.locator(SELECTORS.cart.firstProduct).first();
      await expect(cartFirstProduct).toBeVisible();
      const cartProductName = (await cartFirstProduct.innerText()).trim();
      expect(cartProductName).toBe(selectedProductName);
    });
});


