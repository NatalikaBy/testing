class Route{
    fromCity;
    toCity;

    constructor({fromCity, toCity}){
        this.fromCity = fromCity;
        this.toCity = toCity;
    }

    getFromCity(){
        return this.fromCity;
    }
    getToCity(){
        return this.toCity;
    }
    setFromCity(fromCity){
        this.fromCity = fromCity;
    }
    setToCity(toCity){
        this.toCity = toCity;
    }
}

module.exports = Route;
