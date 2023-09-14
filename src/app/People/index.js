const CommonPeople = require('./commonPeople');
const WookiePeople = require('./wookiePeople');

const peopleFactory = async (id, lang) => {
    let people = null;
    if(lang === 'wookiee') {
        people = new WookiePeople(id);
    } else {
        people = new CommonPeople(id);
    }
    await people.init();
    return people;
}

module.exports = { peopleFactory }