const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports.user_signup = (req, res) => {
  const { email, password, name } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "Email is already being used",
        });
      } else {
        const token = jwt.sign({ name, email }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        const newUser = new userModel({
          name,
          email,
          password,
        });

        newUser
          .save()
          .then((user) => {
            res.status(200).json({
              message: "user created",
              userInfo: { name, email, password, token },
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          messsage: "Not a registered user",
        });
      } else {
        user.comparePassword(password, (err, isMatch) => {
          console.log(isMatch);
          if (err || !isMatch) {
            return res.status(400).json({
              errors: "Password Incorrect",
            });
          } else {
            const token = jwt.sign(
              { id: user._id, email: user.email, name: user.name },
              process.env.SECRET_KEY,
              { expiresIn: "1d" }
            );
            res.status(200).json({
              message: "user logged in",
              token,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_current = (req, res) => {
  userModel
    .findById(req.user.id)
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        res.status(400).json({
          message: "user not found",
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.user_get_all = (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.json({
        message: "All users",
        users: users.map((user) => {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            request: {
              type: "GET",
              url: "http://localhost:5000/user/" + user._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

exports.user_delete_each = (req, res) => {
  const id = req.params.userId;

  userModel
    .findByIdAndDelete(id)
    .then((user) => {
      res.json({
        message: "Deleted user",
        request: {
          type: "GET",
          url: "http://localhost:5000/user",
        },
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};
