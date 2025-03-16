import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/eduhelp bg2.png"
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";


const Navbar = () => {
    // console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart )
    const location = useLocation();

    const [ssubLinks, setSsubLinks]  = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("APIforCategories", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result?.data?.res);
            setSsubLinks(result?.data?.res);  
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }


    useEffect( () => {
        // console.log("PRINTING TOKEN", token);
        return()=>fetchSublinks();
    } )



    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-850 shadow-richblack-650 shadow-2xl font-thin       font-edusa'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Image */}
      <Link to="/">
        <img className="" src={logo} alt="" width={140} height={36} loading='lazy'/>
      </Link>

      {/* Nav Links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDropdownCircle/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[20%]
                                 top-[10%]
                                flex flex-col rounded-md bg-richblack-700 p-4 text-richblack-5
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px] z-10'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-4 rotate-45 rounded bg-richblack-700'>
                                </div>

                                {
                                    ssubLinks.length ? (

                                            ssubLinks.map( (subLink, index) => (
                                                <Link
                                                    to={`/catalog/${subLink.name
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={index}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-richblack-550" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>


        {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>

            {
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                        <FaShoppingCart />
                        {
                            totalItems > 0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-850 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-850 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropdown />
            }
            
        </div>


      </div>
    </div>
  )
}

export default Navbar
