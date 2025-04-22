/** User Router Methods */
const jwt = require("jsonwebtoken");
const logger = require("../logger"); // Import logger

const JWT_SECRET = require("../../config");
const { User, Account } = require("../../db");
const { signUpbody, signInbody, updateBody } = require("./userInputConfig");

const userSignup = async (req, res) => {
  try {
    const { success } = signUpbody.safeParse(req.body);

    /** Checking input format of request */
    if (!success) {
      return res.status(411).json({
        message: `Incorrect inputs`,
      });
    }

    const existingUser = await User.findOne({
      email: req.body.email,
    });

    /** Checking if user already exists */
    if (existingUser) {
      return res.status(411).json({
        message: `Email already taken / Incorrect inputs`,
      });
    }

    /** Updating User in User model */
    const dbUser = await User.create(req.body);

    const userId = dbUser._id;

    /** Creating Random balance to update in Account of User */
    const balance = Math.floor(10000 + Math.random() * 100000);

    /** Updating a random balance in User Account i.e, Account Model */
    await Account.create({
      userId,
      balance: balance,
    });

    /** Creating JWT token for User for Authorization */
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      balance: balance,
      message: `User created successfully`,
      token: token,
    });
  } catch (error) {
    logger.error("Error occurred:", error);
    res.json({ msg: `Error Occurred: ${error}` });
  }
};

const userSignin = async (req, res) => {  
  try {
    const { success } = signInbody.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: `Incorrect Email/Password format`,
      });
    }

    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      const account = await Account.findOne({ userId: user._id });
      const balance = account.balance;
      user.balance = balance;

      const { _id, __v, ...userWithoutIdAndVersion } = user.toObject();

      return res.status(200).json({
        user: userWithoutIdAndVersion,
        balance: balance,
        message: "Successfully SignedIn",
        token: token,
      });
    }

    return res.status(411).json({
      message: `Error while Logging In`,
    });
  } catch (error) {
    logger.error("Error occurred:", error);
    return res.json({ msg: `Error Occurred: ${error}` });
  }
};

const getUsers = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [{ firstName: filter }, { lastName: filter }],
    });

    return res.status(200).json({
      users: users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      })),
    });
  } catch (error) {
    logger.error(`Error while fetching users`, error);
    return res.status(411).json({
      message: `Error while fetching users`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const success = updateBody.safeParse(req.body);

    if (!success) {
      return res
        .status(411)
        .json({ message: `Error while updating information` });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    return res.status(200).json({ message: `User updated Successfully` });
  } catch (error) {
    logger.error(`Error Occurred while updating information`, error);

    return res.status(411).json({
      message: `Error while updating information`,
    });
  }
};

module.exports = {
  userSignup,
  userSignin,
  updateUser,
  getUsers,
};
