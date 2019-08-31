const url = require('url');
const path = require('path');
const fs = require('fs');

const staticBasePath = path.join(__dirname, '..','static');


//responds to a request
const respond = (request,response) => {
   


    let pathname = url.parse(request.url,true).pathname;
if(pathname === '/favicon.ico') return false;

pathname = decodeURIComponent(pathname);


const fullStaticPath = path.join(staticBasePath, pathname);


//finding something in full static path
//if not - a 404 message will be sent instead.

if(!fs.existsSync(fullStaticPath)) {
console.log(`${fullStaticPath} does not exist`)
response.write('404: File not Found');
response.end();
}else{
    response.write('File Found');
response.end();
}

}



module.exports = respond;