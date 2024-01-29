import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { VscEye ,VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";

function UpdatePassword(){

    const dispatch=useDispatch();
    const location=useLocation();

    const[formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const {loading}=useSelector((state)=>state.auth);

    const{password,confirmPassword}=formData;

    const handleOnChange=(event)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value,
            }
        ))
    }


    const handleOnSubmit=(event)=>{
        event.preventDefault();
        const token=location.pathname.split('/').at(-1); 
        dispatch(resetPassword(password,confirmPassword,token))
    }

    return(<div>
        {
            loading?(<div>Loading...</div>):
            (
                <div>
                    <h1>Choose new Password</h1>
                    <p>Almost done. Enter your new Password and you're all set</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password</p>
                            <input
                                required
                                type={showPassword ? "text":"password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                            />
                            <span onClick={()=>{setShowPassword((prev)=>!prev)}}>
                                {
                                    showPassword? <VscEyeClosed fontSize={24}/>:<VscEye fontSize={24}/>
                                }
                            </span>
                        </label>
                        
                        <label>
                            <p>Confirm New Password</p>
                            <input
                                required
                                type={showConfirmPassword ? "text":"password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                            />
                            <span onClick={()=>{setShowConfirmPassword((prev)=>!prev)}}>
                                {
                                    showConfirmPassword? <VscEyeClosed fontSize={24}/>:<VscEye fontSize={24}/>
                                }
                            </span>
                        </label> 

                        <button type="submit">
                                Reset Password
                      </button>
                    </form>

                    <div>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>  
                </div>    
            )
        }
    </div>)
}

export default UpdatePassword;