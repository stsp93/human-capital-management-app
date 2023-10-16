const { verifyToken } = require("../services/userService");


module.exports = () => async (req, res, next) => {

    const token = req.headers['authorization'];
    if (token) {
        try {
            const user = await verifyToken(token);
            req.user = user
            req.token = token
        } catch (error) {
            if(error.name === 'TokenExpiredError') return res.status(403).json(error);

           return res.status(401).json(error);
        }
    }

    next()
}