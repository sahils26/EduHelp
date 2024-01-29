import { useForm } from "react-hook-form";
import IconButton from "../../../../common/IconButton";
import { useState } from "react";
import {MdAddCircleOutline} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { setLoading } from "../../../../../slices/profileSlice";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { toast } from "react-hot-toast";
import NestedView from "./NestedView";

function CourseBuilderForm(){

    const dispatch = useDispatch();
    const {register,handleSubmit,setValue, formState:{errors} }=useForm();
    const [editSectionName,setEditSectionName]=useState(null);
    const {course} = useSelector((state)=> state.course); 
    const {token}=useSelector((state)=>state.auth);

    function cancelEdit(){
        setEditSectionName(null);
        setValue("editSection","");
    }

    function goBack(){
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    function goToNext(){
        if(course.courseContent.length===0){
            toast.error("Please add atleast one Section");
            return;
        }
        if(course.  courseContent.some((section)=>section.subSection.length===0)){
            toast.error("please atlest one lecture in each section");
            return;
        }
        dispatch(setStep(3));
    }


    function handleChangeEditSectionName(sectionId,sectionName){
        if(editSectionName === sectionId){
            cancelEdit();
        }

        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }

    async function onSubmit(data){
        setLoading(true);
        let result;

        if(editSectionName){
            result= await updateSection({
                sectionName:data.sectionName,
                sectionId:editSectionName,
                courseId:course._id
            },token)
        }else{
            result=await createSection({
                sectionName:data.sectionName,
                courseId:course._id,
            },token )
        }

        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");
        }

        setLoading(false);

    }

     


    
    return(<div>
        <p>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit) }>
            <div>
                <label>Section Name
                    <input
                    id="sectionName"
                    placeholder="Add Section Name"
                    {...register("sectionName",{required:true})}
                    className="w-full"
                    >
                    </input>
                </label>
                {
                    errors.sectionName && (
                        <span>Section Name is required</span>
                    )
                }
            </div>
            <div className="flex w-10 ml-10">
                <IconButton
                type="submit"
                text={editSectionName ? 'Edit Section Name':'Create Section'}
                outline={true}
                customClasses={"text-white"}
                >
                    <MdAddCircleOutline className="text-yellow-50" size={20}/>
                </IconButton>
                {
                    editSectionName && (
                        <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-sm text-richblack-300 underline">
                            Cancel Edit
                        </button>
                    )
                }
            </div>
        </form>
        {
            course.courseContent.length>0 && <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        }

        <div className="flex justify-end gap-x-3">
        <button onClick={goBack} 
        className="rounded-md cursor-pointer flex items-center">
            Back
        </button>
        <IconButton text="next" onClick={goToNext}>
            <BiRightArrow/>
        </IconButton>

        </div>

    </div>)
}

export default CourseBuilderForm;