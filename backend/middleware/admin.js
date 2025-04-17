const isAdmin = (req, res, next) => {
    if (req.user && req.user.admin === true) {
      return next(); // move to the actual route
    } else {
      return res.status(403).json({ message: 'Forbidden: Admin privileges required.' });
    }
  };
  
  export default isAdmin;
  