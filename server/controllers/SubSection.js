const SubSection=require("../models/SubSection");
const Section = require("../models/Section");
const { uploadToCloudinary } = require("../utils/dataUploader");


exports.createSubSection = async(req,res)=>{
    try{
        const{sectionId, title, description}=req.body;

        const video=req.files.videoFile;
        
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:'ALL fields are required'
            })
        }
        
        
        const uploadDetails= await uploadToCloudinary(video,process.env.FOLDER_NAME);
        

        
        const subSectionData= await SubSection.create({
            title,
            timeDuration:`${uploadDetails.duration}`,
            description,
            videoUrl:uploadDetails.secure_url
        });
       
        
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: subSectionData._id } },
            { new: true }
          ).populate("subSection").exec();

        // console.log("subSectionID",subSectionData._id)
        // console.log("updated Section",updatedSection)
        // console.log("subsection Data",subSectionData);
       
        res.status(200).json({
            success:true,
            message:'Sub Section created successfully',
            data:updatedSection
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Couldn't create subSection`
        })
    }
}










exports.updateSubSection = async(req,res)=>{
    try{
        const{subSectionId, title, sectionId ,description=""}=req.body;
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:'subSection not found'
            })
        }
        if (title !== undefined) {
            subSection.title = title
          }
      
          if (description !== undefined) {
            subSection.description = description
          }
          if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }
      
          await subSection.save();          
            
            
        const updatedSection = await Section.findById(sectionId).populate("subSection");


        res.status(200).json({
            success:true,
            message:'Sub Section updated successfully',
            data:updatedSection  
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Couldn't update subSection`
        })
    }
}










exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res.status(404).json({ 
            success: false, 
            message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection");
  
      return res.status(200).json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })

    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }