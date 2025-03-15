// const jwt = require("jsonwebtoken");
// const { logger } = require("../config/logger");

// exports.authenticate = async (req, res, next) => {
//   try {
//     // Get the token from the request headers or cookies
//     const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

//     // Attach the decoded user information to the request object
//     req.user = decoded;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     logger.error("Authentication error:", error);
//     return res.status(401).json({ message: "Invalid or expired token." });
//   }
// };