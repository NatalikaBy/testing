const { By, until } = require("selenium-webdriver");
const AtlasBasePage = require("../pages/AtlasBasePage");

class AtlasHelpPage extends AtlasBasePage {
  BASE_URL = "https://atlasbus.by/";

  help_button = "button:nth-child(2) > span.MuiButton-label";
  helpInfoCss = ".MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-8";
  constructor(driver) {
    super(driver);
  }

  openAtlasSite() {
    this.driver.get(this.BASE_URL);
    return this;
  }

  clickHelpButton() {
    this.driver.findElement(By.css(this.help_button)).click();
    this.logger.info("Redirect to help page");
    return this;
  }
  async waitClickHelpButton() {
    return this.driver.wait(until.elementLocated(By.css(this.help_button)));
  }
  async waitHelpInfoPage() {
    return this.driver.wait(until.elementLocated(By.css(this.helpInfoCss)));
  }
  async getContacts() {
    this.logger.info("Get text from help page");
    let contacts = await this.driver.findElement(By.css(this.helpInfoCss));
    return contacts.getText();
  }
}

module.exports = AtlasHelpPage;
