const db = require('../db');
class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
       await db.populateDB();
       const people = await db.swPeople.findOne({ where: { id: this.id }});
       if(people) {
        this.id = people.id;
        this.mass = people.mass;
        this.getHeight = people.height;
        this.getHomeworlId= people.homeworld_id;
        this.name = people.name;
        this.homeworldName = people.homeworld_name;
       } else {
        this.id = null;
       }
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworlId() {
        return this.homeworlId;
    }

    getWeightOnPlanet(planetId){
        throw new Error('To be implemented');
    }
}

module.exports = AbstractPeople;