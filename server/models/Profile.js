const mongoose=require("mongoose");

const profileSchema=new mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:Date,
    },
    about:{
        type:String,
    },
    contactNumbers:{
        type:Number,
        trim:true
    }
});

module.exports=mongoose.model("Profile",profileSchema);