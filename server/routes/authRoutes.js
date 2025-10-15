const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, registerUser, loginUser, logoutUser } = require('../controller/authController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');


// middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }) 
)

router.get('/test', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
// protected route
router.get('/user', requireAuth, (req, res) => {
  res.json({
    message: 'Access granted!',
    user: req.user
  });
});
router.post('/logout', logoutUser);

module.exports = router;