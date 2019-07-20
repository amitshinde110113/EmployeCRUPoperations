const jwt= require('jsonwebtoken');


module.exports =(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
    const decodes = jwt.verify(token,process.env.jwt_key);
    req.userData=decodes;
    next();
    }catch(error){
        res.status(498).json({Message:"Token verification failed",  req:req.headers,
        res:res.headers,});
    }
};