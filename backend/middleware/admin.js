// middleware/admin.js

const isAdmin = (req, res, next) => {
  
  
    if (req.user && req.user.admin === true) {
   
    } else {
      
      res.status(403).json({ message: 'Forbidden: Admin privileges required.' });
    }
  };
  
  export default isAdmin;