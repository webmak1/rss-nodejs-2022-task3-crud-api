import { CONFIG } from 'common/config';
import { Controller } from 'controllers/productController';
import * as http from 'http';

const server = http.createServer((req, res) => {
  console.log(req.url?.split('/'));
  console.log(req.method);
  console.log(req.url?.match(/\/api\/products\/\w+/));

  if (req.url === '/api/products' && req.method === 'GET') {
    Controller.getProducts(req, res);
  } else if (req.url?.match(/\/api\/products\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    Controller.getProduct(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    Controller.createProduct(req, res);
  } else if (req.url?.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    Controller.updateProduct(req, res, id);
  } else if (
    req.url?.match(/\/api\/products\/\w+/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    Controller.deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found!' }));
  }
});

server.listen(CONFIG.PORT, () =>
  console.log(`Server running on port ${CONFIG.PORT}`)
);
