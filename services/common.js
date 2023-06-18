const passport = require("passport");

module.exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
  };
  
module.exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
  };
  
  