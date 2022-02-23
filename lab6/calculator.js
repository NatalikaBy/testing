class Calculator {
    validateInputData(...args) {
        const flag =  [...args].some((arg) => isNaN(arg));
        if (flag) {
            throw Error('Input data should be numbers.');
        }
    }

    add(num1, num2) {
        this.validateInputData(num1, num2);
        return num1 + num2;
    }

    subtract(num1, num2) {
        this.validateInputData(num1, num2);
        return num1 - num2;
    }

    multiply(num1, num2) {
        this.validateInputData(num1, num2);
        return num1 * num2;
    }

    divide(num1, num2) {
        this.validateInputData(num1, num2)
        if (num2 === 0) {
            throw Error('Division by zero is forbidden.');
        }
        return num1 / num2;
    }

    pow(num, degree) {
        this.validateInputData(num, degree)
        let result = 1;
        for (let i = 0; i < degree; i++) {
            result *= num;
        }
        return result;
    }

    sqrt(num) {
        this.validateInputData(num);
        if (num < 0) {
            throw Error(`you can't use negative numbers`)
        }
        return num ** (1/2);
    }

}

module.exports = Calculator;