const db = require('../db');
const app = require('..');
const { Planet } = require('../Planet');
class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
       const people = await db.swPeople.findOne({ where: { id: this.id }});
       if(people) {
        this.id = people.id;
        this.mass = people.mass;
        this.height = people.height;
        this.homeworlId= people.homeworld_id;
        this.name = people.name;
        this.homeworldName = people.homeworld_name;
       } else {
        const peopleSwapi = await app.swapiFunctions.genericRequest('https://swapi.dev/api/people/'+this.id, 'GET', null, true );
        const planetSwapi = await app.swapiFunctions.genericRequest(peopleSwapi.homeworld, 'GET', null, true );
        const { mass, height, name, homeworld } = peopleSwapi;
        this.mass = mass;
        this.height = height;
        this.name = name;
        this.homeworlId= homeworld.split('https://swapi.dev/api')[1];
        this.homeworldName = planetSwapi.name;
        await db.swPeople.create({
            id: this.id, mass, height, name, homeworld_id: this.homeworlId, homeworld_name: this.homeworldName
        })
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

    async getWeightOnPlanet(planetId){
        const natalId = this.homeworlId.replace(/\D/g, '');
        if(+natalId === +planetId) {
            throw new Error('No se puede calcular el peso en el planeta natal del personaje.');
        } else {
            const planet = new Planet(planetId);
            await planet.init();
            return { weightOnPlanet: (+this.mass) * (+planet.gravity)};
        }
    }
}

module.exports = AbstractPeople;