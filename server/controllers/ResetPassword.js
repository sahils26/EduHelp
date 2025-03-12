const User=require("../models/User");
// const bcrypt=require("bcrypt")
const bcrypt = require('bcryptjs');
const mailSender = require("../utils/mailSender")



exports.resetPasswordToken= async(req,res)=> {
    try{
        const email=req.body.email;
        
        const user= await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:'Email not registered '
            })
        }
        
        const token=crypto.randomUUID();
        
        const updatedData= await User.findOneAndUpdate({email:email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 3600000,
            })
            
            
            const url=`http://localhost:3000/update-password/${token}`;
            
            await mailSender(
                email,
                "Password Reset",
                `Your Link for email verification is ${url}. Please click this url to reset your password.`
              )            
        return res.json({
            success:true,
            message:'Email send Successfully, check email to send Password'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'something went wrong while resetting password'
        })
    }
}









exports.resetPassword = async(req,res)=>{
    try {
        const { password, confirmPassword, token } = req.body
        
        console.log("1111111111")
        if (confirmPassword !== password) {
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match",
            })
        }
        const userDetails = await User.findOne({ token: token })
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is Invalid",
            })
        }
        console.log("hehe",Date.now(),"hehhe", userDetails.resetPasswordExpires)
        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            })
        }
        console.log("2222222222222222")

        const encryptedPassword = await bcrypt.hash(password, 10)
        await User.findOneAndUpdate(
          { token: token },
          { password: encryptedPassword },
          { new: true }
        )
        res.json({
          success: true,
          message: `Password Reset Successful`,
        })
      } catch (error) {
        return res.json({
          error: error.message,
          success: false,
          message: `Some Error in Updating the Password`,
        })
      }
}