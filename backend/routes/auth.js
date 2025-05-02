const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {
  userSignin,
  userSignup,
} = require("../utils/user/userUtilityMethods");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/login/failed", (req, res) => {
  res.redirect(
    `${process.env.REACT_APP_URI}/login?failed=${true}`
  );
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    const user = req.user.user;

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id, 
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Redirect to frontend with the token as a query parameter
    res.redirect(
      `${
        process.env.REACT_APP_URI
      }/login?token=${token}&failed=${false}`
    );
  }
);

router.post("/login", userSignin);
router.post("/register", userSignup);

module.exports = router;
