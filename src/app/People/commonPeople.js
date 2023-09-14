const AbstractPeople = require("./abstractPeople");

class CommonPeople extends AbstractPeople {
    constructor(id){
       super(id);
       this.id = id;
    }
}

module.exports = CommonPeople;