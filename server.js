const express=require("express");
const connectDb=require("./config/dbConnection")
const userRouter=require("./routes/userRouter");
const router=require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();

connectDb();


const port=process.env.PORT || 3000;
const app=express();

app.use(express.json());

app.use("/api/contacts",router);

app.use("/api/users",userRouter);

app.use(errorHandler)


app.get("/",(req,res)=>{
    res.send("hello world!");
})

app.listen(port,()=>{
    console.log(`port is running on ${port}`)
});


