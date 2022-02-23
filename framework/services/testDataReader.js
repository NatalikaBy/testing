const fs = require('fs/promises');

class TestDataReader {

  static async getTestData(fileName) {
    return (await fs.readFile(`./resources/${ fileName }`, 'utf-8'))
      .toString()
      .replace(/\r\n/g, '\n')
      .split('\n')
      .reduce((queryInfo, resourceString) => {
        if (resourceString.length > 0) {
          const [fieldName, fieldValue] = resourceString.split('=');
          queryInfo[fieldName] = fieldValue;
        }
        return queryInfo;
      }, {});
  }

}

module.exports = TestDataReader;
