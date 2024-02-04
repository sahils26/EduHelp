import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();

  return (
    <div>MyCourses</div>
  )
}

export default MyCourses;

