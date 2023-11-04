function errorMiddleware(req, res, next) {
    if (req.query.message) {
        res.locals.message = req.query.message;
    }
    if (req.query.err) {
        res.locals.error = {message: req.query.err};
    }

    next();
}

module.exports = errorMiddleware;