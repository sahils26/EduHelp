import { Link } from "react-router-dom";

function Button({children, active ,linkTo}){
    return(
        <Link to={linkTo}>
            <div className={`text-center text-[13px] py-3 px-6 rounded-md font-bold
            ${active ? "bg-yellow-50 text-black " : "bg-richblack-800"} 
            hover:scale-95 transition-all duration-200 `}>
                {children}
            </div>
        </Link>
    )
}

export default Button;