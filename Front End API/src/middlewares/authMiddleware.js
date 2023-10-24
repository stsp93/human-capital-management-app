const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.cookies['session'];

    if (token) {
        try {
            const user = jwt.decode(token);
            console.log(user);
            req.token = token
            req.user = user
            res.locals.user = user;
        } catch (err) {
            console.log(err);
            res.clearCookie('session');
            res.status(401).redirect('/login');
        }
    }

    next()
}

function checkAuth(req,res,next) {
    if(!req.user) return res.redirect('/auth/login');
    next();
}


module.exports = {
    auth,
    checkAuth
}