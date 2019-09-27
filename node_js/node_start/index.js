const express = require('express')

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  next();
});

function checkUserExists(req, res, next){
  if(!req.body.name){
    res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next){
  const user = users[req.params.id];

  if(!user){
    return res.status(400).json({ error: "User does not exist" });
  }

  req.user = user;

  next();
}

const users = ["Roberto", "Maria", "Felipe", "Gabriel"];

server.get('/user', (req, res) => {
  return res.json(users)
});

server.get('/user/:id', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/user', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(req.body);
});

server.put('/user/:id', checkUserInArray, checkUserExists, (req, res) => {
  const { id } = req.params;
  users[id] = req.body.name;

  return res.json(users[id]); 
});

server.delete('/user/:id', checkUserInArray, (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);

  return res.send;
});

server.listen(3000)
