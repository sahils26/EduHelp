import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { setCourse } from '../../../../slices/courseSlice';
import { InstructorChart } from './InstructorChart';
import { Link } from 'react-router-dom';

export const Instructor = () => {

    const {token} = useSelector((state)=>state.auth)
    const [loading,setLoading] = useState(false);
    const [instructorData,setInstructorData] = useState(null);
    const [courses,setCourses] = useState([]);
    const {user} = useSelector((state)=>state.profile)



    useEffect(()=>{
        const getCourseDataWithStats = async() => {
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            
            console.log("instructorApiData",instructorApiData);
            console.log("result",result)

            if(instructorApiData.length){
                setInstructorData(instructorApiData);
            }

            if(result){
                setCourses(result);
            }
            setLoading(false);
        }

        getCourseDataWithStats();
    },[])

    const totalAmount = instructorData?.reduce((acc,curr)=>acc+curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc,curr)=> acc + curr.totalStudentsEnrolled,0);






  return (
    <div className='text-white'>
        <div>
            <h1>Hi {user?.firstName}</h1>
            <p>Let's Start something new</p>
        </div>

        {
            loading ? (<div className='spinner'></div>) :
            courses.length > 0 
                ? (<div>
                    <div>
                        <div>
                            <InstructorChart courses={instructorData}/>
                            <div>
                                <p>Statistics</p>
                                <div>
                                    <p>Total Courses</p>
                                    <p>{courses.length}</p>
                                </div>  
                                <div>
                                    <p>Total Students</p>
                                    <p>{totalStudents}</p>
                                </div>      
                                <div>
                                    <p>Total Income</p>
                                    <p>{totalAmount}</p>
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Your Courses</p>
                            <Link to = '/dashboard/my-courses'>
                                <p>View all</p>
                            </Link>
                        </div>
                        <div>
                            {
                                courses.slice(0,3).map((course)=>(
                                    <div>
                                        <img 
                                            src={course.thumbnail}
                                        />
                                        <div>
                                            <p>{course.courseName}</p>
                                            <div>
                                                <p>{course.studentsEnrolled.length}</p>
                                                <p>|</p>
                                                <p>Rs {course.price}</p>
                                            </div>
                                        </div>
                                    </div>    
                                ))
                            }
                        </div>     
                    </div>    


                </div>)
                : (<div>
                    <p>You have not yet created any courses</p>
                    <Link to={'/dashboard/addCourse'}>
                        Create a Course
                    </Link>
                </div>) 
        }

    </div>
  )
}
