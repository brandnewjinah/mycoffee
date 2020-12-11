const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    console.log("entered");

    //password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    console.log("exited");
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("user", userSchema);
