const http = require('http');
const { getAgendas, getAgenda, createAgenda, updateAgenda, deleteAgenda } = require('./controllers/agendaController')

const server = http.createServer((req, res) => {

    // TODO:  Refactor this routing logic
    if (req.url === '/api/agendas' && req.method === 'GET') {
        getAgendas(req, res);

    } 
    else if(req.url.match(/\/api\/agenda\/([0-9]+)/) && req.method === "GET"){
        const id = req.url.split('/')[3]
        getAgenda(req, res, id)
    }
    else if(req.url === '/api/agendas' && req.method === "POST"){
        createAgenda(req, res)
    }
    else if(req.url.match(/\/api\/agenda\/([0-9]+)/) && req.method === "PUT"){
        const id = req.url.split('/')[3];
        updateAgenda(req, res, id)
    }
    else if(req.url.match(/\/api\/agenda\/([0-9]+)/) && req.method === "DELETE"){
        const id = req.url.split('/')[3];
        console.log("Deleting the matterz");
        deleteAgenda(req, res, id)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Route not found" }));
    }

});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => { console.log(`Server running on PORT: ${PORT}`) });