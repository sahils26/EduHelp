const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");


const {connectDB} =require("./config/database");
const {cloudinaryConnect} =require("./config/cloudinary");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
const fileUpload=require("express-fileupload");
const cors=require("cors");


dotenv.config();
const PORT=process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"hhtp://localhost:3000",
        credentials:true,
    })
    )
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

cloudinaryConnect();


app.use("api/v1/auth",userRoutes);
app.use("api/v1/profile",profileRoutes);
app.use("api/v1/course",courseRoutes);
app.use("api/v1/payment",paymentRoutes);


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'your server is running'
    })
})


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})




