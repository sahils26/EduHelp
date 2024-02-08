import React from 'react'
import { apiConnector } from '../services/apiConnector';
import { catalogData, categories } from '../services/apis';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider  from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
import Error from "./Error"
import { useSelector } from 'react-redux';


export const Catalog = () => {
    
    const { loading } = useSelector((state) => state.profile)
    const {catalogName} = useParams();
    const [categoryId,setCategoryId]=useState("");
    const [catalogPageData,setCatalogPageData]=useState(null);


    useEffect(() => {
        const getCategories = async()=>{
            console.log("useEffect getCategories")
            const res = await apiConnector("GET",categories.CATEGORIES_API);

            const category_id = res?.data?.res?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);

        }
        getCategories();

    },[catalogName]);

    useEffect(()=>{
        const getCategoryDetails =async()=>{
            console.log("useEffect categoryDetails")
            try{
                const res = await getCatalogPageData(categoryId); 
                console.log("printing",res); 
                setCatalogPageData(res);
            }
            catch(error){
                console.log(error);
            }
        }
    
        if(categoryId){
            getCategoryDetails();
        }
        
    },[categoryId])

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }

  return (
    <div className='text-white'>
        <div>
            <p>{`Home/Catalog`} <span>{catalogPageData?.data?.selectedCategory?.name}</span> </p>
            <p>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        {/* section 1 */}
        <div>
            <div>Courses to get you started</div>
            <div className='flex gap-x-3'>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
        </div>

        {/* section 2  */}
        <div>
            <div>Top Courses in <span>{catalogPageData?.data?.selectedCategory?.name}</span></div>
            <div>
                <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
            </div>
        </div> 

        {/* section 3 */}
        <div>
            <div>Frequently Bought </div>
            <div className='py-8'>
                <div className='grid grid-col-1 lg:grid-col-2'>
                    {
                        catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                        .map((course,index)=>{
                            return <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                        })
                    }
                </div>
            </div>    
        </div>


    </div>
  )
};
