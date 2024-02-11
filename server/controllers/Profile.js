const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadToCloudinary} =require("../utils/dataUploader");


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
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
        
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
};