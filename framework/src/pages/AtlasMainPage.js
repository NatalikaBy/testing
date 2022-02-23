const { By, until } = require("selenium-webdriver");
const AtlasBasePage = require("../pages/AtlasBasePage");

class AtlasMainPage extends AtlasBasePage {
  BASE_URL = "https://atlasbus.by/";

  routes;
  routeNames;

  from_city = "Москва";
  to_city = "Могилёв";

  from_city_input_css =
    ".MuiGrid-root.MuiGrid-item:nth-child(1) .MuiInputBase-input";
  to_city_input_css =
    ".MuiGrid-root.MuiGrid-item:nth-child(2) .MuiInputBase-input";
  from_city_name_xpath = `//span[text()="${this.from_city}"]`;
  to_city_name_xpath = `//span[text()="${this.to_city}"]`;
  choose_date_css =
    ".MuiPickersCalendar-transitionContainer div:nth-child(5) div:nth-child(3) button";
  find_routes_button_css =
    ".MuiButtonBase-root.MuiButton-root.MuiButton-contained";
  result_from_city_xpath = `//div[text()="${this.from_city}"]`;
  result_to_city_xpath = `//div[text()="${this.to_city}"]`;
  popular_route = ".MuiGrid-root > a > div";
  expected_popular_route = ".MuiGrid-root > a > div > p";
  expected_text_on_order_page = "h3";
  order_btn = ".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-4 button";
  view_datails_btn =
    ".MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-8.MuiGrid-grid-lg-9 .MuiButton-text span";
  expected_text_on_view_details =
    ".MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-6:nth-child(1) p";
  continue_btn_on_order_page = ".MuiButton-containedPrimary span";
  expected_text_on_continue_order_page =
    ".MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-4.MuiGrid-grid-md-4";
  return_btn = ".MuiContainer-root a";
  expected_route_page_text = ".jss72";

  constructor(driver) {
    super(driver);
  }
  openAtlasSite() {
    this.driver.get(this.BASE_URL);
    this.logger.info("Open site");
    return this;
  }

  async waitFromCityInput() {
    return this.driver.wait(
      until.elementLocated(By.css(this.from_city_input_css))
    );
  }
  async waitCityName() {
    return this.driver.wait(
      until.elementLocated(By.xpath(this.from_city_name_xpath))
    );
  }
  async waitFindRoutesButton() {
    return this.driver.wait(
      until.elementLocated(By.css(this.find_routes_button_css))
    );
  }
  async waitDate() {
    return this.driver.wait(until.elementLocated(By.css(this.choose_date_css)));
  }
  async waitSearchResult() {
    return this.driver.wait(
      until.elementLocated(By.xpath(this.result_from_city_xpath))
    );
  }
  async waitOrderButton() {
    return this.driver.wait(until.elementLocated(By.css(this.order_btn)));
  }
  async waitOrderPageText() {
    return this.driver.wait(
      until.elementLocated(By.css(this.expected_text_on_order_page))
    );
  }
  async waitViewDetailsButton() {
    return this.driver.wait(
      until.elementLocated(By.css(this.view_datails_btn))
    );
  }
  async waitContinueButton() {
    return this.driver.wait(
      until.elementLocated(By.css(this.continue_btn_on_order_page))
    );
  }
  async waitContinuePageText() {
    return this.driver.wait(
      until.elementLocated(By.css(this.expected_text_on_continue_order_page))
    );
  }
  async waitReturnButton() {
    return this.driver.wait(until.elementLocated(By.css(this.return_btn)));
  }
  async waitContinuePageText() {
    return this.driver.wait(
      until.elementLocated(By.css(this.expected_text_on_continue_order_page))
    );
  }
  async waitRoutePage() {
    return this.driver.wait(
      until.elementLocated(By.css(this.expected_route_page_text))
    );
  }

  writeFromCity(fromCity) {
    this.driver
      .findElement(By.css(this.from_city_input_css))
      .sendKeys(fromCity || this.from_city);
    this.logger.info("Write the city in Field");
    return this;
  }
  writeToCity(toCity) {
    this.driver
      .findElement(By.css(this.to_city_input_css))
      .sendKeys(toCity || this.to_city);
    this.logger.info("Write the city in Field");
    return this;
  }
  chooseFromCity() {
    this.driver.findElement(By.xpath(this.from_city_name_xpath)).click();
    this.logger.info("Choose the city in list");
    return this;
  }
  chooseToCity() {
    this.driver.findElement(By.xpath(this.to_city_name_xpath)).click();
    this.logger.info("Choose the city in list");
    return this;
  }
  chooseDate() {
    this.driver.findElement(By.css(this.choose_date_css)).click();
    this.logger.info("Choose the date in list");
    return this;
  }
  findRoutes() {
    this.driver.findElement(By.css(this.find_routes_button_css)).click();
    this.logger.info("Redirect to the page this routes");
    return this;
  }
  orderPage() {
    this.driver.findElement(By.css(this.order_btn)).click();
    this.logger.info("Redirect to the order page");
    return this;
  }
  viewDetails() {
    this.driver.findElement(By.css(this.view_datails_btn)).click();
    this.logger.info("Show details of route");
    return this;
  }
  continuePage() {
    this.driver.findElement(By.css(this.continue_btn_on_order_page)).click();
    this.logger.info("Redirect to the order details page");
    return this;
  }
  ReturnMainPage() {
    this.driver.findElement(By.css(this.return_btn)).click();
    this.logger.info("Redirect to the main page");
    return this;
  }
  async checkFromCityResult(city) {
    this.routes = await this.driver.findElements(
      By.xpath(this.result_from_city_xpath)
    );
    this.routeNames = await Promise.all(
      this.routes.map((excursion) => excursion.getText())
    );
    return this.routeNames.every((name) => name === city || this.from_city);
  }
  async checkToCityResult(city) {
    this.routes = await this.driver.findElements(
      By.xpath(this.result_to_city_xpath)
    );
    this.routeNames = await Promise.all(
      this.routes.map((excursion) => excursion.getText())
    );
    return this.routeNames.every((name) => name === city || this.to_city);
  }
  choosePopularRoute() {
    this.driver.findElement(By.css(this.popular_route)).click();
    this.logger.info("Redirect to the page with popular route");
    return this;
  }
  async waitChoosePopularRoute() {
    return this.driver.wait(until.elementLocated(By.css(this.popular_route)));
  }
  async GetExpectedPopularRoute() {
    let expectedPopularRoute = await this.driver.findElement(
      By.css(this.expected_popular_route)
    );
    let popularRouteText = await expectedPopularRoute.getText();
    return popularRouteText.split(" ");
  }
  async GetExpectedTextOnOrderPage() {
    let expectedOrderPageText = await this.driver.findElement(
      By.css(this.expected_text_on_order_page)
    );
    this.logger.info("Take the text from order page");
    return expectedOrderPageText.getText();
  }
  async GetExpectedTextOnViewDetails() {
    let expectedViewDetailsText = await this.driver.findElement(
      By.css(this.expected_text_on_view_details)
    );
    this.logger.info("Take the text from view details");
    return expectedViewDetailsText.getText();
  }
  async GetExpectedTextOnContinueOrderPage() {
    let expectedContinueText = await this.driver.findElement(
      By.css(this.expected_text_on_continue_order_page)
    );
    this.logger.info("Take the text from continue order page");
    return expectedContinueText.getText();
  }
  async GetExpectedMainPageText() {
    let expectedMainPageText = await this.driver.findElement(
      By.css(this.from_city_input_css)
    );
    this.logger.info("Take the text from field on main page");
    return expectedMainPageText.getAttribute("value");
  }
  async GetExpectedRoutePageText() {
    let expectedRoutePageText = await this.driver.findElement(
      By.css(this.expected_route_page_text)
    );
    this.logger.info("Take the text from route page");
    return expectedRoutePageText.getText();
  }
  updateCities({ fromCity, toCity }) {
    this.from_city = fromCity;
    this.to_city = toCity;
  }
}

module.exports = AtlasMainPage;
