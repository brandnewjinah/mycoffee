const profileModel = require("../models/profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

// creating profile
// @route POST http://localhost:5000/profile
// @desc Register user profile
// @access Private

exports.profile_create = (req, res) => {
  const profileFields = {
    height: {},
    weight: {},
    goal_weight: {},
  };

  profileFields.user = req.user.id;

  if (req.body.height.value) profileFields.height.value = req.body.height.value;
  if (req.body.height.unit) profileFields.height.unit = req.body.height.unit;
  if (req.body.weight.value) profileFields.weight.value = req.body.weight.value;
  if (req.body.weight.unit) profileFields.weight.unit = req.body.weight.unit;
  if (req.body.goal_weight.value)
    profileFields.goal_weight.value = req.body.goal_weight.value;
  if (req.body.goal_weight.unit)
    profileFields.goal_weight.unit = req.body.goal_weight.unit;
  if (req.body.health_goal) profileFields.health_goal = req.body.health_goal;

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
