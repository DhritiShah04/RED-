require('dotenv').config();           // ✅ Loads environment variables from .env
const jwt = require('jsonwebtoken');  // ✅ JWT library

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ Check for Authorization header and Bearer format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // ✅ Verifies token
    req.user = decoded;                            // ✅ Attaches user data to request object
    next();                                        // ✅ Proceeds to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
