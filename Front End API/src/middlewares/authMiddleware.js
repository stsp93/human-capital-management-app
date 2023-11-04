const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.cookies['session'];

    if (token) {
        try {
            const user = jwt.decode(token);
            if (Date.now() >= user.exp * 1000) throw new Error('Session expired');
            req.token = token
            req.user = user
            res.locals.user = user;
        } catch (err) {
            console.log(err);
            res.clearCookie('session');
            return res.status(401).redirect('/auth/login');
        }
    }

    next()
}

function isAuth(req, res, next) {
    if (!req.user) return res.redirect('/auth/login');

    next();
}

function requireRoles(...roles) {
    return (req, res, next) => {
      const user = req.user;
      if (user && roles.includes(user.role)) {
        next(); 
      } else {
        res.redirect('/employees');
      }
    };
  }
  
  function requireOwnership(req,res, next) {
    if(req.user.role === 'user' && req.user.employeeId !== req.params.id) {
      const error = 'Unauthorized access';
      return res.redirect(`/employees/${req.user.employeeId}/details?err=${error}`);
    }

    next();
  }


module.exports = {
    auth,
    isAuth,
    requireRoles,
    requireOwnership
}