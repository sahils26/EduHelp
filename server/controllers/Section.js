const Course= require("../models/Course");
const Section =require("../models/Section");


exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};










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
            message:updatedSection,
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