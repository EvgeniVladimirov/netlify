import { test as baseTest } from '@playwright/test';
import { NetlifyNewsletter } from './pageObject/netlifyNewsletterObjectModel';
import { SitemapObjectModel } from './pageObject/sitemapObjectModel';
import { LinkVerification } from './pageObject/linkVerificationObjectModel';

const test = baseTest.extend<{
  netlifyNewsletter: NetlifyNewsletter;
  sitemapObjectModel: SitemapObjectModel;
  linkVerification: LinkVerification;
}>({
  netlifyNewsletter: async ({ page }, use) => {
    await use(new NetlifyNewsletter(page));
  },
  sitemapObjectModel: async ({ page }, use) => {
    await use(new SitemapObjectModel(page));
  },
  linkVerification: async ({ page }, use) => {
    await use(new LinkVerification(page));
  },
});

export default test;
