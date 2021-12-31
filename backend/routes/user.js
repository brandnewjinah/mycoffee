const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = passport.authenticate("jwt", { session: false });
const { validSignup, validLogin, validForgot } = require("../helpers/validate");
const { OAuth2Client } = require("google-auth-library");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");

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
    .then((response) => {
      console.log("GOOGLE LOGIN RESPONSE", response);

      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        userModel.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign(
              { _id: user._id },
              process.env.SECRET_KEY || config.SECRET_KEY,
              { expiresIn: "7d" }
            );

            return res.json({
              token,
              user,
            });
          } else {
            let password = email + process.env.SECRET_KEY || config.SECRET_KEY;

            user = new userModel({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                return res.status(400).json({
                  error: "User signup failed with google",
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.SECRET_KEY || config.SECRET_KEY,
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

  // const { idToken } = req.body;

  // client
  //   .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
  //   .then((response) => {
  //     console.log("GOOGLE LOGIN RESPONSE", response);

  //     const { email_verified, name, email } = response.payload;

  //     if (email_verified) {
  //       userModel.findOne({ email }).exec((err, user) => {
  //         if (user) {
  //           const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
  //             expiresIn: "7d",
  //           });

  //           return res.json({
  //             token,
  //             user,
  //           });
  //         } else {
  //           let password = email + process.env.SECRET_KEY,
  //             user = new userModel({ name, email, password });
  //           user.save((err, data) => {
  //             if (err) {
  //               console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
  //               return res.status(400).json({
  //                 error: "User signup failed with google",
  //               });
  //             }
  //             const token = jwt.sign(
  //               { _id: data._id },
  //               process.env.SECRET_KEY,
  //               { expiresIn: "7d" }
  //             );

  //             return res.status(200).json({
  //               token,
  //               user: data,
  //             });
  //           });
  //         }
  //       });
  //     } else {
  //       return res.status(400).json({
  //         error: "Google login failed. Try again",
  //       });
  //     }
  //   });
});

// @route POST /api/facebooklogin
// @desc Facebook Login
// @access Public

router.post("/facebooklogin", (req, res) => {
  const { userID, accessToken } = req.body;
  console.log(req.body);
  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return axios.get(url).then((res) => {
    const { name, email } = res;

    userModel.findOne({ email }).then((err, user) => {
      console.log(user);
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          process.env.SECRET_KEY || config.SECRET_KEY,
          { expiresIn: "7d" }
        );

        const { _id, email, name, role } = user;
        return res.json({
          token,
          user: { _id, email, name, role },
        });
      } else {
        let password = email + process.env.SECRET_KEY || config.SECRET_KEY;
        user = new userModel({
          name,
          email,
          password,
        });
        user
          .save()
          .then((data) => {
            const token = jwt.sign(
              { _id: data._id },
              process.env.SECRET_KEY || config.SECRET_KEY,
              { expiresIn: "7d" }
            );

            const { _id, email, name, role } = data;
            return res.json({
              token,
              user: {
                _id,
                email,
                name,
                role,
              },
            });
          })
          .catch((err) => {
            console.log("ERROR FACEBOOL LOGIN ON USER SAVE", err);
            return res.status(400).json({
              error: "User signup failed with facebook",
            });
          });
      }
    });
  });
});

module.exports = router;
