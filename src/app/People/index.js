const CommonPeople = require('./commonPeople');

const peopleFactory = async (id, lang) => {
    let people = null;
    people = new CommonPeople(id);
    await people.init();
    return people;
}

module.exports = { peopleFactory }