const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const ControllerAuth = require('./controllers/controllerAuth')
const { checkedIsRegister, checkedIsLogin, checkedIsNotLogin, checkIsAdmin, checkIsUser }=require('./middlewares/auth')


app.set('view engine', 'ejs' )
app.use(express.urlencoded({extended: true}))

app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        sameSite: true,
      },
    })
  );


app.get('/',checkedIsNotLogin,ControllerAuth.home)
app.get('/admin',checkIsAdmin,ControllerAuth.admin)
app.get('/register',checkedIsLogin,ControllerAuth.renderRegister)
app.post('/register',ControllerAuth.postRegister)
app.get('/login',checkedIsLogin,ControllerAuth.renderLogin)
app.post('/login',ControllerAuth.postLogin)
app.get('/logout',ControllerAuth.getLogout)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})