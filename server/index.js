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

console.log("Server starting...");

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

// app.use(cors());   Allow all origins for testing


//claude's CORS
const cors = require('cors');

const allowedOrigins = [
    'http://localhost:3000',
    'https://edu-help-six.vercel.app', // Your Vercel deployment URL
    'https://eduhelp-w00m.onrender.com' // Your backend URL (optional, but can help)
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log('Incoming origin:', origin);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.some(allowed => 
            origin.startsWith(allowed)
        )) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin', 
        'X-Requested-With', 
        'Content-Type', 
        'Accept', 
        'Authorization'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};



// Apply CORS before your routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
//till here


// Mohan's code
// const allowedOrigins = [
//     'http://localhost:3000',
//     'https://edu-help-six.vercel.app',
//     'https://edu-help-ptlg.vercel.app',
//     'edu-help-ptlg-git-master-sahil-sajwans-projects.vercel.app',
//     'https://vercel.com/sahil-sajwans-projects/edu-help-ptlg/GUGMnzYPeCmiqyuGByRMNtuN7rha'
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true, // Include cookies if needed
// }));
// till here 



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



