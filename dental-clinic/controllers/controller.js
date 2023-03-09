const { Dentist, User, Appointment, Profile } = require("../models")

class Controller {
  static home(req, res) {
    req.session.message = 'ini dari session'
    res.render('index')
    
  }

  static getDentists(req, res) {
    console.log(req.session);
    Dentist.findAll()
      .then(values => {
        // res.send(values)
        res.render('dentists', { values })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static bookAppointmentRender(req, res) {
    const { dentistId } = req.params
    Dentist.findAll({ where: { id: dentistId }, include: { model: Appointment, include: { model: User } } })
      .then(values => {
        // res.send(values)
        res.render('bookForm', { values: values[0] })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static bookAppointmentHandler(req, res) {
    const { dentistId } = req.params
    const { treatment, day, time} = req.body
    let year = day.split("-")[0]
    let month = day.split("-")[1]
    let dayTemp = day.split("-")[2]
    let hour = time.split(":")[0]
    let minutes = time.split(":")[1]
    const date = new Date(year, month, dayTemp, hour, minutes)
    const displayDate = new Date(date-date.getTimezoneOffset() * 60000)
    Appointment.create({treatment, displayDate})
    // console.log(displayDate);
    res.send(displayDate)
  }

  static addUserRender(req, res) {
    res.render('userForm')
  }

  static addUserHandler(req, res) {
    const { username, email, password, first_name, last_name, gender, phone, birthDate } = req.body
    User.create({ username, email, password })
      .then(data => {
        return Profile.create({ UserId: data.id, first_name, last_name, gender, phone, birthDate })
      })
      .then(values => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }


  static test(req, res) {
    User.create({ username: 'test', email: 'test@mail.com', password: '13989hwew', role: 'user' })
      .then(values => {
        res.send(values)
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = Controller