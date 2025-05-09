import { Locator, Page } from '@playwright/test';

export class LinkVerification {
  private links: Locator;

  constructor(private page: Page) {
    this.links = page.locator('a');
  }

  public async verifyLinks() {
    const allLinks = await this.links.evaluateAll((elements) =>
      elements.map((el) => el.href).filter((href) => href.startsWith('https://'))
    );
    for (const link of allLinks) {
      try {
        const response = await this.page.request.get(link);
        if (response.status() === 404) {
          console.error(`Broken link: ${link}`);
        }
      } catch (error) {
        console.error(`Failed to access link: ${link}`);
      }
    }
  }
}
