const http = require('http');

const { markerController, defaultController } = require('./controller');

const routes = {
  '/markers': {
    GET: markerController.getMarkers,
    OPTIONS: defaultController.CORS
  }
};

const router = (req, res) => {
  const { url, method } = req;
  if (routes[url]) {
    if (routes[url][method]) {
      return routes[url][method](req, res);
    }
    return defaultController[method](req, res);
  }
  return defaultController[method](req, res);
};

const server = http.createServer(router);
server.listen(4000, () => console.log(`Server listening on port 4000`));
