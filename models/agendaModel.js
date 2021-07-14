const agenda_json_file = './data/agenda.json';
let agendas = require('../data/agenda.json');
const {UUID, writeDatatoFile} = require('../util');

function findAll() {
    // we need a promise just to simulate what ever we will do in the database
    return new Promise((resolve, reject) => {
        resolve(agendas)

    })
}


function findById(id) {
    return new Promise((resolve, reject) => {
        // let agenda = agendas.find((p) => { p.id == id}) // this was the code in the tuts
        // const agenda = agendas.find( ({ id }) => parseInt(id) === parseInt(id)); 
        let agenda;
        for(let i = 0; i < agendas.length; i++){
            if(agendas[i].id === ''+id){
                agenda = agendas[i];
                break;
            }
        }
        resolve(agenda)
    })
}


// TODO: the id is not returned, work on it later
function create(agenda){
    return new Promise((resolve, reject) => {
        const newAgenda = {id: UUID(), ...agenda}
        agendas.push(newAgenda);
        writeDatatoFile(agenda_json_file, agendas)
        resolve(newAgenda)
    })
}


function update(agenda, id){
    return new Promise((resolve, reject) => {
        const index = agendas.findIndex((p) => p.id);
        agendas[index] = {id, ...agendas}
        writeDatatoFile(agenda_json_file, agendas)
        resolve(agendas[index])
    })
}


function remove(id){
    agendas = agendas.filter((p) => {p.id === id})
    writeDatatoFile(agenda_json_file, agendas);
    resolve();
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}