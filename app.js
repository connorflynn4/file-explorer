const http = require('http');

//file imports
const respond = require('./lib/respond.js');

//connection settings
const port = process.env.port || 3000;


//create server
const server = http.createServer(respond);

//listen to client requests
server.listen(port,() => {
    console.log(`listening on port: ${port}`);
});
