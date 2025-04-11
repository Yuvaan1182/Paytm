const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const logger = require("./utils/logger"); // Import logger

app.use(cors({ origin: process.env.REACT_APP_URI }));
app.use(express.json());

const apiLimiter = require("./middlewares/rateLimiter");

// Apply rate limiter to all API routes
app.use("/api", apiLimiter);

const mainRouter = require("./routes/index.js");

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server started on PORT: ${PORT}`);
});
