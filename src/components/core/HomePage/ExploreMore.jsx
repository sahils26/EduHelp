import { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

function ExploreMore(){

    const tabName=[
        "Free",
        "New to coding",
        "Most popular",
        "Skill  paths",
        "Career paths"
    ]
    const[currentTab,setCurrentTab]=useState(tabName[0]);
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);
 
    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }




    return(
        <div className="mt-20">
            <div className="text-4xl font-semibold text-center">
                Unlock the 
                <HighlightText>Power of Code</HighlightText>
            </div>

            <div className="text-center text-richblack-300 text-sm text-[16px] mt-3">Learn to build you can imagine</div>

            <div className="flex flex-row rounded-full bg-richblack-800 m-5 p-1">
                {
                    tabName.map((element,index)=>{
                        return(
                            <div className={`flex flex-row items-center text-[16px] gap-2 
                                            ${currentTab===element ?'bg-richblack-900 text-richblack-5 font-medium':'text-richblack-200' } rounded-full transition-all cursor-pointer hover:bg-richblack-900 px-5 py-2 `}
                                            key={index} onClick={()=>setMyCards(element)}>
                                {element}
                            </div>    
                        )
                    })
                }
            </div>

            <div className="lg:h-[150px]">

            </div>

            <div className="absolute flex flex-row gap-10 justify-between w-11/12 m-auto items-center left-[5%] bottom-[-3%] ">
                {
                    courses.map((element,index) =>{
                        return(
                            <CourseCard
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>
            
        </div>
    )

}

export default ExploreMore;