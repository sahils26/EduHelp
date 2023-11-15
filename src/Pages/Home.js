import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";


function Home(){
    return(
        <div>

            {/* Section 1 */}

            <div className=" group relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
                <Link to={"/signup"}>
                    <div className="mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
                            <p>Become An Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>
            </div>
            {/* Section 2 */}

            {/* Section 3 */}

            {/* Footer */}
        </div>
    )
}


export default Home;
