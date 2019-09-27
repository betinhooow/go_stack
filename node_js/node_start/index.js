const express = require('express')

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  next();
});

const users = ["Roberto", "Maria", "Felipe", "Gabriel"];

server.get('/user', (req, res) => {
  return res.json(users)
});

server.get('/user/:id', (req, res) => {
  const { id } = req.params;

  return res.json(users[id]);
});

server.post('/user', (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(req.body);
});

server.put('/user/:id', (req, res) => {
  const { id } = req.params;
  users[id] = req.body.name;

  return res.json(users[id]); 
});

server.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);

  return res.send;
});

server.listen(3000)
