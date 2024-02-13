const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async(req,res)=>{
    const {courseId,subSectionId} = req.body;
    const userId = req.user.id;
     
    try{
        
        const subSectionId = await SubSection.findById(subSectionId);
        if(!subSectionId){
            return res.status(404).json({
                success:false,
                message:"Invalid SubSection"
            })
        }

        let CourseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        })
        if(!CourseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist",
            })
        }else{
            if(CourseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"Subsection is already completed"
                })
            }
            CourseProgress.completedVideos.push(subSectionId);
        }

        await CourseProgress.save();

        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully"
        })

    }catch(error){
        console.error(error);
        return res.status(400).json({
            error:"internal server error"
        })
    }
}