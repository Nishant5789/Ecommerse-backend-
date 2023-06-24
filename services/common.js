const passport = require("passport");

module.exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
  };
  
module.exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt'); 
  };

module.exports.cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };
  
  
  