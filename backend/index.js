// import express from "express"
// import mongoose from "mongoose"
// import dotenv from "dotenv"

// import authRoutes from "./routes/auth.route.js"
// import userRoutes from "./routes/user.route.js"
// import cookieParser from "cookie-parser"
// import postRoutes from "./routes/post.route.js"
// import commentRoutes from "./routes/comment.route.js"

// dotenv.config()

// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log("DataBase Connected");
// }).catch((err) => {
//     console.log(err);
// })

// const app = express();
// // for allowing json object in req body
// app.use(express.json())
// app.use(cookieParser())

//  app.listen(5000 , ()=>{
//    console.log("server is a running");
// })

// app.use("/api/auth" , authRoutes )
// app.use("/api/user" , userRoutes )
// app.use("/api/post" , postRoutes)
// app.use("/api/comment" , commentRoutes)

// app.use((err , req, res , next) => {
//     const statusCode = err.statusCode || 500

//     const message = err.message || "Internal Server Error"

//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     })
// })
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

// Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";

dotenv.config();

const app = express();

import cors from "cors";



app.use(cors({
  origin: true,
  credentials: true,
}));



app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// 👇 Root route for "/"
app.get("/", (req, res) => {
  res.send("✅ Backend is live on Vercel!");
});

// 👇 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// 👇 Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ✅ Vercel expects export, not app.listen()
export default app;
