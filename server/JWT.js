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
  if (!req.headers.authorization)
    return res.status(401).json({ message: "User not authorized" });

  const authToken = req.headers.authorization.split(" ")[1];
  console.log("authorization token:", authToken);

  // decode the contents of the token
  jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // iat stands for "issued at".
    console.log(new Date(decoded.iat * 1000)); // iat is time in seconds.  You can convert to milliseconds by multiplying the number by 1000.  Milliseconds can be converted to a Date.

    // Compare if the time right now is greater than the expiry date.  If so, the token is expired, and we should respond back to the client
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
