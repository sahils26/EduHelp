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




// CORS4 middleware - this needs to be before ANY route handlers
// app.use((req, res, next) => {
//     // Allow any origin for now - you can restrict this later once it's working
//     res.header('Access-Control-Allow-Origin', '*');
    
//     // Add required CORS headers
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
    
//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//       return res.status(200).end();
//     }
    
//     next();
//   });





connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
    )

app.use(cors());   //Allow all origins for testing




//claude's CORS
// const allowedOrigins = [
//     'http://localhost:3000',
//     'https://edu-help-six.vercel.app',
//     'https://edu-help-ptlg.vercel.app',
//     'https://edu-help-ptlg-git-master-sahil-sajwans-projects.vercel.app',
//     'https://edu-help-temp.vercel.app',
//     'https://edu-help-temp.vercel.app/'
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         // For requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
        
//         // Check if the origin is allowed
//         if (allowedOrigins.indexOf(origin) !== -1 || origin.match(/\.vercel\.app$/)) {
//             callback(null, true);
//         } else {
//             console.log('Blocked origin:', origin);
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
// }));

// // Handle preflight requests
// app.options('*', cors());
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

// IMPORTANT: Place this BEFORE your routes(claudes CORS code)
// app.use(cors(corsOptions));

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



//CODE FOR CORS
// app.get("/", (req, res) => {
//     // Add these headers
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
//     return res.json({
//         success: true,
//         message: 'Your server is running'
//     });
// });
//




app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'your server is running'
    })
})


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})

































// // new index.js
// // index.js - Updated with comprehensive CORS handling

// const express = require("express");
// const app = express();
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");
// const {connectDB} = require("./config/database");
// const {cloudinaryConnect} = require("./config/cloudinary");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// const corsMiddleware = require('./middlewares/cors');


// console.log("Server starting...");
// dotenv.config();
// const PORT = process.env.PORT || 4000;


// // Apply CORS middleware FIRST - before anything else
// // app.use(corsMiddleware);



// // CORS middleware - this needs to be before ANY route handlers
// // app.use((req, res, next) => {
// //   // Allow any origin for now - you can restrict this later once it's working
// //   res.header('Access-Control-Allow-Origin', '*');
  
// //   // Add required CORS headers
// //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
// //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// //   res.header('Access-Control-Allow-Credentials', 'true');
  
// //   // Handle preflight requests
// //   if (req.method === 'OPTIONS') {
// //     return res.status(200).end();
// //   }
  
// //   next();
// // });



// //claude's code (13-03)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     if (req.method === 'OPTIONS') return res.sendStatus(200);
//     next();
//   });
  
//   app.get('/test', (req, res) => {
//     res.json({ message: 'CORS test successful' });
//   });
// //




// // Standard middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "/tmp",
//     })
// );

// // Connect to database and cloudinary
// connectDB();
// cloudinaryConnect();

// // Routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// // Root route
// app.get("/", (req, res) => {
//     return res.json({
//         success: true,
//         message: 'Your server is running'
//     });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`App is running at ${PORT}`);
// });



















































// // Install the cors package if not already installed:
// // npm install cors

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");
// const {connectDB} = require("./config/database");
// const {cloudinaryConnect} = require("./config/cloudinary");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const fileUpload = require("express-fileupload");

// console.log("Server starting...");
// dotenv.config();
// const PORT = process.env.PORT || 4000;

// // ========== CORS CONFIGURATION - START ==========
// // 1. Add CORS middleware - MUST be before any route definitions
// app.use(cors({
//   origin: true, // Allows all origins - equivalent to '*'
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
//   credentials: false // Set to true only if you need to pass cookies
// }));

// // 2. Handle OPTIONS requests explicitly
// app.options('*', cors());

// // 3. Add a diagnostic endpoint to test CORS
// app.get('/cors-test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'CORS is configured correctly!',
//     headers: req.headers,
//     timestamp: new Date().toISOString()
//   });
// });
// // ========== CORS CONFIGURATION - END ==========

// // Standard middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );

// // Database and cloudinary connections
// connectDB();
// cloudinaryConnect();

// // Routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// // Root route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: 'Your server is running and CORS is configured'
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
//   console.log(`CORS is enabled for all origins`);
// });