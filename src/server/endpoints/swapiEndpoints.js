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
        let  people = await peopleFactory(id, '');
        res.json(people);
       } catch (error) {
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
        res.sendStatus(501);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;