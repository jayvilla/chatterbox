var fs = require('fs');
/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/plain'
};

var results = {results: []};

var requestHandler = function(request, response) {
  // headers['Content-Type'] = 'text/plain';

  console.log(results);

  if (request.method == 'GET' && request.url == '/classes/messages') {
    console.log('Serving request type ' + request.method + ' for url ' + request.url);

    var statusCode = 200;

    var headers = defaultCorsHeaders;

    response.writeHead(statusCode, headers);
    console.log('response-status code: ', response.statusCode);

    var stringifiedResponse = JSON.stringify(results);
    response.end(stringifiedResponse);
    
    } else if (request.method == 'POST' && request.url == '/classes/messages') {
      console.log('Serving request type ' + request.method + ' for url ' + request.url);
      response.writeHead(201, defaultCorsHeaders);
      request.on('data', function(data) {
        var parsedData = JSON.parse(data);
        results.results.push(parsedData);
      });
      // response.write('201 Request: The request has been fulfilled and has resulted in one or more new resources being created.');
      response.end();
    } else {
      response.writeHead(404, defaultCorsHeaders);
      // response.write('Error 404: Page not found!');
      response.end();
    }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.requestHandler = requestHandler;
