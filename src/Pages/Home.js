import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/pages-vid.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import { useEffect } from "react";


function Home(){  
    useEffect(() => {
        const testApiConnection = async () => {
          try {
            const fullUrl = `${process.env.REACT_APP_BASE_URL || 'https://eduhelp-w00m.onrender.com'}/`;
            
            console.log('Attempting to fetch:', fullUrl);
            
            const response = await fetch(fullUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Add these headers
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              }
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
              console.error('API response not OK', response.status, response.statusText);
              return;
            }
            
            const data = await response.json();
            console.log('API Test Response:', data);
          } catch (error) {
            console.error('API Connection Error:', {
              message: error.message,
              name: error.name,
              stack: error.stack
            });
          }
        };
      
        testApiConnection();
      }, []);

    return(
        <div className="font-mono">
            
            {/* Section 1 */}
            <div className="  relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
                
                <div className="mt-8">
                    <Link to={"/signup"}>
                        <div className="group  p-1 mx-auto rounded-full bg-richblack-700 font-bold text-richblack-5 transition-all duration-200 hover:scale-95 w-fit">
                            <div className="flex flex-row items-center gap-2 rounded-full px-7 py-[5px] group-hover:bg-richblack-900">
                                <p>Become An Instructor</p> 
                                <FaArrowRight/>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="text-centre text-4xl mt-7">
                    Empower Your Future with 
                    <HighlightText>Coding Skills</HighlightText>
                </div>

                <div className="m-3 w-[80%] text-center text-base font-bold text-richblack-400">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className="flex flex-row gap-7">
                    <CTAButton active={true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkTo={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="mx-3 my-11  shadow-richblack-250 shadow-[_0px_0px_25px_5px]">
                    <video muted loop autoPlay src={Banner}/>
                </div>

                {/* Code Section 1 */}
                <div className="my-12 flex  justify-center">
                    <CodeBlocks
                        position={"lg:flex-row"}
                         
                        heading={
                            <div className="text-4xl font-bold">
                                Unlock Your 
                                <HighlightText >Coding Potential</HighlightText>
                                with our online courses
                            </div>   
                        }

                        subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                        ctaButton1={
                            {
                                text:"Try it Yourself",
                                linkTo:"/signup",
                                active:true
                            }
                        }
                        ctaButton2={
                            {
                                text:"Learn More",
                                linkTo:"/login",
                                active:false
                            }
                        }
        
                        codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>\n`}

                        codeColour={"text-richblack-150"}


                    />
                </div>

                {/* Code Section 2 */}
                <div className="my-12 flex  justify-center">
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                         
                        heading={
                            <div className="text-4xl font-bold">
                                Unlock Your 
                                <HighlightText>Coding Potential</HighlightText>
                                with our online courses
                            </div>   
                        }

                        subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                        ctaButton1={
                            {
                                text:"Try it Yourself",
                                linkTo:"/signup",
                                active:true
                            }
                        }
                        ctaButton2={
                            {
                                text:"Learn More",
                                linkTo:"/login",
                                active:false
                            }
                        }
        
                        codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>\n`}

                        codeColour={"text-richblack-150"}


                    />
                </div>

                <ExploreMore/>
                
            </div>


            {/* Section 2 */}
            <div className=" bg-pure-greys-5 text-richblack-700 pb-16">
                <div className="homepage_bg  h-[310px] ">
                    <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-5">
                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white ">
                            <CTAButton active={true} linkTo={"/signup"}>
                                <div className="flex items-center gap-3 ">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkTo={"/signup"}>
                                Learn More
                            </CTAButton>

                        </div>

                    </div>

                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                    <div className="flex flex-row gap-5 mb-10 mt-24">
                        <div className="text-4xl font-semibold w-[50%]">
                            Get the Skills you need for a <HighlightText> Job that is in Demand</HighlightText>
                        </div>
                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div className="text-[16px] font-medium">
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkTo={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>

                    <TimelineSection/>
                    <LearningLanguageSection/>    

                </div>

                

            </div>

            {/* Section 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                <InstructorSection/>

                <h2 className='text-center text-4xl font-semobold mt-10'>Review from Other Learners</h2>
                {/* <ReviewSlider/> */}

                
            </div>

            <Footer/>

            
        </div>
    )
}


export default Home;
