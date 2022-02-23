const { By, until } = require('selenium-webdriver');

class AtlasMainPage {
    BASE_URL = 'https://atlasbus.by/';

    routes;
    routeNames;

    from_city = 'Москва';
    to_city = 'Могилёв';

    from_city_input_css = '.MuiGrid-root.MuiGrid-item:nth-child(1) .MuiInputBase-input';
    to_city_input_css = '.MuiGrid-root.MuiGrid-item:nth-child(2) .MuiInputBase-input';
    from_city_name_css = '.MuiTypography-root';
    to_city_name_xpath = `//span[text()="${ this.to_city }"]`;
    choose_date_css = '.MuiButtonBase-root.MuiIconButton-root.jss115.jss117.jss118';
    find_routes_button_css = '.MuiButtonBase-root.MuiButton-root.MuiButton-contained';
    result_from_city_xpath = `//div[text()="${ this.from_city }"]`;
    result_to_city_xpath = `//div[text()="${ this.to_city }"]`;

    constructor(driver){
        this.driver = driver;
    };
    openAtlasSite(){
        this.driver.get(this.BASE_URL);
        return this;
    }

    async waitFromCityInput() {
        return this.driver.wait(until.elementLocated(By.css(this.from_city_input_css)));
    }
    async waitCityName() {
        return this.driver.wait(until.elementLocated(By.css(this.from_city_name_css)));
    }
    async waitFindRoutesButton() {
        return this.driver.wait(until.elementLocated(By.css(this.find_routes_button_css)));
    }
    async waitDate() {
        return this.driver.wait(until.elementLocated(By.css(this.choose_date_css)));
    }
    async waitSearchResult() {
        return this.driver.wait(until.elementLocated(By.xpath(this.result_from_city_xpath)));
    }
    writeFromCity() {
        this.driver.findElement(By.css(this.from_city_input_css)).sendKeys(this.from_city);
        return this;
    }
    writeToCity() {
        this.driver.findElement(By.css(this.to_city_input_css)).sendKeys(this.to_city);
        return this;
    }
    chooseFromCity() {
        this.driver.findElement(By.css(this.from_city_name_css)).click();
        return this;
    }
    chooseToCity() {
        this.driver.findElement(By.xpath(this.to_city_name_xpath)).click();
        return this;
    }
    chooseDate() {
        this.driver.findElement(By.css(this.choose_date_css)).click();
        return this;
    }
    findRoutes() {
        this.driver.findElement(By.css(this.find_routes_button_css)).click();
        return this;
    }
    async checkFromCityResult() {
        this.routes = await this.driver.findElements(By.xpath(this.result_from_city_xpath));
        this.routeNames = await Promise.all(this.routes.map(excursion => excursion.getText()));
        return this.routeNames.every(name => name === this.from_city);
    }
    async checkToCityResult() {
        this.routes = await this.driver.findElements(By.xpath(this.result_to_city_xpath));
        this.routeNames = await Promise.all(this.routes.map(excursion => excursion.getText()));
        return this.routeNames.every(name => name === this.to_city);
    }
}

module.exports = AtlasMainPage;
