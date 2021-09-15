import {Builder, By, Key, until} from "selenium-webdriver";

let searchQuery = "Portnov School";
let browserList = ["chrome", "firefox"];

describe("First page of results in different browsers for '" + searchQuery + "'.", () => {
    for (let i = 0; i < browserList.length; i++) {
      let driver;
      let browserName = browserList[i];

      before (async () => {
        driver = new Builder().forBrowser(browserName).build();
        await driver.get("http://www.google.com/ncr");
      });

      after (async () => {
        await driver.quit();
      });

      it("Test in: " + browserName + ".", async () => {
        let locatorXPath = By.xpath("//*[@name='q']");
        await driver.findElement(locatorXPath).sendKeys(searchQuery, Key.RETURN);

        /**
         * Google search results are under <div id="main">...<div id="center_col">...<div id="search">...<div class="g">...
         * There is a link with <a> tag and a title with <h3> tag.
         */
        let resultsLocator = By.xpath("//div[@class='g']");
        await driver.wait(until.elementLocated(resultsLocator), 10000); // to make sure we got first result loaded
        let resultsList = await driver.findElements(resultsLocator);

        for (let i = 1; i <= resultsList.length; i++) {
          let eachResult = resultsList[i-1];
          let myLinkText = await eachResult.findElement(By.xpath(".//a")).getAttribute("href");
          let myCaption = await eachResult.findElement(By.xpath(".//h3")).getText();

          console.log(i + ". " + myCaption + ". Link: " + myLinkText);
        }
      });
    }
});