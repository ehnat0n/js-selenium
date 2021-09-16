import GoogleSearchPage from '../pageobjects/google-search.page.js';

let queryValue = "Portnov School";

describe('My search application', () => {
  it('Should be able to complete the search and verify the title.', async () => {
      await GoogleSearchPage.open();
      await GoogleSearchPage.searchQuery(queryValue);
      await expect(browser).toHaveTitle(queryValue + " - Google Search");
  });
});