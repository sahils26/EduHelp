const User= require("../models/User");
const OTP=require("../models/OTP");
const Profile=require("../models/Profile");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const otpGenerator=require("otp-generator");
require("dotenv").config();


exports.sendOTP=async(req,res)=>{
    
    try{
        const{email}=req.body;

        const userPresent= await User.findOne({email});
        
        if(userPresent){
            return res.status(401).json({
                success:false,
                message:'User already exist'
            })
        }


        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabeta:false,
            specialChars:false,
        });
        console.log(otp);


        const checkOTP= await OTP.findOne({otp: otp});

        while(checkOTP){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabeta:false,
                specialChars:false,
            });

            checkOTP= await OTP.findOne({otp:otp});
        }

        const otpBody=await OTP.create({email,otp});
        console.log(otp.body);


        res.status(200).json({
            success:true,
            message:'message sent Successfully',
            otp
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
};









exports.signup= async(req,res)=>{

    try{
        const{email,
            firstName,
            lastName,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp}=
            req.body;


            if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
                return res.status(403).json({
                    success:false,
                    message:"All fields are  required",
                })
            }


            if(password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:'password and confirmPassword does not match, try again'
                })
            }


            const userExist= await User.findOne({email});
            if(userExist){
                return res.status(400).json({
                    success:false,
                    message:'user already exist'
                })
            }


            const recentOtp= await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
            console.log(recentOtp);

            if(recentOtp.length==0){
                return res.status(400).json({
                    success:false,
                    message:'OTP not found'
                })
            }else if(otp !== recentOtp){
                return res.status(400).json({
                    success:false,
                    message:'Invalid OTP'
                })
            }


            const hashedPass= await bcrypt.hash(password,10);


            const profileData= await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:null
            })

            const userData= await User.create({
                firstName,
                lastName,
                email,
                password:hashedPass,
                accountType,
                additionalDetails:profileData._id,
                image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
            });


            res.status(200).json({
                success:true,
                message:'User registered Successfully'
            })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'User cannot be registered, try again'
        })
    }
}











exports.login=async(req,res)=>{

    try{
        const {email,password}=req.body;

        if( !email || !password){
            return res.status(403).json({
                success:false,
                message:'All fields are  required, please try again',
            });
        }


        const userExist = await User.findOne({email});
        if(!email){
            return res.status(401).json({
                success:false,
                message:'User not registered,please signUp first'
            })
        }
        

        if(await bcrypt.compare(password,userExist.password)){
            const payload={
                email:userExist.email,
                id:userExist._id,
                accountType:userExist.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })  
            userExist.token=token,
            userExist.password=undefined;

            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                userExist,
                message:'user loggedIn Successfully'
            })
        }

        res.status(401).json({
            success:false,
            message:'password is incorrect'
        });


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login failure,please try again"
        })
    }

    


}












exports.changePassword=async(req,res)=>{
    
    try{
        const{email,oldPassword,newPassword,confirmNewPassword}=req.body;

        if(!email || !oldPassword || !newPassword || !confirmNewPassword){
            return res.status(403).json({
                success:false,
                message:'All fields required'
            })
        }else if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:'newPassword & confirmNewPassword do not match'
            })
        }

        

        const userExist=await User.findOne({email});
        if(await bcrypt.compare(oldPassword,userExist.password)){
            const hashedPass=bcrypt.hash(newPassword,10);


            //smaybe something's wrong here below
            const userData=await User.findOneAndUpdate({email:email},
                                                    {password:hashedPass},
                                                    {new:true}
            )

            return res.status(200).json({
                success:true,
                message:'password changes Successfully',
            })
        }else{
            return res.status(401).json({
                success:false,
                message:'Incorrect oldPassword'
            })
        }


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"cannot change password, try again"
        })
    }
}

