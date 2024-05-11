const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT;
const userRouter = require("./Routes/userRoutes");
const productRouter = require("./Routes/productRoutes");
const orderRouter = require("./Routes/orderRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// connection to mongodb Database
mongoose.connect(process.env.MONGO_URL).then(con=>{
    console.log("successfully connected to Database")
}).catch(err=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("hello");
})

//API Creation
app.use("/products",productRouter);
app.use("/users",userRouter);
app.use("/orders",orderRouter);
//Image storage Engine

const storage = multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

//Creating Upload Endpoint for images
app.use("/images",express.static("upload/images"));

app.post("/upload",upload.single("product"),(req,res)=>{
    res.json({
        status:"success",
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
app.listen(port,(err)=>{
    if(!err){
        console.log("server listening on PORT "+port);
    }else{
        console.log("Error: "+err);
    }
});

