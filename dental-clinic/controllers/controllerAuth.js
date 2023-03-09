const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt');

class ControllerAuth {
  static home(req,res) {
    // console.log(req.session,"<<<<<<<<<<<<<<<<<");
    res.render('home')
  }  
  static admin(req,res) {
    // console.log(req.session,"<<<<<<<<<<<<<<<<<");
    res.render('admin')
  }  
  static renderLogin(req, res) {
    // console.log(req.session);
    res.render('login');
  }

  static postLogin(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (user) {
          const isValidPassword = comparePassword(password, user.password);
        //   console.log(isValidPassword);
          if (isValidPassword) {
            req.session.userId = user.id;
            req.session.role = user.role;
            req.session.email = user.email;
            // console.log(req.session.userId,req.session.role,req.session.email);
            if (user.role === 'admin') {
              return res.redirect('/');
            } else {
              return res.redirect('/');
            }
          } else {
            const errorMessage = 'Invalid username/password';
            return res.redirect(`/login?error=${errorMessage}`);
          }
        } else {
          const errorMessage = `There is no user with email ${email}`;
          return res.redirect(`/login?error=${errorMessage}`);
        }
      })
      .catch((err) => {
        // console.log(err);
        res.send(err);
      });
  }

  static renderRegister(req, res) {
    let errors = req.query.error;
    // console.log(req.session);

    // res.send(errors);
    res.render('register', { errorMessage: errors });
  }

  static postRegister(req, res) {
    // console.log(req.body);
    const { username, email, password } = req.body
    // console.log(req.body);
    User.create({ username, email, password})
      .then((result) => {
        // console.log(result);
        res.redirect('/login');
      })
      .catch((err) => {
        // console.log(err);
        res.send(err)
      });
  }

  static getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  }
}

module.exports = ControllerAuth;