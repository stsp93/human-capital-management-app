function requireRoles(...roles) {
    return (req, res, next) => {
        console.log(req.user);
      const user = req.user;
      if (roles.includes(user.role)) {
        next(); 
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    };
  }
  
module.exports = { requireRoles };