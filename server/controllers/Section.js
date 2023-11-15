const Course= require("../models/Course");
const Section =require("../models/Section");



exports.createSection= async(req,res)=>{
    try{
        const {sectionName,courseId}=req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Missing properties'
            })
        }

        const sectionData= await Section.create({sectionName});

        await Course.findByIdAndUpdate({courseId},
                                        {$push:{courseContent:sectionData}},
                                        {new:true}
                                    );

        res.status(200).json({
            success:true,
            message:'Section created successfully',
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'could not create section, plz try again',
            error:error.message,
        })

    }
}









exports.updateSection=async(req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing properties'
            })
        }

        const updatedSection= await Section.findByIdAndUpdate({sectionId},
                                                            {sectionName:sectionName},
                                                            {new:true})

        res.status(200).json({
            success:true,
            message:'Section updates successfully',
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'could not update section, plz try again',
            error:error.message,
        })

    }
}











exports.deleteSection= async(req,res)=>{
    try{
        const {sectionId}=req.body;

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing property'
            })
        }

        await Section.findByIdAndDelete({sectionId});
        // do we need to delete sectionId from couseSchema

        res.status(200).json({
            success:true,
            message:'Section deleted successfully',
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'could not delete section, plz try again',
            error:error.message,
        })
    }
}