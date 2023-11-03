const Controller = require('./Controller');
const UserService = require('../services/userService');
const { requireRoles } = require('../middlewares/authMiddleware');
const router = require('express').Router();

class UserController extends Controller {
  constructor() {
    super(UserService);
  }

  register = async (req, res) => {
    try {
      const input = req.body;
      const newUser = await this.service.register(input);
      res.status(201).json(newUser);
    } catch (error) {
      this.errorResponse(res, error)
    }
  }
  
  login = async (req, res) => {
    try {
      const user = await this.service.login(req.body);
      return res.json(user);
    } catch (error) {
      this.errorResponse(res, error);
    }
  }

  logout = async (req, res) => {
    this.service.logout(req.token);
    res.status(204).end();
  }
}

const userController = new UserController();

// Guest Access
router.post('/register', userController.register);
router.post('/login', userController.login);
// User Access
router.get('/logout', userController.logout);

// Admin access
router.use(requireRoles('admin'));
router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);

module.exports = router;