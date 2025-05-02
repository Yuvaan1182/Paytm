const passport = require("passport");
const GoogleStrategy =
  require("passport-google-oauth20").Strategy;
const { User, Account } = require("../db"); // Import User model
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config"); // Import JWT secret
const logger = require("../utils/logger");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            firstName,
            lastName,
            password: "google-auth",
          });
        }

        const userId = user._id;
        let account = await Account.findOne({
          userId: userId,
        });

        if (!account) {
          /** Creating Random balance to update in Account of User */
          const balance = Math.floor(
            10000 + Math.random() * 100000
          );

          account = await Account.create({
            userId,
            balance: balance,
          });
        }

        return done(null, { user }); // Pass user object to the next middleware
      } catch (error) {
        logger.error(
          `Error Occurred while Google Login/Signup`,
          error
        );
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
