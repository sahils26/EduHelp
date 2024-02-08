const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");



exports.capturePayment = async(req,res) =>{
    
    const {courses} = req.body;
    const userId = req.user.id;

    
    if(!courses.length===0){
        return res.json({
            success:false,
            message:"Please provide Course ID"
        })
    }
    
    let totalAmount=0;
    
    for(const course_id of courses){
        let course;
        try{
            course=await Course.findById(course_id);
            
            if(!course){
                return res.status(410).json({
                    success:false,
                    message:"could not get the course"
                }) 
            }
            
            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(401).json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }
            
            totalAmount += course.price;
            
            
        }catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                message:"error.message"
            })
        }
    }
    
    const options= {
        amount : totalAmount *100,
        currency : "INR",
        receipt: Math.random(Date.now()).toString(),
    }
    
    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"could not initiate order"
        })
    }

} 

















exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(400).json({success:"false", message:"Payment Failed"});


}


const enrollStudents = async(courses,userId,res)=>{
    
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide data for Courses and UserId"
        })
    }

    for(const courseId of courses){
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {
                    $push:{studentsEnrolled:userId}
                },
                {new:true}
            )
    
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }
            const enrolledStudents = await User.findByIdAndUpdate(userId,
                {$push:{
                    courses:courseId
                }},{new:true})
    
            const emailResponse = await mailSender(
                enrolledStudents.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledCourse.firstName}`)
            )
    
            // console.log("Email Sent Successfully" ,emailResponse.response)

        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Payment Failed"
            })
        }
    }

}























exports.sendPaymentSuccessEmail = async(req,res) =>{
    const {orderId,paymentId,amount} = req.body;

    const userId=req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
        })
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }

}





// exports.capturePayment= async(req,res)=>{
//     try{
//         const{courseId}= req.body;

//         const userId=req.user.id;

//         if(!courseId){
//             res.status(400).json({
//                 status:false,
//                 message:"Course Id not found"
//             })
//         }

//         const courseData=await Course.findById({courseId});

//         if(!courseData){
//             res.statusjson({
//                 success:false,
//                 message:'could not find the course'
//             })
//         }

//         const userObjectId= new mongoose.Types.ObjectId(userId);
//         if(courseData.studentsEnrolled.includes(userObjectId)){
//             return res.status(404).json({
//                 success:false,
//                 message:'Student is already enrolled'
//             })
//         }


//         const amount=courseData.price;
//         const currency='INR';
        
//         const options={
//             amount:amount*100,
//             currency,
//             reciept:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId,
//                 userId,
//             }
//         }

//         const paymentResponse= await instance.orders.create(options);


//         return res.status(200).json({
//             success:true,
//             courseName:courseData.courseName,
//             courseDescription:courseData.description,
//             thumbnail:courseData.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })

//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
    
// }








// exports.verifySignature= async(req,res)=>{
//     const webHookSecret="123456"

//     const signature=req.headers["x-razorpay-signature"];

//     const shasum=crypto.createHmac("sha256",webHookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(webHookSecret == digest){
//         console.log("Course purchased");

//         const {userId,courseId}= req.body.payload.payment.entity.notes;

//         try{
//             const courseData= await Course.findById({_id:courseId},
//                                                     {$push:{studentsEnrolled:userId}},
//                                                     {new:true}
//                                                     );
//             if(!courseData){
//                 return res.status(500).json({
//                     success:false,
//                     message:'Course not found'
//                 })
//             }
            
            
//             const userData= await User.findById({_id:userId},
//                                                 {
//                                                     $push:{couses:courseId},
//                                                 },
//                                                 {new:true}
//                                             );

//             const emailResponse= await mailSender(
//                                                 userData.email,
//                                                 "CONGRATULATIONS",
//                                                 "Congratulaions,you are onboarded into new Codehelp Course"
//             )
            

//             return res.status(200).json({
//                 success:true,
//                 message:'signature verified and course added'
//             })

//         }
//         catch(error){
//             console.log(error);
//             res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request'
//         })
//     }
// }