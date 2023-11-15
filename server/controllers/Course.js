const Category = require("../models/Category");
const User= require("../models/User");
const Course=require("../models/Course");
const { uploadToCloudinary } = require("../utils/dataUploader");


exports.createCourse=async(req,res)=>{

    try{    
        const{courseName,courseDescriptions,whatYouWillLearn,price,category}=req.body;

        const thumbnail=req.files.thumbnail;

        if(!courseName || !courseDescriptions || !whatYouWillLearn || !price || !category){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userId=req.user.id;
        const instructorData= await User.findById({userId});

        if(!instructorData){
            res.status(404).json({
                success:false,
                message:"instructor data not found"
            })
        }


        const categoryData= await Category.findById(category);
        if(!categoryData){
            res.status(404).json({
                success:false,
                message:'category data not found'
            })
        }

        const thumbnailImage=await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME)

        const courseData= Course.create({
                            courseName,
                            courseDescription,
                            instructor:instructorData._id,
                            whatYouWillLearn,
                            price,
                            category:categoryData._id,
                            thumbnail:thumbnailImage.secure_url,
        })  


        //chances of an error in the below statements 
        await User.findByIdAndUpdate({userId},
                                    {$push:{courses:courseData._id}},
                                    {new:true}
                                    );


        await Category.findByIdAndUpdate({category},
                                        {$push:{courses:courseData._id}},
                                        {new:true}
                                    );

        return res.status(200).json({
            success:true,
            message:'course created successfully',
            data:courseData,
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Failed to create course',
            error:error.message
        })

    }                    
    
}











exports.getAllCourses=async(req,res)=>{
    try{
        const cousesData= await Course.find({});
        
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:cousesData
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'cannot fetch all courses',

        })
    }
}













exports.getCourseDetails=async(req,res)=>{
    try{
        const {courseId}= req.body;

        const courseData=await Course.find({_id:courseId})
                                                .populate(
                                                    {
                                                        path:"instructor",
                                                        populate:{
                                                            path:'additionalDetails'
                                                        }
                                                    }
                                                )
                                                .populate('category')
                                                .populate('ratingAndReviews')
                                                .populate({
                                                    path:'courseContent',
                                                    populate:{
                                                        path:'subSection',
                                                    }
                                                })
                                                .exec();

        if(!courseData){
            return res.status(400).json({
                success:false,
                message:`could not find the course with ${courseId}`
            })
        }

        res.status(200).json({
            success:true,
            message:'Courses detail fetched successfully'
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.false
        })

    }
}