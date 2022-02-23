const assert = require('assert');
const Calculator = require('./calculator');

describe('Check Calculator', () => {
    let calc;
    before(() => {
        calc = new Calculator();
    });
    it('Should return correct sum of 1 and 2.', () => {
        const expected = 3;
        const actual = calc.add(1, 2);
        assert.equal(actual, expected);
    });

    it('Should return correct difference of 3 and 2.', () => {
        const expected = 1;
        const actual = calc.subtract(3, 2);
        assert.equal(actual, expected);
    });

    it('Should return correct product of 5 and -1.', () => {
        const expected = -5;
        const actual = calc.multiply(5, -1);
        assert.equal(actual, expected);
    });

    it('Should return correct result of division of 20 and 2.', () => {
        const expected = 10;
        const actual = calc.divide(20, 2);
        assert.equal(actual, expected);
    });

    it('Should return correct result of sqrt of 16.', () => {
        const expected = 4;
        const actual = calc.sqrt(16);
        assert.equal(actual, expected);
    });

    it('Should return correct result of pow in degree 2 in 4.', () => {
        const expected = 16;
        const actual = calc.pow(2, 4);
        assert.equal(actual, expected);
    });
});

describe('Check errors', () => {
    let calc;
    before(() => {
        calc = new Calculator();
    });
    describe('In specific cases an Error should be thrown.', () => {
        it('Should throw Error with text "Input data should be numbers." if input data are not numbers.', () => {
            assert.throws(() => calc.validateInputData('s', undefined, 'd'), Error, 'Input data should be numbers.');
        });

        it(`Should throw Error with text "you can't use negative numbers" if input are not positive number.`, () => {
            assert.throws(() => calc.sqrt(-4), Error, `you can't use negative numbers`);
        });

        it('Should throw Error with text "Division by zero is forbidden." if divisor are equal to zero.', () => {
            assert.throws(() => calc.divide(10, 0), Error, 'Division by zero is forbidden.');
        });
    });
});


