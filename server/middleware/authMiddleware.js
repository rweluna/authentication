// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    // jwt token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      //save user data
      req.user = decoded;
      next(); // move to the next middleware/route
    });
  } catch (error) {
    console.error(error);
    console.error('Auth Middleware Error:', error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

module.exports = { requireAuth };
