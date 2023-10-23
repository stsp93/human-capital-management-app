async function auth(req, res, next) {
    const session = req.cookies['session'];

    if (session) {
        try {
            req.user = session
            res.locals.user = session.username;
        } catch (err) {
            console.log(err);
            res.clearCookie('session')
            res.status(401).redirect('/login')
        }
    }

    next()
}

module.exports = {
    auth
}