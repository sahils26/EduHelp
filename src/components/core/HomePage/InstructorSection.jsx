import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa6";
import CTAButton from "./Button";

function InstructorSection(){

    return(
        <div className="mt-16">
            <div className="flex flex-row gap-10 items-center">
                <div>
                    <img 
                        src={Instructor}
                        alt=""
                        className="shadow-lg shadow-white"/>
                </div>

                <div className="w-[50%] flex flex-col gap-10 ">
                    <div className="text-4xl font-semibold w-[50%] ">
                        Become an
                        <HighlightText>Instructor</HighlightText>
                    </div>

                    <p className="font-medium text-[16px] w-[80%] text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                     
                    <div className="w-fit">
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className="flex flex-row items-center gap-2 ">
                                <p>Start Teaching Today</p>
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default InstructorSection;