const profileModel = require("../models/profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// creating profile
// @route POST http://localhost:5000/profile
// @desc Register user profile
// @access Private

exports.profile_create = (req, res) => {
  const profileFields = {};

  profileFields.user = req.user.id;

  if (req.body.method) profileFields.method = req.body.method;
  if (req.body.roast) profileFields.roast = req.body.roast;
  if (req.body.beans) profileFields.beans = req.body.beans;
  if (req.body.taste) profileFields.taste = req.body.taste;

  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        return res.json({
          message: "Profile already exists.",
        });
      } else {
        new profileModel(profileFields)
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.status(408).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

exports.profile_get = (req, res) => {
  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        return res.json({
          message: "Profile doesn't exist",
        });
      } else {
        res.json(profile);
        // console.log(profile);
      }
    })
    .catch((err) => res.status(500).json(err));
};

exports.profile_get_each = (req, res) => {
  const id = req.params.profileId;
  profileModel
    .findById(id)
    .then((profile) => {
      if (!profile) {
        return res.json({
          message: "Profile doesn't exist",
        });
      } else {
        res.json(profile);
      }
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

exports.profile_delete_each = (req, res) => {
  const id = req.params.profileId;

  profileModel
    .findByIdAndDelete(id)
    .then((profile) => {
      res.json({
        message: "Deleted profile",
        request: {
          type: "GET",
          url: "http://localhost:5000/profile",
        },
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};
