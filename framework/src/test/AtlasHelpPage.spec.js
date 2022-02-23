const assert = require("assert");
const AtlasHelpPage = require("../pages/AtlasHelpPage");
const { Builder } = require("selenium-webdriver");
const Driver = require("../../driver/Driver");
const chrome = require("selenium-webdriver/chrome");

describe("Test atlas help page", () => {
  let driver;
  let atlasHelpPage;
  beforeEach(async function () {
    driver = await Driver.getDriver();
    atlasHelpPage = new AtlasHelpPage(driver);
  });

  afterEach(async function () {
    driver = await Driver.closeDriver();
  });

  it("should redirect to help page ", async function () {
    atlasHelpPage.openAtlasSite();
    await atlasHelpPage.waitClickHelpButton();
    atlasHelpPage.clickHelpButton();
    await atlasHelpPage.waitHelpInfoPage();
    let contacts = await atlasHelpPage.getContacts();
    assert.strictEqual(contacts, "Контакты");
  });
});
