const Route = require('../models/Route');
const TestDataReader = require('./testDataReader');
const environments = require('../utils/environment.constants')

class RouteCreator {

static dev_ROUTES = 'dev.routes.properties';
static qa_ROUTES = 'qa.routes.properties';

static async withRoutesCredentialsFromProperty() {
    const propertyName = process.argv[process.argv.length - 1].slice(1);
    const isPropertyNameExists = environments.includes(propertyName);
    if (isPropertyNameExists) {
    return new Route(await TestDataReader.getTestData(this[`${ propertyName }_ROUTES`]));
    }
    return new Route(await TestDataReader.getTestData(this[`${ environments[0] }_ROUTES`]));
}

}

module.exports = RouteCreator;