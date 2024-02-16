const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadToCloudinary} =require("../utils/dataUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");


exports.updateProfile= async(req,res)=>{
    try{
        const{dateOfBirth="", about="" , contactNumber}=req.body;

        console.log("profile11111111111")
        const userId=req.user.id;
        
        if( !contactNumber){
            res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        
        const userDetails = await User.findById(userId);
		const profile = await Profile.findById(userDetails.additionalDetails);
        
		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
        
		// Save the updated profile
		await profile.save();
        
        console.log("profile2222222222")
        
        res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            profile
        })                                    
    }catch(error){
        res.status(500).json({
            success:false,
            message:'error while updating profile',
            error:error.message
        })
    }
}












exports.deleteUser=async(req,res)=>{
    
    try{
        const userId = req.user.id;
        
        const userData=await User.findById({userId});
        if(!userData){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }

        await Profile.findByIdAndDelete({_id:userData.additionalDetails});

        await User.findByIdAndDelete({userData});

        res.status(200).json({
            success:true,
            message:'User deleted successfully',
        })   
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'could not delete User '
        })
    }
}











exports.getAllUserDetails=async(req,res)=>{
    try{
        const userId=req.user.id;

        const userData=await User.findById({userId}).populate("additionalDetails").exec();

        res.status(200).json({
            success:true,
            message:'User data fetched successfully'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'could not fetch all user data'
        })
    }
}










exports.updateDisplayPicture= async(req,res)=>{
    try{
        const image=req.files.displayPicture;
        const userId=req.user.id;

        
        const uploadImage= await uploadToCloudinary(image,process.env.FOLDER_NAME,1000,1000);
    

        const updatedUser= await User.findByIdAndUpdate({_id:userId},     
            {image:uploadImage.secure_url},
            {new:true}
            );
        
        console.log("dp3333333333",updatedUser);
            
        res.status(200).json({
            success:true,
            message:'Image upload successfully',
            data:updatedUser,
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










exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id
	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }







exports.instructorDashboard = async (req,res) => {
    try{
        const courseDetails = await  Course.find({instructor:req.user.id});
        
        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;
            
            const courseDataWithStats = {
                _id : course._id,
                courseName : course.courseName,
                courseDescription : course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats
        })

        return res.status(200).json({
            courses:courseData,
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
