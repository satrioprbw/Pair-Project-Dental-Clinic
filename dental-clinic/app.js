const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'dentalClinic',
resave: false,
saveUninitialized: true,
cookie: { secure: true }
}))

function testSession(req, res, next){
  req.session.User = 'test'
  next()
}

app.get('/', Controller.home)

app.get('/dentists',testSession, Controller.getDentists)

app.get('/appointments', (req, res) => {
  res.send('allAppointments')
})

app.get('/appointments/:dentistId', Controller.bookAppointmentRender)

app.post('/appointments/:dentistId', Controller.bookAppointmentHandler)

app.get('/addUser', Controller.addUserRender)

app.post('/addUser', Controller.addUserHandler)

app.get('/logout', (req, res) => {
  res.send('dentists')
})

app.get('/test', Controller.test)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
