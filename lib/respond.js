const respond = (request,response) => {
    response.write('response fired');
    response.end();
}

module.exports = respond;