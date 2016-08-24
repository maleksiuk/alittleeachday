'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

const server = new Hapi.Server();
server.register(Inert, function(err) {
  if (err) throw err;
});
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: Path.join(__dirname, 'index.html')
  }
});

server.route({		
  method: 'GET', 
  path: '/public/{path*}', 
  handler: {			
    directory: {				
      path: './public',				
      listing: false,				
      index: false			
    }		
  }
});	

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
