const AbstractPeople = require("./abstractPeople");
const app = require('..');
const format = '/?format=wookiee'
class WookiePeople  extends AbstractPeople {
    constructor(id){
        super(id);
        this.id = id;
    }

    async init(){
        const peopleSwapi = await app.swapiFunctions.genericRequest('https://swapi.dev/api/people/'+this.id+format, 'GET', null, true );
        const urlPlanet = peopleSwapi.acooscwoohoorcanwa.replace('acaoaoakc://cohraakah.wawoho/raakah/akanrawhwoaoc/', 'https://swapi.dev/api/planets/')
        const planetSwapi = await app.swapiFunctions.genericRequest(urlPlanet + format, 'GET', null, true );
        const { scracc, acwoahrracao, whrascwo } = peopleSwapi;
        this.mass = scracc;
        this.height = acwoahrracao;
        this.name = whrascwo;
        this.homeworlId= peopleSwapi.acooscwoohoorcanwa.split('acaoaoakc://cohraakah.wawoho/raakah')[1];
        this.homeworldName = planetSwapi.whrascwo;
    }
}

module.exports = WookiePeople