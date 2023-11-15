const SubSection=require("../models/SubSection");
const Section = require("../models/Section");
const { uploadToCloudinary } = require("../utils/dataUploader");


exports.createSubSection = async(req,res)=>{
    try{
        const{sectionId, title, timeDuration, description}=req.body;

        const video=req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:'ALL fields are required'
            })
        }

        const uploadVideo= await uploadToCloudinary(video,process.env.FOLDER_NAME);

        const subSectionData= await SubSection.create({
                                                title,
                                                timeDuration,
                                                description,
                                                videoUrl:uploadVideo.secure_url
                                                });
        
        const updatedSection= await Section.findByIdAndUpdate({sectionId},
                                        {$push:{subSection:subSectionData}},
                                        {new:true}
                                        );

        res.status(200).json({
            success:true,
            message:'Sub Section created successfully',
            updatedSection
        })

    }
    catch(error){
        console.lof(error);
        res.status(500).json({
            success:false,
            message:`Couldn't create subSection`
        })
    }
}










exports.updateSubSection = async(req,res)=>{
    try{
        const{subSectionId, title, timeDuration="", description=""}=req.body;

        const video=req.files.videoFile;

        if(!subSectionId || !title || !video){
            return res.status(400).json({
                success:false,
                message:'ALL fields are required'
            })
        }

        const updatedVideoUpload= await uploadToCloudinary(video,process.env.FOLDER_NAME);

        const updatedSubSection=await SubSection.findByIdAndUpdate({subSectionId},
                                                                    {title:title},
                                                                    {description:description},
                                                                    {timeDuration:timeDuration},
                                                                    {videoUrl:updatedVideoUpload.secure_url}
                                                                    );
                

        res.status(200).json({
            success:true,
            message:'Sub Section updated successfully',
            updatedSubSection
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











exports.deleteSubSection = async(req,res)=>{
    try{
        const{subSectionId}=req.body;

        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:'ALL fields are required'
            })
        }

        

        const deleteSubSection=await SubSection.findByIdAndDelete({subSectionId});
                

        res.status(200).json({
            success:true,
            message:'Sub Section deleted successfully',
            deleteSubSection
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Couldn't delete subSection`
        })
    }
}


