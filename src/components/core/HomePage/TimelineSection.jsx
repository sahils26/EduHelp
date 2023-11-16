
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

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
            <div className="flex flex-row gap-15 items-center">
                <div className="w-[45%] flex flex-col gap-5 ">
                    {
                        timeline.map( (element,index) => {
                            return(
                                <div key={index} className="flex flex-row">

                                    <div className="w-[50px] h-[50px] bg-white items-center">
                                        <img src={element.Logo} alt=""/>
                                    </div>   
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                        <p className="text-base">{element.Description}</p>
                                    </div>    
                                </div>    
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default TimelineSection;