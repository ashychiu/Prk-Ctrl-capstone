const { sign, verify } = require("jsonwebtoken");

const createTokens = (foundUser) => {
  const accessToken = sign(
    {
      id: foundUser.id,
      firstName: foundUser.firstName,
      unitNumber: foundUser.unitNumber,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "User not authorized" });

  const authToken = req.headers.authorization.split(" ")[1];
  verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User not authorized" });
    }
    if (Date.now() > new Date(decoded.exp * 1000)) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = { createTokens, validateToken };
