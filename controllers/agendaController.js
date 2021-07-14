const Agenda = require('../models/agendaModel')
const { getPostData } = require('../util')
// @desc    The controller method for getting all the agendas
// @route   GET api/agendas
async function getAgendas(req, res) {
    try {
        const agenda = await Agenda.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(agenda))
    } catch (error) {
        handleResError(res, error)
    }
}


// @desc    get single agenda
// @route   GET api/agenda/id
async function getAgenda(req, res, id) {
    try {
        const agenda = await Agenda.findById(id);
        if(!agenda){
            res.writeHead(401, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "Agenda not found"}));
        }else{
            res.writeHead(401, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(agenda))
        }
    } catch (error) {
        handleResError(res, error)
    }
}

// @desc    create an agenda
// @route   POST api/agendas
async function createAgenda(req, res){
    try {

        let body = await getPostData(req);
        const {title, description, start_time, end_time} = JSON.parse(body);
        const agenda = {
                title,
                description,
                start_time,
                end_time
            }
        const newProduct = await Agenda.create(agenda)
        res.writeHead(201, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(agenda))

    } catch (error) {
        handleResError(res, error)
    }
}    

// @desc    update an agenda
// @route   POST api/agenda/id
async function updateAgenda(req, res, id) {
    try {
        const agenda = await Agenda.findById(id);

        if(!agenda){
            res.writeHead(401, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "Agenda not found"}));
        }else{
            let body = await getPostData(req);
            const {title, description, price} = JSON.parse(body);
            const agendaData = {
                    title: title || agenda.title,
                    description: description || agenda.description,
                    price: price || agenda.price
                }
            const updAgenda = await Agenda.update(id, agendaData);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(updAgenda))
        }

    } catch (error) {
        handleResError(res, error)
    }
}

async function deleteAgenda(req, res, id){
    try {
        const agenda = Agenda.findById(id);
        if(!agenda){
            res.writeHead(401, { 'Content-Type': 'application/json'});
            res.end({message: "Agenda not found"});
        }else{
            console.log("Inside the main stuff");
            await Agenda.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end({message: `agenda ${id} removed`});
        }
    } catch (error) {
        handleResError(res, error);
    }
}


function handleResError(res, error){
    console.log(error)
    res.writeHead(500, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: "An internal server error occured! Please try again."}))
}

module.exports = {
    getAgendas,
    getAgenda, 
    createAgenda,
    updateAgenda,
    deleteAgenda
}