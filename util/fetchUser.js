const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchUser = async (req,res,next) =>{
    const token = req.header("Auth-token");
    if(!token){
        res.status(401).json({
            status:"fail",
            message:"please authenticate using valid token"
        })
    }else{
try {
    const data = jwt.verify(token,process.env.SECRET_KEY);
    req.email = data;
    next();
} catch (error) {
    res.status(500).json({
        status:"error",
        message:"please authenticate using valid token"
    })
}
    }
}

module.exports = fetchUser;