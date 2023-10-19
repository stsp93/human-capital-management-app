const Controller = require('./Controller');
const UserService = require('../services/userService');
const errorHandler = require('../utilities/errorHandler');
const router = require('express').Router();

class UserController extends Controller {
  constructor() {
    super(UserService);
  }

  login = async(req, res) => {
    try {
      const user = await this.service.login(req.body);
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json(errorHandler(error));
    }
  }

  logout = async (req, res) => {
    this.service.logout(req.token);
    res.status(204).end();
  }
}

const userController = new UserController();

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;