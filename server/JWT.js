const { sign, verify } = require("jsonwebtoken");

const createTokens = (foundUser) => {
  const accessToken = sign(
    { email: foundUser.email, id: foundUser.id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["accessToken"];
  if (!accessToken) {
    res.status(400).send("User not authenicated!");
  }
  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return req.status(400).send(err);
  }
};

module.exports = { createTokens, validateToken };
