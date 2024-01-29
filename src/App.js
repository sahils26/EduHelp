import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Error from"./Pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/index"


function App() {

  const {user}=useSelector((state)=>state.profile)

  return (

    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="login" element={<Login/>}/>

        <Route path="signup" element={<Signup/>}/>

        <Route path="forgot-password" element={<ForgotPassword/>}/>

        <Route path="update-password/:id" element={<UpdatePassword/>}/>
        
        <Route path="verify-email" element={<VerifyEmail/>}/>

        <Route path="about" element={<About/>}/>

        <Route path="contact" element={<Contact/>}/>


        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>

          <Route path="dashboard/my-profile" element={<MyProfile/>}/>

          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/cart" element={<Cart/>}/>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>

              </>
            )          
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/add-course" element={<AddCourse/>}/>
              
              </>
            )          
          }
           

        </Route>


        <Route path="*" element={<Error/>}/>

      </Routes>
    </div>
  );
}

export default App;
