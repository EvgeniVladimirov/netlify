import { Locator, Page, expect } from '@playwright/test';

export class NetlifyNewsletter {
  private newsletterModal: Locator;
  private submitButton: Locator;
  private success: Locator;

  constructor(private page: Page) {
    this.newsletterModal = page.locator('[inputmode="email"]');
    this.submitButton = page.locator('.hs_submit');
    this.success = page.getByRole('heading', { name: 'Thank you for signing up!' });
  }

  public async navigateToHomepage() {
    await this.page.goto('/');
  }

  public async verifyNewsletterModalVisibitility() {
    await this.newsletterModal.evaluate((el) => {
      el.scrollIntoView();
    });
    await expect(this.newsletterModal).toBeVisible();
  }

  public async fillNewsletterForm(email: string) {
    await this.newsletterModal.fill(email);
  }

  public async clickOnSubmitButton() {
    await this.submitButton.click();
  }

  public async verifySubmissionStatus(status: number, title: string) {
    await this.page.waitForResponse((response) => {
      return response.url().includes('thanks-for-signing-up') && response.status() === status;
    });
    await expect(this.page).toHaveTitle(title);
  }

  public async verifySubmissionFeedback() {
    await expect(this.success).toBeVisible();
    await expect(this.success).toHaveText('Thank you for signing up!');
  }
}
