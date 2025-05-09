import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  globalTimeout: 60000,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.netlify.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chrome Desktop',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', headless: false },
    },
    {
      name: 'Chrome Mobile',
      use: { ...devices['Galaxy S9+'], channel: 'chrome', isMobile: true, headless: false },
    },
  ],
});
