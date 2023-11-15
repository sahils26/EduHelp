const Category=require("../models/Category");



exports.createCategory=async(req,res)=>{
    try{
        const{name,description}=req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        const categoryData= await Category.create({
            name:name,
            description:description
        });

        return res.status(200).json({
            success:false,
            message:'Category created Successfully'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}









exports.showAllCategory=async(req,res)=>{
    try{
        const allCategory=await Category.find({},{name:true,description:true});

        res.status(200).json({
            success:true,
            message:"All categories are returned successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}








exports.categoryPageDetails=async(req,res)=>{
    try{
        const {categoryId}= req.body;

        const selectedCategory= await Category.findById({categoryId})
                                                .populate("courses")
                                                .exec();


        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:'Data Not Found'
            })
        }

        const otherCategories= await Category.find(
                                                {_id:{ne:categoryId}}
                                            ).populate("courses").
                                            exec();
            
        return res.status(200).json({
            success:true,
            message:'categories data fetched successfully',
            data:{
                selectedCategory,
                otherCategories,
            }
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






