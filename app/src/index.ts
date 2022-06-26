// TODO
// hobby[]
// multi

import * as http from 'http';
import { CONFIG } from './common/config';
import { Controller } from './users/userController';

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    Controller.getAll(req, res);
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    Controller.getById(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    Controller.create(req, res);
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    if (id) {
      Controller.update(req, res, id);
    }
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    Controller.remove(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found!' }));
  }
});

server.listen(CONFIG.PORT || 4000, () =>
  console.log(`Server running on port ${CONFIG.PORT}`)
);
