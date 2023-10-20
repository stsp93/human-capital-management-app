function requireRoles(...roles) {
    return (req, res, next) => {
      const user = req.user;
      if (user && roles.includes(user.role)) {
        next(); 
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    };
  }
  
module.exports = { requireRoles };