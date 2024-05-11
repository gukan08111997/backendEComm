const express = require("express");
const userController = require("../Controllers/userController");
const fetchUser = require("../util/fetchUser");
const router = express.Router();

router.route("/").get(userController.getAllUsers);
router
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUserRole);
router.route("/signup").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

router.use(fetchUser);
router.route("/cart/add").post(userController.addToCart);
router.route("/cart/remove").post(userController.removeFromCart);
router.route("/cart").post(userController.getCart);
module.exports = router;
