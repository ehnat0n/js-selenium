# JavaScript & Selenium personal playground

Essentially, it is a basic "Google Search" test done with two different setups to compare - therefore, one git project. But to run them correctly better start from appropriate setup folder. VSCode launch configurations are included.

## Description

Verify that for a given query we get desired URL returned on the first page.

- Aquire search query and corresponding URL (hardcoded atm)
- Do a Google Search with the query
- Verify that search has been completed (check title)
- Assume that desired address should be on the first results page (otherwise test fails)
- List all results and highlight the one with the desired address

## Setup #1. Mocha and Selenium WebDriver

Using `mocha` and `selenium-webdriver` npm packages. This setup assumes that you have all needed browsers and appropriate drivers installed. Executables should be visible on `PATH`.

## Setup #2. WebdriverIO with Mocha, Selenium Standalone Server and Page Object Model options

Exploring WebdriverIO options. Using `mocha`, `selenium-standalone` services and POM design pattern. Browsers should be installed, but drivers are handled by Selenium Server. Use `wdio.conf.cjs` to configure the grid.
