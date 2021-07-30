const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      msg: 'There is not token in the header, invalid authentication',
    });
  }

  try {
    const encrypted = jwt.verify(token, process.env.SECRET);
    req.user = encrypted.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
