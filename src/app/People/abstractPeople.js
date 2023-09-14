const app = require('..');
const { Planet } = require('../Planet');
class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init() {
        throw new Error('Not in Abstract class')
    };

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
            return { weightOnPlanet: app.swapiFunctions.getWeightOnPlanet(+this.getMass(), +planet.getGravity())};
        }
    }
}

module.exports = AbstractPeople;