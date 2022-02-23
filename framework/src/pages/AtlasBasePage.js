const { createLogger, format, transports } = require("winston");

class AtlasBasePage{
    constructor(driver){
        this.driver = driver;
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
            format.timestamp(),
            format.json()
            ),
            transports: [
            new transports.Console()
            ]
            });
    }

}

module.exports = AtlasBasePage;