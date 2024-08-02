// utils/authMiddleware.js
const cookieParser = require('cookie-parser');

const userIdentificationMiddleware = (req, res, next) => {
  // Use cookie-parser middleware
  cookieParser()(req, res, () => {
    const userId = req.cookies.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not identified' });
    }

    req.userId = userId;
    next();
  });
};

module.exports = userIdentificationMiddleware;
