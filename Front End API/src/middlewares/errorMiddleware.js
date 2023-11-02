function errorMiddleware(req, res, next) {
    if (req.body.err) {
        res.locals.error = req.body.err;
    }

    next();
}

module.exports = errorMiddleware;