const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');



const app = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes : {
        cors : {
            origin : ["*"],
        }
    },
    
  });

  server.route(routes);

  await server.start();
  console.log(`Server run in ${server.info.uri}`);
};

app();
