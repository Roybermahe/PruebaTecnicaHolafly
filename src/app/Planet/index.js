const Planet = require('./Planet');
const WookieePlanet = require('./wookiePlanet');

const planetFactory = async (id, lang) => {
    let people = null;
    if(lang === 'wookiee') {
        people = new WookieePlanet(id);
    } else {
        people = new Planet(id);
    }
    await people.init();
    return people;
}

module.exports = { planetFactory, Planet }