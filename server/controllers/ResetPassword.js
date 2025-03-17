const User=require("../models/User");
// const bcrypt=require("bcrypt")
const bcrypt=require("bcryptjs")

const mailSender = require("../utils/mailSender")
const crypto = require('crypto');



// exports.resetPasswordToken= async(req,res)=> {
//     try{
//         console.log("Inside resetPasswordToken")
//         const email=req.body.email;
        
//         const user= await User.findOne({email:email});
//         if(!user){
//             return res.json({
//                 success:false,
//                 message:'Email not registered '
//             })
//         }
        
//         const token=crypto.randomUUID();
        
//         const updatedData= await User.findOneAndUpdate({email:email},
//             {
//                 token:token,
//                 resetPasswordExpires: Date.now() + 3600000,
//             })
            
            
//             const url=`http://localhost:3000/update-password/${token}`;
            
//             await mailSender(
//                 email,
//                 "Password Reset",
//                 `Your Link for email verification is ${url}. Please click this url to reset your password.`
//               )            
//         return res.json({
//             success:true,
//             message:'Email send Successfully, check email to send Password'
//         });

//     }catch(error){
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message:'something went wrong while resetting password'
//         })
//     }
// }









//claude's code
exports.resetPasswordToken = async(req, res) => {
    console.log("Inside")
    try {
        console.log("Inside resetPasswordToken")
        const email = req.body.email;
       
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({
                success: false,
                message: 'Email not registered '
            })
        }
       
        const token = crypto.randomUUID();
       
        const updatedData = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            }
        );
           
        // Change this line - Use environment variable or check the request origin
        // Instead of hardcoded localhost URL
        const frontendURL = process.env.FRONTEND_URL || 'https://edu-help-six.vercel.app';
        const url = `${frontendURL}/update-password/${token}`;
           
        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );            
        
        return res.json({
            success: true,
            message: 'Email sent successfully, check email to reset password'
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while resetting password'
        });
    }
}
















//mohan's code
// // resetPasswordToken
// exports.resetPasswordToken = async(req, res) => {
//     console.log("object server")
//     try{
//         const email = req.body.email;

//         const user = User.findOne({email: email});
//         if(!user){ 
//             return res.json({
//                 success:false,
//                 message:'Your Email is not registered with us'
//             });
//         }

//         //generate token 
//         const token = crypto.randomUUID();

//         //update user by adding token and expiration time
//         const updateDetails = await User.findOneAndUpdate({email:email},{token:token, resetPasswordExpires: Date.now() + 5*60*1000,}, {new:true});
        
//         // url to be sent in mail
//         const url = `http://localhost:3000/update-password/${token}`;

//         // send mail 
//         await mailSender(email, "Password reset link: ", `Password Reset Link: ${url}`);

//         return res.json({
//             success:true,
//             message:'Email sent successfully, please check email and change pwd',
//         });
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             message:'Something went wrong while sending reset pwd mail'
//         })
//     }
// }




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