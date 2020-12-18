const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = passport.authenticate("jwt", { session: false });
const { validSignup, validLogin, validForgot } = require("../helpers/validate");
const { OAuth2Client } = require("google-auth-library");
const userModel = require("../models/user");

const {
  user_signup,
  user_login,
  user_current,
  user_get_all,
  user_delete_each,
} = require("../controller/user");

router.post("/signup", validSignup, user_signup);
router.post("/login", validLogin, user_login);
router.get("/current", checkAuth, user_current);
router.get("/", user_get_all);
router.delete("/:userId", user_delete_each);

// @route POST /api/googlelogin
// @desc Google Login
// $access Public

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

router.post("/googlelogin", (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then((res) => {
      console.log("GOOGLE LOGIN RESPONSE", res);

      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        userModel.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
              expiresIn: "7d",
            });

            return res.json({
              token,
              user,
            });
          } else {
            let password = email + process.env.SECRET_KEY;
            user = new userModel({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("Error Google Login on User Save", err);
                return res.status(400).json({
                  error: "User signup failed with google",
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.SECRET_KEY,
                { expiresIn: "7d" }
              );

              return res.status(200).json({
                token,
                user: data,
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again",
        });
      }
    });
});

module.exports = router;
