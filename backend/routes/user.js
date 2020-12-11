const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = passport.authenticate("jwt", { session: false });

const {
  user_signup,
  user_login,
  user_current,
  user_get_all,
  user_delete_each,
} = require("../controller/user");

router.post("/signup", user_signup);
router.post("/login", user_login);
router.get("/current", checkAuth, user_current);
router.get("/", user_get_all);
router.delete("/:userId", user_delete_each);

module.exports = router;
