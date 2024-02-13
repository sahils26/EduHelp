import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { setCourse } from '../../../../slices/courseSlice';

export const Instructor = () => {

    const {token} = useSelector((state)=>state.auth)
    const [loading,setLoading] = useState(false);
    const [InstructorData,setInstructorData] = useState(null);
    const [courses,setCourese] = useState([]);



    useEffect(()=>{
        const getCourseDataWithStats = async() => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            
            console.log(instructorApiData);

            if(instructorApiData.length){
                setInstructorData(instructorApiData);
            }

            if(result){
                setCourse(result);
            }
            setLoading(false);
        }

        getCourseDataWithStats();
    },[])

  return (
    <div>
        Hello
    </div>
  )
}
