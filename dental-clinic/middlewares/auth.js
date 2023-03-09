const checkedIsLogin = (req, res, next) => {
    if (req.session.userId) {
      res.redirect(`/`);
    } else {
      next();
    }
};
const checkedIsNotLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect(`/login`);
    } else {
      next();
    }
};
const checkedIsRegister = (req, res, next) => {
    if (!req.session.userId) {
      const errMessage = 'Please Login First'
      res.redirect(`/register`);
    } else {
      next();
    }
};
const checkIsAdmin = (req, res, next) => {
    if (req.session.role !== 'admin') {
      res.redirect('/');
    } else {
      next();
    }
};
const checkIsUser = (req, res, next) => {
    if (req.session.role !== 'user') {
      res.redirect('/user')
    } else {
      next()
    }
}
  
module.exports = { checkedIsRegister, checkedIsLogin, checkIsAdmin, checkIsUser, checkedIsNotLogin };