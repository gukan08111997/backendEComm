const productController = require("../Controllers/productController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router.route("/:productId").delete(productController.removeProduct);
router.route("/new").get(productController.getNewProducts);
router.route("/electronics").get(productController.getElectronicsProducts);
router.route("/furniture").get(productController.getFurnitureProducts);
router.route("/kitchen").get(productController.getKitchenProducts);

module.exports = router;
