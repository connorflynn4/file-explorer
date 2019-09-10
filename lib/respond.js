const url = require('url');
const path = require('path');
const fs = require('fs');

const buildBreadcrumb = require('./breadcrumb.js');

const buildMainContent = require('./mainContent.js')

const staticBasePath = path.join(__dirname, '..', 'static');

//responds to a request
const respond = (request,response) => {
   


    let pathname = url.parse(request.url, true).pathname;

    //if favicon.ico stop
    if(pathname === '/favicon.ico'){
        return false;
    }

    pathname = decodeURIComponent(pathname);


 //get the corresponding full static path located in the static folder
 const fullStaticPath = path.join(staticBasePath, pathname);


//finding something in full static path
//if not - a 404 message will be sent instead.

 //no: send '404: File Not Found!'
 if(!fs.existsSync(fullStaticPath)){
    console.log(`${fullStaticPath} does not exist`);
    response.write('404: File not found!');
    response.end();
    return false;
}



let stat;
    try{
        stat = fs.lstatSync(fullStaticPath);
    }catch(err){
        console.log(`lstatSync Error: ${err}`);
    }




    //get content from html file
    if(stat.isDirectory()){
        //get content from the template index.html
        let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8');
        
        console.log(pathname);
        
        //build the page title
        
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element !== '');
        let folderName = pathElements[0];
        if(folderName === undefined){
            folderName = 'Home';
        }
        console.log(folderName);
        
        
        
//building the breadcrumb 
const breadcrumb = buildBreadcrumb(pathname);


//main content
const mainContent = buildMainContent(fullStaticPath,pathname);


data = data.replace('page_title', folderName);
data = data.replace('pathname',breadcrumb);
data = data.replace('mainContent',mainContent);
        response.statusCode = 200;
        response.write(data);
        return response.end();
    }

    if(!stats.isFile()){
        response.statusCode = 401;
        response.write('401: Access Denied');
        console.log('not a file');
        return response.end();
    }


// response.write(stat.isDirectory().toString());
// response.end();

}



module.exports = respond;