import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";


function CodeBlocks({position, heading ,subHeading , ctaButton1 ,ctaButton2, codeblock, backgroundGradient ,codeColour}){
    return(
        <div className={`w-11/12 max-w-maxContent flex ${position} justify-between px-auto gap-14 p-5 `}>
            
            {/* Section 1 */}
            <div className="w-[60%] flex flex-col gap-8 ">
                <div>
                    {heading}
                </div>
                <div className="text-richblack-400 font-bold">
                    {subHeading}
                </div>
                <div className="flex gap-7 mt-7">
                    <CTAButton linkTo={ctaButton1.linkTo} active={ctaButton1.active}>
                        <div className="flex gap-2 items-center">
                            <p>{ctaButton1.text}</p>
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton linkTo={ctaButton2.linkTo} active={ctaButton2.active}>
                        <p>{ctaButton2.text}</p>
                    </CTAButton>
                </div>
            </div>
            
            {/* Section 2 */}
            <div className=" flex flex-row h-fit justify-start w-[200%] ml-4 lg:w-[600px] ">
                {/* Bg-Gradient */}
                
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColour} `}>
                    <TypeAnimation
                    sequence={[codeblock,4000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={{
                        whiteSpace:"pre-line",
                        display:"block"
                    }}/>
                </div>
            </div>

        </div>
    )
}


export default CodeBlocks;