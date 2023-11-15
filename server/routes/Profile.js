const express=require("express");
const router=express.Router();


const {updateProfile,
    deleteUser,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses}=require("../controllers/Profile");

const {auth} =require("../middlewares/auth");


router.put("/updateProfile",auth,updateProfile);

router.delete("/deleteProfile",auth,deleteUser);

router.get("/getAllUserDetails",auth,getAllUserDetails);

router.put("/updateDisplayPicture",auth,updateDisplayPicture);

router.get("/getEnrolledCourses",auth,getEnrolledCourses);


module.exports=router;