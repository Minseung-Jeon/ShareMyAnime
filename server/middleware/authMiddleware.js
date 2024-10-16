const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  console.log("authMiddleware", token, "\n");
  if (!token) {
    return res.json({ message: "Authorization token missing" });
  }

  try {
    const actualToken = token.split(" ")[1];
    console.log("actual token:", actualToken);
    const decoded = jwt.verify(actualToken, jwtSecret);
    console.log("full decoded", decoded);
    console.log("date now:", Date.now()/1000);

    if (decoded.exp < Date.now() / 1000){
      console.log("Token expired");
      return res.json({ message: "Token expired" });
    }
    console.log("decoded user:", decoded.user);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
