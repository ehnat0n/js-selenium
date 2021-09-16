import Page from './page.js';

class GoogleSearchPage extends Page {

  get searchFieldByXPath () { return $("//*[@name='q']") }

  async searchQuery (queryValue) {
    await this.searchFieldByXPath.keys([queryValue, "Return"]);
  }

  open () {
    return super.open("http://www.google.com/ncr");
  }
}

export default new GoogleSearchPage();
