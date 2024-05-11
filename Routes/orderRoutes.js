const express = require("express");
const orderController = require("../Controllers/orderController");
const fetchUser = require("../util/fetchUser");

const router = express.Router();

router.use(fetchUser);

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrders);
router.route("/user").get(orderController.getOrdersByUser);
router
  .route("/:orderId")
  .get(orderController.getOrder)
  .delete(orderController.cancelOrder)
  .patch(orderController.updateOrderVerified);
router
  .route("/:orderId/image")
  .patch(orderController.updateOrderImagesBeforeDelivery)
  .put(orderController.updateOrderImagesAfterDelivery);
module.exports = router;
