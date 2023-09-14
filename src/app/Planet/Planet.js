const app = require('..')
class Planet {
    constructor(id){
        this.id = id;
    }

    async init(){
       const planet = await app.db.swPlanet.findOne({ where: { id: this.id }});
       if(planet) {
        const { name, gravity} = planet;
        this.name = name;
        this.gravity = gravity;
       } else {
        const planetSwapi = await app.swapiFunctions.genericRequest('https://swapi.dev/api/planets/'+this.id, 'GET', null, true);
        const { name, gravity} = planetSwapi;
        this.name = name;
        this.gravity = parseFloat(gravity.replace(/\D/g, ''));
        await app.db.swPlanet.create({
            id: this.id, name, gravity: this.gravity
        })
       }
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

module.exports = Planet;