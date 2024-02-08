import React from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

 function CourseDetails() {

  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId} = useParams();


  function handleBuyCourse(){
    if(token){
      buyCourse(token,[courseId],user,navigate,dispatch);
      return;
    }
  }

  return (
    <div>
      <button className='bg-yellow-50 text-white  font-bold p-4'
      onClick={handleBuyCourse}>
        Buy Now
      </button>
    </div>
  )
}

export default CourseDetails;