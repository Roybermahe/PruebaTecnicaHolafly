const { peopleFactory } = require("../../app/People");
const { Planet } = require("../../app/Planet");

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
       try {
        const id = req.params['id'];
        const lang = req.query['lang'] || '';
        let  people = await peopleFactory(id, lang);
        console.log(people);
        res.json(people);
       } catch (error) {
        console.log(error);
        res.sendStatus(501);
       }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        try {
            const id = req.params['id'];
            let  planet = new Planet(id);
            await planet.init();
            res.json(planet);
        } catch (error) {
            res.sendStatus(501);
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try {
            const peopleId = req.query['people'];
            const planetId = req.query['planet'];
            let  people = await peopleFactory(peopleId, '');
            let weight = await people.getWeightOnPlanet(planetId)
            res.json(weight);
        } catch (error) {
            res.send(error.message);
            //res.sendStatus(501);
        }
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;