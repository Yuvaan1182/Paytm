const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const logger = require("../utils/logger"); // Import logger

const authMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: `Error in authentication key. Invalid Request`,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    logger.error("Error in Authentication: ", error);
    return res.status(403).json({
      message: "Authentication token not found",
    });
  }
};

module.exports = {
  authMiddleWare,
};
