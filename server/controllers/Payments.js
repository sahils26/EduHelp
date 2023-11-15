const { default: mongoose } = require("mongoose");
const {instance}=require("../config/razorpay");
const Course = require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");




exports.capturePayment= async(req,res)=>{
    try{
        const{courseId}= req.body;

        const userId=req.user.id;

        if(!courseId){
            res.status(400).json({
                status:false,
                message:"Course Id not found"
            })
        }

        const courseData=await Course.findById({courseId});

        if(!courseData){
            res.statusjson({
                success:false,
                message:'could not find the course'
            })
        }

        const userObjectId= new mongoose.Types.ObjectId(userId);
        if(courseData.studentsEnrolled.includes(userObjectId)){
            return res.status(404).json({
                success:false,
                message:'Student is already enrolled'
            })
        }


        const amount=courseData.price;
        const currency='INR';
        
        const options={
            amount:amount*100,
            currency,
            reciept:Math.random(Date.now()).toString(),
            notes:{
                courseId,
                userId,
            }
        }

        const paymentResponse= await instance.orders.create(options);


        return res.status(200).json({
            success:true,
            courseName:courseData.courseName,
            courseDescription:courseData.description,
            thumbnail:courseData.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
}








exports.verifySignature= async(req,res)=>{
    const webHookSecret="123456"

    const signature=req.headers["x-razorpay-signature"];

    const shasum=crypto.createHmac("sha256",webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(webHookSecret == digest){
        console.log("Course purchased");

        const {userId,courseId}= req.body.payload.payment.entity.notes;

        try{
            const courseData= await Course.findById({_id:courseId},
                                                    {$push:{studentsEnrolled:userId}},
                                                    {new:true}
                                                    );
            if(!courseData){
                return res.status(500).json({
                    success:false,
                    message:'Course not found'
                })
            }
            
            
            const userData= await User.findById({_id:userId},
                                                {
                                                    $push:{couses:courseId},
                                                },
                                                {new:true}
                                            );

            const emailResponse= await mailSender(
                                                userData.email,
                                                "CONGRATULATIONS",
                                                "Congratulaions,you are onboarded into new Codehelp Course"
            )
            

            return res.status(200).json({
                success:true,
                message:'signature verified and course added'
            })

        }
        catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Invalid request'
        })
    }
}