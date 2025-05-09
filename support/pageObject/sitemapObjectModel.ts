import { Locator, Page, expect } from '@playwright/test';
import { parseStringPromise } from 'xml2js';

export class SitemapObjectModel {
  private metaRobots: Locator;

  constructor(private page: Page) {
    this.metaRobots = page.locator('meta[name="robots"]');
  }

  public async naviagateToSitemap() {
    await this.page.goto('/sitemap.xml');
  }

  public async getResponse(url: string) {
    const response = await this.page.request.get(url);
    return response;
  }

  public async verifyResponseStatus(url: string) {
    const response = await this.getResponse(url);
    expect(response.status()).toBe(200);
  }

  public async verifyResponseStatusSitemap() {
    const response = await this.getResponse(this.page.url());
    expect(response.status()).toBe(200);
  }

  public async parseSitemap() {
    const response = await this.getResponse(this.page.url());
    const sitemapXML = await response.text();
    const parsedSitemap = await parseStringPromise(sitemapXML);
    const urls = parsedSitemap.urlset.url.map((urlObj: any) => urlObj.loc[0]);
    return urls;
  }

  public async failedUrls(urls: string[]) {
    if (urls.length > 0) {
      throw new Error(`Some URLs failed: ${urls.length} failed`);
    } else {
      console.log('All URLs are accessible');
    }
  }

  public async checkForRobotsNoIndex(url: string) {
    const urlResponse = await this.getResponse(url);
    const robotsHeader = urlResponse.headers()['x-robots-tag'];
    if (robotsHeader && robotsHeader.includes('noindex')) {
      console.error(`No robotos noindex meta tag present: ${url}`);
    }
  }

  public async verifyCrawlableImportantPages(url: string) {
    await this.page.goto(url);
    const hasRobotsMeta = await this.metaRobots.count();
    if (hasRobotsMeta > 0) {
      console.error(`Robots meta tag found on important page: ${url}`);
    }
  }
}
