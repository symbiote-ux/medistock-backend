const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const invalidTokenMsg = process.env.TOKEN_INVALID;

  if (token == null)
    return res.sendStatus(401).json({
      message: invalidTokenMsg,
    });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.sendStatus(403).json({
        message: invalidTokenMsg,
      });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
