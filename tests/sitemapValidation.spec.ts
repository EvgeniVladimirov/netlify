import test from '../support/test-fixture';

test.describe('Sitemap Validation', () => {
  test.beforeEach(async ({ sitemapObjectModel }) => {
    await sitemapObjectModel.naviagateToSitemap();
  });

  test('Verify sitemap is present', async ({ sitemapObjectModel }) => {
    await sitemapObjectModel.verifyResponseStatusSitemap();
  });

  test('Check URL accessibility in sitemap', async ({ sitemapObjectModel }) => {
    const urls = await sitemapObjectModel.parseSitemap();
    const failedUrls: string[] = [];
    for (const url of urls) {
      try {
        await sitemapObjectModel.verifyResponseStatus(url);
      } catch (error) {
        failedUrls.push(url);
      }
    }
    await sitemapObjectModel.failedUrls(failedUrls);
  });

  test('No robots noindex meta tags on pages', async ({ sitemapObjectModel }) => {
    const urls = await sitemapObjectModel.parseSitemap();

    for (const url of urls) {
      try {
        await sitemapObjectModel.checkForRobotsNoIndex(url);
      } catch (error) {
        console.error(`Error accessing URL: ${url}`);
      }
    }
  });
});

test('Verify crawlable important pages', async ({ sitemapObjectModel }) => {
  const importantPages = ['https://www.netlify.com/agency-directory/', 'https://www.netlify.com/blog/', 'https://www.netlify.com/careers/'];
  for (const url of importantPages) {
    await sitemapObjectModel.verifyCrawlableImportantPages(url);
  }
});
