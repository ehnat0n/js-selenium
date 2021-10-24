import {Builder, By, Key, until} from "selenium-webdriver";
import {strict as assert} from "assert";

let searchQuery = "Web Driver";
let desiredAddress = "https://www.selenium.dev/documentation/webdriver/";
let foundOnFirstPage = false;
let browserList = ["chrome", "firefox"];

describe("Test run for '" + searchQuery + "' query", () => {
    for (let i = 0; i < browserList.length; i++) {
      let driver;
      let browserName = browserList[i];

      describe("# Testing in: " + browserName, () => {

        before (async () => {
          driver = new Builder().forBrowser(browserName).build();
          await driver.get("http://www.google.com/ncr");
        });

        after (async () => {
          await driver.quit();
        });

        it("Should be able to complete the search and verify the title", async () => {
          let locatorXPath = By.xpath("//*[@name='q']");
          await driver.findElement(locatorXPath).sendKeys(searchQuery, Key.RETURN);

          await driver.wait(until.titleIs(searchQuery + " - Google Search"), 10000);
        });

        it("Should find desired address on the first page and list all results in order", async () => {
          /**
           * Google search results are under <div id="main">...<div id="center_col">...<div id="search">...<div class="g">...
           * There is a link with <a> tag and a title with <h3> tag.
           */
          let resultsLocator = By.xpath("//div[@class='g']");
          await driver.wait(until.elementLocated(resultsLocator), 10000); // to make sure we got first result loaded
          let resultsList = await driver.findElements(resultsLocator);

          let desiredAddressLabel = "Desired address was not found on the first page";

          for (let i = 1; i <= resultsList.length; i++) {
            let eachResult = resultsList[i-1];
            let myLinkText = await eachResult.findElement(By.xpath(".//a")).getAttribute("href");
            let myCaption = await eachResult.findElement(By.xpath(".//h3")).getText();

            let iterationLabel = " " + i + ". ";

            if (myLinkText === desiredAddress) {
              foundOnFirstPage = true;
              desiredAddressLabel = "Desired address - search result number: " + i;
              iterationLabel = "[" + i + "]. ";
            }

            console.log(iterationLabel + myCaption + ". Link: " + myLinkText);
          }
          console.log(desiredAddressLabel);
          assert.equal(foundOnFirstPage, true);
        });
      });
    }
});