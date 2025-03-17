import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from '../components/common/RatingStars';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';

 function CourseDetails() {

  const {user} = useSelector((state)=>state.profile);
  const {loading} = useSelector((state)=>state.profile);
  const {paymentLoading} = useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId} = useParams();

  const [confirmationModal,setConfirmationModal] = useState(null);

  const [courseData,setCourseData] = useState();
  
  useEffect(()=>{
    const getCourseFullDetails = async()=>{
      try{
        console.log("courseId",courseId);
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);                 
      }catch(error){
        console.log("could not fetch course details")
      }
    }
    getCourseFullDetails();
  },[courseId])


  const [averageReviewCount,setAverageReviewCount] = useState(0);
  useEffect(()=>{                  
    const count = GetAvgRating(courseData?.data?.courseData?.ratingAndReviews);
    setAverageReviewCount(count);
  },[courseData])


  const[totalNoOfLectures,setTotalNoOfLectures] = useState(0);
  useEffect(()=>{                 
    let lectures=0;
    courseData?.data?.courseData?.courseContent?.forEach((sec)=>{
      lectures+=sec.subSection.length || 0;
    })
    setTotalNoOfLectures(lectures);
  },[courseData])



  function handleBuyCourse(){
    if(token){
      buyCourse(token,[courseId],user,navigate,dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }


  if(loading || !courseData){
    return(
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="spinner"></div>
    </div>
    )
  }

  if(!courseData.success){
    return(
      <div>
        <Error/>
      </div>
    )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData.data?.courseData[0]






  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{averageReviewCount}</span>
                <RatingStars Review_Count={averageReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
            </div>

            <CourseDetailsCard
              course={courseData?.data?.courseData[0]}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />  
          </div>
        </div>
      </div> 
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default CourseDetails;