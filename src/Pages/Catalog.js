import React from 'react'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const Catalog = () => {
    
    const {catalogName} = useParams();
    const[categoryId,setCategoryId]=useState("");


    useEffect(() => {
        const getCategories = async()=>{
            const res = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("catalogName",catalogName)
            console.log("resFromCatalog1",res);
            console.log("resFromCatalog2",res?.data);
            console.log("resFromCatalog3",res?.data?.res);
            console.log("formattedCategory",res?.data?.res[0].name.split(" ").join("-").toLowerCase())

            // let category_id = res.data?.res?.filter((ct)=>{ct.name.split(" ").join("-").toLowerCase() === catalogName});
            // setCategoryId(category_id);
        }
        getCategories();

    },[catalogName]);



  return (
    <div className='text-white'>
        <div>
            <p>   </p>
            <p>   </p>
            <p>   </p>
        </div>

        {/* section 1 */}
        <div>
            <div className='flex gap-x-3'>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            {/* <CourseSlider/> */}
        </div>

        {/* section 2  */}
        <div>
            <p>Top Courses</p>
            <div>
                {/* <CourseSlider/> */}
            </div>
        </div>

        {/* section 3 */}
        <div>
            <p>Frequently Bought Together</p>
        </div>


    </div>
  )
};
