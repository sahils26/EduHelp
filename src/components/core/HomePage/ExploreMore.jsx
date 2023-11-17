import { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore";

function ExploreMore(){

    const tabName=[
        "Free",
        "New to coding",
        "Most popular",
        "Skill  paths",
        "Career paths"
    ]
    const[currentTab,setCurrentTab]=useState(tabName[0]);
    return(
        <div>
             
        </div>
    )

}

export default ExploreMore;