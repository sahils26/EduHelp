const express=require("express");
const router=express.Router();


const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    getFullCourseDetails
}=require("../controllers/Course");

const {
    createCategory,
    showAllCategory,
    categoryPageDetails
}=require("../controllers/Category");

const {
    createSection,
    updateSection,
    deleteSection
}=require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
}=require("../controllers/SubSection");


const {
    createRating,
    getAverageRating,
    getAllRatings
}=require("../controllers/RatingAndReview");


const{auth, isStudent,isAdmin,isInstructor}=require("../middlewares/auth");


router.post("/createCourse",auth,isInstructor,createCourse);

router.post("/createSection",auth,isInstructor,createSection);

router.post("/updateSection",auth,isInstructor,updateSection);

router.post("/deleteSection",auth,isInstructor,deleteSection);

router.post("/createSubSection",auth,isInstructor,createSubSection);

router.post("/updateSubSection",auth,isInstructor,updateSubSection);

router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

router.get("/getAllCourses",auth,getAllCourses);

router.get("/getCourseDetails",auth, getCourseDetails);

router.post("/editCourse", auth, isInstructor, editCourse)

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

router.delete("/deleteCourse", deleteCourse)

router.post("/getFullCourseDetails", auth, getFullCourseDetails)








router.post("/createCategory",auth,isAdmin,createCategory);

router.get("/showAllCategory",showAllCategory);

router.post("/getCategoryPageDetails",categoryPageDetails);




router.post("/createRating",auth,isAdmin,createRating);

router.post("/getAveragaRating",getAverageRating);

router.post("/getAllRating",getAllRatings);



module.exports=router;



