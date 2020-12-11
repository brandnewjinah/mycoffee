const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = passport.authenticate("jwt", { session: false });

const {
  product_post_product,
  product_get_all,
  product_get_product,
  product_update_product,
  product_delete_all,
  product_delete_product,
  product_post_comment,
} = require("../controller/product");

//create
router.post("/", checkAuth, product_post_product);

//get
router.get("/", product_get_all);
router.get("/:productId", product_get_product);

// //update
// router.put("/:productId", checkAuth, product_update_product);

// //delete
// router.delete("/", checkAuth, product_delete_all);
// router.delete("/:productId", checkAuth, product_delete_product);

//add comment
router.post("/comment/:product_id", checkAuth, product_post_comment);

module.exports = router;
