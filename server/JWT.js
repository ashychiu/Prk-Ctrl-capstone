const { sign, verify } = require("jsonwebtoken");

const createTokens = (foundUser) => {
  const accessToken = sign(
    {
      email: foundUser.email,
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
  console.log("authorization token:", authToken);

  // decode the contents of the token
  verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Compare if the time right now is greater than the expiry date
    if (Date.now() > new Date(decoded.exp * 1000)) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.decoded = decoded;
    next();
  });
  //====================
  // const accessToken = req.cookies["accessToken"];
  // if (!accessToken) {
  //   res.status(400).send("User not authenicated!");
  // }
  // try {
  //   const validToken = verify(accessToken, process.env.JWT_SECRET);
  //   if (validToken) {
  //     req.authenticated = true;
  //     return next();
  //   }
  // } catch (err) {
  //   return req.status(400).send(err);
  // }
};

module.exports = { createTokens, validateToken };
