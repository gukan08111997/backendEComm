const Product = require("../Models/productModel");

exports.createProduct = async (req,res)=>{
    const products = await Product.find({});
    let id;
    if(products.length>0){
const last_product_array = products.slice(-1);
const last_product = last_product_array[0];
id = last_product.id+1;
    }else{
        id=1;
    }
    const newProduct = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        old_price:req.body.old_price,
        new_price:req.body.new_price
    });

    const product = await newProduct.save();
    if(!product){
      return res.status(500).json({
            status:"fail",
            message:"product insertion failed"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
            product:product
        }
    });
}

exports.getAllProducts = async (req,res) =>{
    try{
        const products = await Product.find({});
        if(products.length===0){
            res.status(404).json({
                status:"fail",
                message:"No products found"
            })
        }else{
            res.status(200).json({
                status:"Success",
                data:{
                    products:products
                }
            })
        }
        
    }catch (err){
         res.status(500).json({
            status:"error",
            message:"couldn't fetch the products"
        })
    }
    
}

exports.removeProduct = async (req,res) =>{
    const response = await Product.deleteOne({id:req.params.productId});
if(!response.acknowledged){
    res.status(500).json({
        status:"fail",
        message:"product couldn't deleted"
    })
}
res.status(200).json({
    status:"success",
    message:"product successfully deleted"
})
}

exports.getNewProducts = async (req,res) =>{
    try{
let products = await Product.find({});
if(products.length>0){
    let newCollections = products.slice(1).slice(-8);
    res.status(200).json({
        status:"success",
        data:{
            products:newCollections
        }
    })
}else{
    res.status(404).json({
        status:"fail",
        message:"couldn't fetch products"
    })
}
    }catch(err){
res.status(500).json({
    status:"error",
    message:"internal server error occured"
})
    }
}

exports.getElectronicsProducts = async (req,res)=>{
    try{
let products = await Product.find({category:"electronics"});
if(products.length>0){
    let popularElectronicsProducts = products.slice(0,4);
    res.status(200).json({
        status:"success",
        data:{
            products:popularElectronicsProducts
        }
    })
}else{
    res.status(400).json({
        status:"fail",
        message:"couldn't fetch the products"
    })
}
    }catch(err){
        res.status(500).json({
            status:"error",
            message:"internal server error occured"
        })
    }
}

exports.getFurnitureProducts = async (req,res)=>{
    try{
let products = await Product.find({category:"furniture"});
if(products.length>0){
    let popularFurnitureProducts = products.slice(0,4);
    res.status(200).json({
        status:"success",
        data:{
            products:popularFurnitureProducts
        }
    })
}else{
    res.status(400).json({
        status:"fail",
        message:"couldn't fetch the products"
    })
}
    }catch(err){
        res.status(500).json({
            status:"error",
            message:"internal server error occured"
        })
    }
}

exports.getKitchenProducts = async (req,res)=>{
    try{
let products = await Product.find({category:"kitchen"});
if(products.length>0){
    let popularKitchenProducts = products.slice(0,4);
    res.status(200).json({
        status:"success",
        data:{
            products:popularKitchenProducts
        }
    })
}else{
    res.status(400).json({
        status:"fail",
        message:"couldn't fetch the products"
    })
}
    }catch(err){
        res.status(500).json({
            status:"error",
            message:"internal server error occured"
        })
    }
}


