const express = require('express')
const multerConfig = require('./config/multer')
const uploud = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', uploud.single('avatar'), UserController.store)

// saying that all /app routes needs to hav a session to get access
routes.use('/app', authMiddleware)

routes.get('/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

module.exports = routes
