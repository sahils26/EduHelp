const Course=require("../models/Course");
const User=require("../models/User");
const RatingAndReviews=require("../models/RatingAndReviews");


exports.createRating=async(req,res)=>{
    try{
        const{rating,review,courseId}=req.body;
        
        const userId=req.user.id;
        
        const courseData=await Course.findById({courseId}); 
        if(!courseData.studentsEnrolled.includes(userId)){
            res.status(404).json({
                success:false,
                message:'Student not enrolled'
            })
        }

        const alreadyReviewed=await RatingAndReviews.findById({user:userId},
                                                            {course:courseId});

        
        if(alreadyReviewed){
            return res.status(404).json({
                success:false,
                message:'Course is already reviewed by the customer',
            })
        }
        
        const ratingReview=await RatingAndReviews.create({
                                                        rating,
                                                        review,
                                                        course:courseId,
                                                        user:userId
        });

        const updatedCourse=await Course.findById({_id:courseId},
                                                {
                                                    $push:{RatingAndReviews:ratingReview}
                                                },
                                                {new:true});


        res.status(200).json({
            success:true,
            message:'Rating and Review created successfully',
            ratingReview
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















exports.getAverageRating=async(req,res)=>{

    try{
        const {courseId}= req.body;

        const result= await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg: "$rating"},
                }
            }
        ])

        if(rating.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        return res.status(200).json({
            success:true,
            message:'Average Rating is 0,no ratings given till now',
            averageRating:0,
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












exports.getAllRatings=async(req,res)=>{
    try{
        const result = RatingAndReviews.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName"
                                            })
                                            .exec();

        return res.status(200).json({
            success:true,
            message:'All reviews fetched successfully',
            data:result, 
        })
                                
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}















