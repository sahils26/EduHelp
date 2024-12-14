const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

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
// app.use(
//     cors({
//         origin: ['http://localhost:3000'],
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "DELETE"],
//     })
//     )


//Mohan's code
const allowedOrigins = [
    'http://localhost:3000',
    'https://eduhelp-zeta.vercel.app/'
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Include cookies if needed
}));
//till here 



app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)



//new code for cors
// app.use(cors());
// app.options('*',cors());
// var allowCrossDomain = function(req,res,next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();  
// }
// app.use(allowCrossDomain);

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);


//server issue
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'your server is running'
    })
})


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})



