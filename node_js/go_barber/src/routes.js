const express = require('express')
const multerConfig = require('./config/multer')
const uploud = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')

routes.get('/signup', UserController.create)
routes.post('/signup', uploud.single('avatar'), UserController.store)

module.exports = routes
