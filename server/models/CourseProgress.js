const mongoose=require("mongoose");

const courseProgressSchema=new mongoose.Schema({
    CourseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }]
})


module.exports=mongoose.model("CourseProgress",courseProgressSchema);