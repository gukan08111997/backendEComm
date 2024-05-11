const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret_ecom";

exports.registerUser = async(req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({
            status:"fail",
            message:"already registered user"
        })
    }
   let cart = {};
   for(let i=0;i<300;i++){
    cart[i]=0;
   } 
let hashedPassword = await bcrypt.hash(req.body.password,10);
   const newUser = new User({
    name:req.body.username,
    email:req.body.email,
    password:hashedPassword,
    cartData:cart,
   })

   const user = await newUser.save();

   if(user){
    return res.status(201).json({
        status:"success",
        message:"user registered successfully"
    })
   }
}

exports.loginUser = async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email});

        if(user.email){
            if(await bcrypt.compare(req.body.password,user.password)){
                const token = jwt.sign(user.email,secretKey);
                res.status(200).json({
                    status:"success",
                    message:"user authenticated successfully",
                    data:{
                        accessToken:token,
                        role:user.role
                    }
                })
            }else{
                res.status(400).json({
                    status:"fail",
                    message:"Credentials mismatch"
                })
            }
           
        }else{
            res.status(400).json({
                status:"fail",
                message:"Credentials mismatch"
            })
        }
    }
    catch(err){
        res.status(500).json({
            status:"error",
            message:"internal server error occured"
        })
    }
   
}

//controller for fetching all the user info

exports.getAllUsers = async (req,res) =>{
    try{
const users = await User.find({});
if(!users){
    res.status(404).json({
        status:"fail",
        message:"couldn't find the users"
    })
}else{
    res.status(200).json({
        status:"success",
        data:{
            users
        }
    })
}
    }
    catch (err){
        res.status(500).json({
            status:"error",
            message:"internal server error occured"
        })
    }
}

//controller for getting particular user info in admin panel

exports.getUser = async (req,res) =>{
    try{
const userId = req.params.userId;
const user = await User.findOne({_id:userId});
if(!user){
    res.status(404).json({
        status:"fail",
        message:"Invalid user id"
    })
}else{
    res.status(200).json({
        status:"success",
        data:{
            user
        }
    })
}
    }
    catch{
        res.status(500).json({
            status:"error",
            message:"internal server error occured"
        })
    }
}

//controller for update the user role in admin panel 
exports.updateUserRole = async (req,res) =>{
    try{
const userId = req.params.userId;
const user = await User.updateOne({_id:userId},{$set:{role:req.body.role}});
if(!user.acknowledged){
    res.status(400).json({
        status:"fail",
        message:"couldn't update the user role"
    })
}else{
    res.status(200).json({
        status:"success",
        message:"user role updated successfully"
    })
}
    }catch(err){
res.status(500).json({
    status:"error",
    message:"internal server error occured"
})
    }
}

exports.addToCart = async(req,res)=>{
   let userData = await User.findOne({email:req.email});
   userData.cartData[req.body.itemId] +=1;
   let response = await User.findOneAndUpdate({email:req.email},{cartData:userData.cartData});
   if(!response){
    res.status(401).json({
        status:"fail",
        message:"couldn't update the cart items"
    })
   }else{
    res.status(200).json({
        status:"success",
        message:"successfully updated"
    })
   }
 }

 exports.removeFromCart = async(req,res)=>{
    let userData = await User.findOne({email:req.email});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -=1;
        let response = await User.findOneAndUpdate({email:req.email},{cartData:userData.cartData});
        if(!response){
         res.status(401).json({
             status:"fail",
             message:"couldn't update the cart items"
         })
        }else{
         res.status(200).json({
             status:"success",
             message:"successfully updated"
         })
        }
    }else{
        res.status(400).json({
            status:"error",
            message:"no cart items available"
        })
    }
   
  }

  exports.getCart = async (req,res) =>{
    let userData = await User.findOne({email:req.email});
    if(!userData){
        res.status(400).json({
            status:"fail",
            message:"coludn't fetch cart items"
        })
    }else{
        res.status(200).json({
            status:"success",
            data:{
                cart:userData.cartData
            }
        })
    }
    
  }

  
