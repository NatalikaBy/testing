const assert = require('assert');
const AtlasMainPage = require("../pages/AtlasMainPage");
const { Builder } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");

describe("Test atlas main page", () => {
  let driver;
  let atlasMainPage;
  beforeEach(async function () {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("test-type");
    chromeOptions.addArguments("start-maximized");
    chromeOptions.addArguments("--headless");
    chromeOptions.addArguments("--no-sandbox");
    chromeOptions.addArguments("window-size=1920,1080");
    chromeOptions.addArguments("--disable-dev-shm-usage");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    atlasMainPage = new AtlasMainPage(driver);
  });

  afterEach(async function () {
    driver && await driver.quit();
  });

  it('should return tickets', async function () {
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitFromCityInput();
    atlasMainPage.writeFromCity()
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseFromCity().writeToCity();
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseToCity()
    await atlasMainPage.waitDate();
    atlasMainPage.chooseDate();
    await atlasMainPage.waitFindRoutesButton();
    atlasMainPage.findRoutes();
    await atlasMainPage.waitSearchResult();
    const isFromCity = await atlasMainPage.checkFromCityResult();
    const isToCity = await atlasMainPage.checkToCityResult();

    assert.ok(isFromCity && isToCity);
  });

});
