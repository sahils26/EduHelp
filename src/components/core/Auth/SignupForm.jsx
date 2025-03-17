// import { useState } from "react"
// import { toast } from "react-hot-toast"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { sendOtp } from "../../../services/operations/authApi"
// import { setSignupData } from "../../../slices/authSlice"
// import { ACCOUNT_TYPE } from "../../../utils/constants"
// import Tab from "../../common/Tab"


// function SignupForm() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   // student or instructor
//   const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const { firstName, lastName, email, password, confirmPassword } = formData

//   // Handle input fields, when some value changes
//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   // Handle Form Submission
//   const handleOnSubmit = (e) => {
//     e.preventDefault()

//     if (password !== confirmPassword) {
//       toast.error("Passwords Do Not Match")
//       return
//     }
//     const signupData = {
//       ...formData,
//       accountType,
//     }

//     // Setting signup data to state
//     // To be used after otp verification
//     dispatch(setSignupData(signupData))
//     // Send OTP to user for verification
//     dispatch(sendOtp(formData.email, navigate))



  
//     // Reset
//     setFormData({ 
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     })
//     setAccountType(ACCOUNT_TYPE.STUDENT);

//   }

//   // data to pass to Tab component
//   const tabData = [
//     {
//       id: 1,
//       tabName: "Student",
//       type: ACCOUNT_TYPE.STUDENT,
//     },
//     {
//       id: 2,
//       tabName: "Instructor",
//       type: ACCOUNT_TYPE.INSTRUCTOR,
//     },
//   ]

//   return (
//     <div>
//       {/* Tab */}
//       <Tab tabData={tabData} field={accountType} setField={setAccountType} />
//       {/* Form */}
//       <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
//         <div className="flex gap-x-4">
//           <label>
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               First Name <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type="text"
//               name="firstName"
//               value={firstName}
//               onChange={handleOnChange}
//               placeholder="Enter first name"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] text-richblack-5"
//             />
//           </label>
//           <label>
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Last Name <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type="text"
//               name="lastName"
//               value={lastName}
//               onChange={handleOnChange}
//               placeholder="Enter last name"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] text-richblack-5"
//             />
//           </label>
//         </div>
//         <label className="w-full">
//           <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//             Email Address <sup className="text-pink-200">*</sup>
//           </p>
//           <input
//             required
//             type="text"
//             name="email"
//             value={email}
//             onChange={handleOnChange}
//             placeholder="Enter email address"
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] text-richblack-5"
//           />
//         </label>
//         <div className="flex gap-x-4">
//           <label className="relative">
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Create Password <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={password}
//               onChange={handleOnChange}
//               placeholder="Enter Password"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] pr-10 text-richblack-5"
//             />
//             <span
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//             >
//               {showPassword ? (
//                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//               ) : (
//                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//               )}
//             </span>
//           </label>
//           <label className="relative">
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Confirm Password <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={handleOnChange}
//               placeholder="Confirm Password"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] pr-10 text-richblack-5"
//             />
//             <span
//               onClick={() => setShowConfirmPassword((prev) => !prev)}
//               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//             >
//               {showConfirmPassword ? (
//                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//               ) : (
//                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//               )}
//             </span>
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="mt-6 rounded-[8px] bg-richblack-550 py-[8px] px-[12px]  font-semibold text-richblack-900"
//         >
//           Create Account
//         </button>
//       </form>
//     </div>
//   )
// }

// export default SignupForm






















//New code for password validation




import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../../../services/operations/authApi"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"


function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  
  // Password validation criteria states
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false
  })
  
  // Show password requirements when user focuses on password field
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Check password against requirements whenever it changes
  useEffect(() => {
    if (password) {
      setPasswordCriteria({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
      })
    }
  }, [password])
  
  // Validate all password criteria are met
  const isPasswordValid = Object.values(passwordCriteria).every(Boolean)

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    // Password validation
    if (!isPasswordValid) {
      toast.error("Password does not meet all requirements")
      return
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({ 
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-850 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(false)}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-850 p-[12px] pr-10 text-richblack-5 ${
                password && !isPasswordValid ? "border border-pink-200" : ""
              }`}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-850 p-[12px] pr-10 text-richblack-5 ${
                confirmPassword && password !== confirmPassword ? "border border-pink-200" : ""
              }`}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        
        {/* Password requirements checklist */}
        {(showPasswordRequirements || (password && !isPasswordValid)) && (
          <div className="text-[0.75rem] bg-richblack-800 p-2 rounded-md">
            <p className="text-richblack-5 mb-1">Password must contain:</p>
            <ul className="grid grid-cols-2 gap-x-4">
              <li className={`flex items-center gap-1 ${passwordCriteria.length ? "text-caribbeangreen-100" : "text-pink-200"}`}>
                {passwordCriteria.length ? "✓" : "✗"} At least 8 characters
              </li>
              <li className={`flex items-center gap-1 ${passwordCriteria.uppercase ? "text-caribbeangreen-100" : "text-pink-200"}`}>
                {passwordCriteria.uppercase ? "✓" : "✗"} At least 1 uppercase letter
              </li>
              <li className={`flex items-center gap-1 ${passwordCriteria.number ? "text-caribbeangreen-100" : "text-pink-200"}`}>
                {passwordCriteria.number ? "✓" : "✗"} At least 1 number
              </li>
              <li className={`flex items-center gap-1 ${passwordCriteria.symbol ? "text-caribbeangreen-100" : "text-pink-200"}`}>
                {passwordCriteria.symbol ? "✓" : "✗"} At least 1 special character
              </li>
            </ul>
          </div>
        )}
        
        {/* Show password mismatch error */}
        {confirmPassword && password !== confirmPassword && (
          <p className="text-pink-200 text-xs">Passwords do not match</p>
        )}
        
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-richblack-550 py-[8px] px-[12px] font-semibold text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm