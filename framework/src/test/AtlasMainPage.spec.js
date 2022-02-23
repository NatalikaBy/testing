const assert = require("assert");
const AtlasMainPage = require("../pages/AtlasMainPage");
const { Builder } = require("selenium-webdriver");
const Driver = require("../../driver/Driver");
const chrome = require("selenium-webdriver/chrome");
const RouteCreator = require("../../services/routeCreator");

describe("Test atlas main page", () => {
  let driver;
  let atlasMainPage;
  beforeEach(async function () {
    driver = await Driver.getDriver();
    atlasMainPage = new AtlasMainPage(driver);
  });

  afterEach(async function () {
    driver = await Driver.closeDriver();
  });

  it("should return tickets with popular route ", async function () {
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitChoosePopularRoute();
    atlasMainPage.choosePopularRoute();
    let [fromCity, , toCity] = await atlasMainPage.GetExpectedPopularRoute();
    const expectedFromCity = await atlasMainPage.checkFromCityResult(fromCity);
    const expectedToCity = await atlasMainPage.checkToCityResult(toCity);
    assert.ok(expectedFromCity && expectedToCity);
  });

  it("should return tickets ", async function () {
    let routes = await RouteCreator.withRoutesCredentialsFromProperty();
    atlasMainPage.updateCities(routes);
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitFromCityInput();
    atlasMainPage.writeFromCity(routes.getFromCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseFromCity().writeToCity(routes.getToCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseToCity();
    await atlasMainPage.waitDate();
    atlasMainPage.chooseDate();
    await atlasMainPage.waitFindRoutesButton();
    atlasMainPage.findRoutes();
    await atlasMainPage.waitSearchResult();
    const isFromCity = await atlasMainPage.checkFromCityResult(
      routes.getFromCity()
    );
    const isToCity = await atlasMainPage.checkToCityResult(routes.getToCity());

    assert.ok(isFromCity && isToCity);
  });

  it("should return text from order page ", async function () {
    let routes = await RouteCreator.withRoutesCredentialsFromProperty();
    atlasMainPage.updateCities(routes);
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitFromCityInput();
    atlasMainPage.writeFromCity(routes.getFromCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseFromCity().writeToCity(routes.getToCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseToCity();
    await atlasMainPage.waitDate();
    atlasMainPage.chooseDate();
    await atlasMainPage.waitFindRoutesButton();
    atlasMainPage.findRoutes();
    await atlasMainPage.waitSearchResult();
    await atlasMainPage.waitOrderButton();
    atlasMainPage.orderPage();
    await atlasMainPage.waitOrderPageText();
    let orderPageText = await atlasMainPage.GetExpectedTextOnOrderPage();
    assert.strictEqual(orderPageText, "Остановки");
  });

  it("should open details of route ", async function () {
    let routes = await RouteCreator.withRoutesCredentialsFromProperty();
    atlasMainPage.updateCities(routes);
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitFromCityInput();
    atlasMainPage.writeFromCity(routes.getFromCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseFromCity().writeToCity(routes.getToCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseToCity();
    await atlasMainPage.waitDate();
    atlasMainPage.chooseDate();
    await atlasMainPage.waitFindRoutesButton();
    atlasMainPage.findRoutes();
    await atlasMainPage.waitSearchResult();
    await atlasMainPage.waitViewDetailsButton();
    atlasMainPage.viewDetails();
    await atlasMainPage.waitViewDetailsButton();
    let orderPageText = await atlasMainPage.GetExpectedTextOnViewDetails();
    assert.strictEqual(orderPageText, "Сводная информация");
  });

  it("should return text from continue details of order page", async function () {
    let routes = await RouteCreator.withRoutesCredentialsFromProperty();
    atlasMainPage.updateCities(routes);
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitFromCityInput();
    atlasMainPage.writeFromCity(routes.getFromCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseFromCity().writeToCity(routes.getToCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseToCity();
    await atlasMainPage.waitDate();
    atlasMainPage.chooseDate();
    await atlasMainPage.waitFindRoutesButton();
    atlasMainPage.findRoutes();
    await atlasMainPage.waitSearchResult();
    await atlasMainPage.waitOrderButton();
    atlasMainPage.orderPage();
    await atlasMainPage.waitOrderPageText();
    await atlasMainPage.waitContinueButton();
    atlasMainPage.continuePage();
    await atlasMainPage.waitContinuePageText();
    let continuePageText =
      await atlasMainPage.GetExpectedTextOnContinueOrderPage();
    assert.strictEqual(continuePageText, "Телефон для связи");
  });

  it("should return field value ", async function () {
    let routes = await RouteCreator.withRoutesCredentialsFromProperty();
    atlasMainPage.updateCities(routes);
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitFromCityInput();
    atlasMainPage.writeFromCity(routes.getFromCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseFromCity().writeToCity(routes.getToCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseToCity();
    await atlasMainPage.waitDate();
    atlasMainPage.chooseDate();
    await atlasMainPage.waitFindRoutesButton();
    atlasMainPage.findRoutes();
    await atlasMainPage.waitSearchResult();
    await atlasMainPage.waitReturnButton();
    atlasMainPage.ReturnMainPage();
    await atlasMainPage.waitFromCityInput();
    let MainPageText = await atlasMainPage.GetExpectedMainPageText();
    assert.strictEqual(MainPageText, routes.getFromCity());
  });

  it("should return text from routes page ", async function () {
    let routes = await RouteCreator.withRoutesCredentialsFromProperty();
    atlasMainPage.updateCities(routes);
    atlasMainPage.openAtlasSite();
    await atlasMainPage.waitFromCityInput();
    atlasMainPage.writeFromCity(routes.getFromCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseFromCity().writeToCity(routes.getToCity());
    await atlasMainPage.waitCityName();
    atlasMainPage.chooseToCity();
    await atlasMainPage.waitDate();
    atlasMainPage.chooseDate();
    await atlasMainPage.waitFindRoutesButton();
    atlasMainPage.findRoutes();
    await atlasMainPage.waitSearchResult();
    await atlasMainPage.waitRoutePage();
    let routePageText = await atlasMainPage.GetExpectedRoutePageText();
    console.log(routePageText);
    assert.strictEqual(routePageText, "Цены на ближайшие даты");
  });
});
