const dateFormatter = require("../helpers/dateFormatter")
const { Dentist, User, Appointment, Profile } = require("../models")

class Controller {
  static home(req, res) {
    // console.log(req.session.role);
    res.render('index', { role: req.session.role })

  }

  static getDentists(req, res) {
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
        res.render('bookForm', { values: values[0] })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static bookAppointmentHandler(req, res) {
    const { dentistId } = req.params
    const { treatment, day, time } = req.body
    console.log(req.session);
    const displayDate = dateFormatter(day, time)
    Appointment.create({ treatment, schedule: displayDate, DentistId: dentistId, UserId: req.session.userId })
      .then(values => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addUserRender(req, res) {
    res.render('userForm')
  }

  static addUserHandler(req, res) {
    const { first_name, last_name, gender, phone, birthDate } = req.body
    Profile.create({ UserId: req.session.userId, first_name, last_name, gender, phone, birthDate })
      .then(values => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static showAllAppointments(req, res) {
    Appointment.findAll({
      include: [Dentist, { model: User, include:  Profile  }]
    })
      .then(values => {
        res.send(values)
        // res.render('allAppointments', { values })

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
        res.send(err)
      })
  }
}

module.exports = Controller