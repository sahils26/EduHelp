
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

function TimelineSection(){

    const timeline=[
        {
            Logo: Logo1,
            heading: "Leadership",
            Description:"Fully committed to the success company"
        },
        {
            Logo: Logo2,
            heading: "Responsibility",
            Description:"Students will always be our top priority"
        },
        {
            Logo: Logo3,
            heading: "Flexibility",
            Description:"The ability to switch is an important skills"
        },
        {
            Logo: Logo4,
            heading: "Solve the problem",
            Description:"Code your way to a solution"
        }
    ]

    return(
        <div>
            <div className="flex flex-row gap-16 items-center mb-20">
                <div className="w-[45%] flex flex-col gap-5 ">
                    {
                        timeline.map( (element,index) => {
                            return(
                                <div key={index} className="flex flex-col justify-center ">
                                    <div  className="flex flex-row gap-7">

                                        <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full  ">
                                            <img src={element.Logo} alt=""/>
                                        </div>   
                                        <div>
                                            <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                            <p className="text-base">{element.Description}</p>
                                        </div>    
                                    </div>  
                                    {
                                        timeline.length-1===index ? (<div> </div>) : (<div className="pl-6 h-12 w-0 border-r border-dashed  border-pure-greys-500"></div>)

                                    }
                                </div>    
                            )
                        })
                    }
                </div>

                <div className="relative shadow-blue-200">
                    <img src={timelineImage} alt="timeline_image" className=" shadow-brown-600  shadow-[_0px_0px_7px_5px]"/>

                    <div className="absolute bg-brown-800 flex flex-row text-white uppercase py-7 left-[8%] translate-y-[-50%] ">
                        <div className="flex flex-row gap-3 items-center border-r border-brown-200 px-5">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-brown-400 text-sm">Years of Experience</p>
                        </div>
                        <div className="flex flex-row gap-5 items-center border-r border-brown-200 px-7">
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-brown-400 text-sm">Types of Courses</p>
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default TimelineSection;