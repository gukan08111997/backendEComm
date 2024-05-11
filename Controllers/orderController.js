const Order = require("../Models/orderModel");

//controller for order confirm from cart in user module
exports.createOrders = async (req, res) => {
  
  try {
    if(!req.email){
        res.status(401).json({
            status:"fail",
            message:"unaunthenticated user"
        })
    }else{
        const orderData = req.body.orders;
        const orderArray = orderData.map((order, index) =>
          Object.assign(order, { user: req.email })
        );
        const orders = await Order.insertMany(orderArray);
      
        if(!orders){
            return res.status(500).json({
                status:"fail",
                message:"order insertion failed"
            })
        }else{
            res.status(200).json({
                status:"success",
                message:"orders confirmed",
                data:{
                    orders
                }
            })
        }
    }
   
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

//controller for get all order info to view in the admin panel
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({isVerified:false});
   
    if (orders.length <= 0) {
      res.status(401).json({
        status: "fail",
        message: "orders couldn't be fetched",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          orders,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

//controller for getting info about particular order
exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      res.status(404).json({
        status: "fail",
        message: "requested order couldn't fetched",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          order,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

//controller for getting order info related to particular user
exports.getOrdersByUser = async (req, res) => {
 
  try {
    if (!req.email) {
      res.status(401).json({
        status: "fail",
        message: "unauthenticated user",
      });
    } else {
      const orders = await Order.find({ user: req.email });
      if (orders.length <= 0) {
        res.status(404).json({
          status: "fail",
          message: "requested order couldn't fetched",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            orders,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

//controller for updating the images before delivery for particular order in delivey agent portal

exports.updateOrderImagesBeforeDelivery = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.updateOne(
      { _id: orderId },
      {
        $set: {
          productBeforeDelivery: req.body.productBeforeDelivery,
        },
      }
    );
    if (!order.acknowledged) {
      res.status(500).json({
        status: "fail",
        message: "order Updation failed",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "order updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

//controller for updating the images and completed status after delivery for particular order in delivey agent portal

exports.updateOrderImagesAfterDelivery = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.updateOne(
      { _id: orderId },
      {
        $set: {
          productAfterDelivery: req.body.productAfterDelivery,
          isCompleted: true,
        },
      }
    );
    if (!order.acknowledged) {
      res.status(500).json({
        status: "fail",
        message: "order Updation failed",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "order updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

//controller for updating verified status for particular order in admin panel

exports.updateOrderVerified = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.updateOne(
      { _id: orderId },
      { $set: { isVerified: true } }
    );
    if (!order.acknowledged) {
      res.status(500).json({
        status: "fail",
        message: "order Updation failed",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "order updated successfully",
      });
    }
  } catch {
    res.status(500).json({
      status: "error",
      message: "internal server error occured",
    });
  }
};

//controller for cancel order  for particular user in user module

exports.cancelOrder = async (req, res) => {
  try {
    if(!req.email){
        res.status(401).json({
            status:"fail",
            message:"unauthenticated user"
        })
    }else{
        const orderId = req.params.orderId;
        const order = await Order.deleteOne({ _id: orderId,user:req.email });
        if (!order.acknowledged) {
          res.status(500).json({
            status: "fail",
            message: "order deletion failed",
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "order deleted successfully",
          });
        }
    }
   
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "internal server error occured",
    });
  }
};
