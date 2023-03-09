const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const Controller = require('./controllers/controller')
const ControllerAuth = require('./controllers/controllerAuth')
const { checkedIsRegister, checkedIsLogin, checkedIsNotLogin, checkIsAdmin, checkIsUser } = require('./middlewares/auth')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

function testSession(req, res, next) {
  req.session.User = 'test'
  next()
}

app.get('/', Controller.home)
app.get('/dentists', testSession, Controller.getDentists)
app.get('/appointments', checkIsAdmin, Controller.showAllAppointments)
app.get('/appointments/:dentistId', checkedIsNotLogin, Controller.bookAppointmentRender)
app.post('/appointments/:dentistId', Controller.bookAppointmentHandler)
app.get('/addUser', Controller.addUserRender)
app.post('/addUser', Controller.addUserHandler)

app.get('/', checkedIsNotLogin, ControllerAuth.home)
// app.get('/admin', checkIsAdmin, ControllerAuth.admin)
app.get('/register', checkedIsLogin, ControllerAuth.renderRegister)
app.post('/register', ControllerAuth.postRegister)
app.get('/login', checkedIsLogin, ControllerAuth.renderLogin)
app.post('/login', ControllerAuth.postLogin)
app.get('/logout', ControllerAuth.getLogout)

app.get('/test', Controller.test)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
