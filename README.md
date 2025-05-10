# Netlify Test Cases Project

This project is designed from the test cases for netlify.

## Features
- Check newsletter present and functional
- Tests with invalid and valid data on newsletter form
- Parse and validate sitemap URLs.
- Check for `noindex` directives in response headers and meta tags.
- Verify accessibility of important pages.
- Check link verification - No 404 error pages 

## Installation
1. Clone the repository:
   git clone https://github.com/EvgeniVladimirov/netlify.
2. Navigate to the project directory
3. Install dependencies:
  npm install

## Usage

Two ways to run the tests. Because they are divided in Mobile and Desktop, either
you can run them with:
  npx playwright test
to run all tests
or
you can run them with:
  e2e:desktop
  e2e:mobile


## Technologies
Playwright - Browser automation framework.
TypeScript - Strongly typed programming language.
xml2js - XML parsing library.
faker - email string generator

## Note:
On the first task for the invalid data in the newsletter form, I wasn't sure if I should play with the styles of the form in order to bring the error message up, because most of the times it wasn't working and wasn't displaying it. So I've skipped the test. I haven't received any response on my questions
For the couple of times I've ran the test, only once it passed. The button doesn't trigger the wanted effect, so the test would be marked as flaky.

On the second task - because I'm not quite sure with the testing on the sitemap, the tests are failing when checking the links are "accessible" or "robots noindex meta tags", because there are a lot of links and it timeouts. One way was to increase the timeout to 10 minutes in order to pass, but that is not a "best practise" way. The other was to create a test to take the sitemap.xml, to save the file somewhere in the project, and to divide it in couple of parts so that I can cover it with multiple tests. Also I'm not quite familiar with this "robots noindex meta tags", so most of my stuff written would have been with the help of Google and AI.

