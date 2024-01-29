import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authApi";

function ForgotPassword(){

    const dispatch=useDispatch();

    const {loading} = useSelector((state)=>state.auth);
    const[emailSent,setEmailSent]=useState(false);
    const[email,setEmail]=useState("");

    const handleOnSubmit=(event)=>{
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmail))
    }

    return(
        <div className="text-white flex items-center justify-center">
            {
                loading ?(<div>Loading...</div>):
                (<div>
                    <h1>
                        {
                            !emailSent? 'Reset Your Password':'Check your Email'
                        }
                    </h1>

                    <p>
                        {
                            !emailSent?'Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery':
                            `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p>Email Address:</p>
                                    <input type="email" required name="email" value={email} placeholder="Enter your email" 
                                    onChange={(event) => setEmail(event.target.value)}>
                                    </input>
                                </label>
                            ) 
                        }
                    </form>

                    <button type="submit">
                        {
                            !emailSent?'Reset Password':'Reset Email'
                        }
                    </button>

                    <div>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>    
                </div>)
            }
        </div>
    )
}

export default ForgotPassword;