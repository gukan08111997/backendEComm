const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productBeforeDelivery: {
    type: String,
    default:""
  },
  productAfterDelivery: {
    type: String,
    default:""
  },
  paymentMethod: {
    type: String,
    default: "cash on delivery",
  },
  orderCount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  isVerified:{
    type:Boolean,
    default:false
  }
});

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;
