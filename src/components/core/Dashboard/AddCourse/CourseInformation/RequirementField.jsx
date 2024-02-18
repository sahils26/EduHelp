import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function RequirementField({name,label,register,errors,setValue,getValues}){

    const { editCourse, course } = useSelector((state) => state.course)

    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]=useState([]);
    
    useEffect(()=>{
        console.log("requirementField",course?.instructions);
        if(editCourse){
            setRequirementList(course?.instructions);
        }
        register(name,{
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name,requirementList);
    },[requirementList])


    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList,requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index)=>{
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }

    return(
        <div>
            <label
                className="text-sm text-richblack-5">{label}<sup className="text-pink-200">*</sup>
                <input
                type="text"
                id="name"
                placeholder="Enter Course Requirements/Instructions"
                value={requirement}
                onChange={(e)=>setRequirement(e.target.value)}
                className="form-style w-full ">
                </input>

                <button type="button"
                onClick={handleAddRequirement}
                className="font-semibold text-richblack-550">
                    Add
                </button>
            </label>

            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement,index)=>(
                                <li key={index} className="flex  items-center text-richblack-5">
                                    <span>{requirement}</span>
                                    <button 
                                    type="button"
                                    onClick={()=>handleRemoveRequirement(index)}
                                    className="text-xs text-pure-greys-300">
                                        clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                ) 
            }
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )
            }

        </div>
    )
}

export default RequirementField;