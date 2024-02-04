import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../../common/IconButton";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";


function PublishCourse(){

    const[loading,setLoading]=useState(false);
    const {register,handleSubmit,setValue,getValues}=useForm();
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
    },[])
    
    const goToCourses=() =>{
        dispatch(resetCourseState());
        //navigate("/dashboard/my-courses");
    }

    const handleCoursePublish= async() => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
        course?.status === COURSE_STATUS.DRAFT && getValues("public")=== false){
            goToCourses();
            return; 
        }
        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData,token);

        if(result){
            goToCourses();
        }

        setLoading(false);

    }

    const onSubmit=()=>{
        handleCoursePublish();
    }
    const goBack=()=>{
        dispatch(setStep(2));
    }

    return(
    <div className="rounded-md border -[1px] bg-richblack-800 p-6 border-richblack-700 text-white">
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>
                    <input 
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="rounded h-4 w-4"
                        />
                    <span className="ml-3">Make this Course as Public </span>    
                </label>
            </div>

            <div className="flex justify-end gap-x-3">
                <button
                    disabled={loading}
                    type="button"
                    onClick={goBack}
                    className="flex items-center rounded-md bg-richblack-300 p-4">
                        Back
                </button>
                <IconButton disabled={loading} text="Save Changes"/>
            </div>

        </form>
    </div>)
}

export default PublishCourse;