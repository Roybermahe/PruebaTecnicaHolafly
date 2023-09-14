const Planet = require("./Planet");
const app = require('..');
const format = '/?format=wookiee'
class WookieePlanet extends Planet {
    constructor(id) {
        super(id);
        this.id = id;
    }

    async init() {
        const planetSwapi = await app.swapiFunctions.genericRequest('https://swapi.dev/api/planets/'+this.id + format, 'GET', null, true);
        const { whrascwo, rrrcrahoahaoro} = planetSwapi;
        this.name = whrascwo;
        this.gravity = parseFloat(rrrcrahoahaoro.replace(/\D/g, ''));
    }
}

module.exports = WookieePlanet;