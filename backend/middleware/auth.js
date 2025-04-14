// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

 
dotenv.config();  

const JWT_SECRET = "digamber";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ user: null, message: "Token not provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedPayload) => {
    if (err) {
      return res.status(403).json({ user: null, message: "Invalid or expired token" });
    }
    req.user = decodedPayload;
    next();
  });
};

export default authenticateToken;  