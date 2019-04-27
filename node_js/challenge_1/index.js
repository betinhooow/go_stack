const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkAge = (req, res, next) => {
  const { age } = req.query;
  
  if(!age){
    return res.redirect('/')
  }

  return next();
}

app.get('/', (req, res) => {
  res.render('age-form')
})

app.get('/major', checkAge, (req, res) => {
  res.render('major', { age: req.query.age })
})

app.get('/minor', checkAge, (req, res) => {
  res.render('minor', { age: req.query.age })
})

app.post('/check', (req, res) => {
  const {age} = req.body

  return age >= 18 ?
    res.redirect(`/major?age=${age}`)
  :
    res.redirect(`/minor?age=${age}`)
})

app.listen(3000)
