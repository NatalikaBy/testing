const { Builder } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");

class DriverManager {

  static driver;

  static async getDriver() {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("test-type");
    chromeOptions.addArguments("start-maximized");
    chromeOptions.addArguments("--headless");
    chromeOptions.addArguments("--no-sandbox");
    chromeOptions.addArguments("window-size=1920,1080");
    chromeOptions.addArguments("--disable-dev-shm-usage");
    chromeOptions.setChromeBinaryPath("/usr/bin/google-chrome")

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await this.driver.manage().window().maximize();

    return this.driver;
  }

  static async closeDriver() {
    await this.driver.quit();
    this.driver = null;
  }
}

module.exports = DriverManager;