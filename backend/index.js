import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DataBase Connected");
}).catch((err) => {
    console.log(err);
})

const app = express();
// for allowing json object in req body
app.use(express.json())

 app.listen(5000 , ()=>{
   console.log("server is a running");
})

app.use("/api/auth" , authRoutes )

