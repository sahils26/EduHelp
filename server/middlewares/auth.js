const jwt = require("jsonwebtoken");


exports.auth = async(req,res,next) => {
    try{
        const token=req.body.token||
                    req.cookies.token||
                    req.header("Authorisation").replace("Bearer ","");
        
        if(!token){
            res.status(401).json({
                success:false,
                message:'Token missing'
            })
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }catch(error){
            res.status(401).json({
                success:false,
                message:'invalid token'
            })
        }

        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'something went wrong  while validating the token'
        });
    }
}












exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType !=="Student"){
            return res.status(401).json({
                success:false,
                message:'this is  a protected route for students only'
            })
        }

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'User role cannot be  verfied, try again'
        })
    }
}













exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType !=="Instructor"){
            return res.status(401).json({
                success:false,
                message:'this is  a protected route for Instructor only'
            })
        }

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'User role cannot be  verfied, try again'
        })
    }
}















exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType !=="Admin"){
            return res.status(401).json({
                success:false,
                message:'this is  a protected route for admins only'
            })
        }

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'User role cannot be  verfied, try again'
        })
    }
}



