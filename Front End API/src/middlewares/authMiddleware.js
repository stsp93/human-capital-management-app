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


module.exports = {
    auth,
    isAuth
}