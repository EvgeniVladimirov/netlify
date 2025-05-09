import test from '../support/test-fixture';

test('Link Verification', async ({ netlifyNewsletter, linkVerification }) => {
  test.setTimeout(60000);
  await netlifyNewsletter.navigateToHomepage();
  await linkVerification.verifyLinks();
});
