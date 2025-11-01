import { defineConfig } from '@playwright/test';

// Toggle this to control browser visibility:
// true  => run headless (hide browser)
// false => run headed (show browser)
const HIDE_BROWSER = false;

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    headless: HIDE_BROWSER,
    baseURL: 'https://demowebshop.tricentis.com/',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});


