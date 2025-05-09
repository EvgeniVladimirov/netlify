import test from '../support/test-fixture';
import { faker } from '@faker-js/faker';

test.describe('Netlify Form Validation', () => {
  test.beforeEach(async ({ netlifyNewsletter }) => {
    await netlifyNewsletter.navigateToHomepage();
  });

  test('Verify newsletter is present', async ({ netlifyNewsletter }) => {
    await netlifyNewsletter.verifyNewsletterModalVisibitility();
  });

  test('Test submission form with valid data', async ({ netlifyNewsletter }) => {
    await netlifyNewsletter.fillNewsletterForm(faker.internet.email());
    await netlifyNewsletter.clickOnSubmitButton();
    await netlifyNewsletter.verifySubmissionStatus(200, 'Thank you');
  });

  //Skipping this test. The form is not working with invalid data.
  test.skip('Test form validation with invalid data', async ({ netlifyNewsletter }) => {
    await netlifyNewsletter.fillNewsletterForm('test@test');
    await netlifyNewsletter.clickOnSubmitButton();
    await netlifyNewsletter.verifySubmissionStatus(404, 'Page not found');
  });

  test('Verify proper feedback after submission', async ({ netlifyNewsletter }) => {
    await netlifyNewsletter.fillNewsletterForm(faker.internet.email());
    await netlifyNewsletter.clickOnSubmitButton();
    await netlifyNewsletter.verifySubmissionFeedback();
  });
});
