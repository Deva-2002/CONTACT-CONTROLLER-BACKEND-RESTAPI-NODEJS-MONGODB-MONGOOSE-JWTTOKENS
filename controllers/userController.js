const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const User=require("../models/userModels");

const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are necessary");
    }
    const userAvaliable=await User.findOne({email});
    if(userAvaliable){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message:"register here"});
});

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    if(user && await bcrypt.compare(password,user.password)){
        const accesstoken=jwt.sign({
            user:{
                username:user.name,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"2m"});
    res.json({accesstoken});
    }else{
        res.status(401);
        throw new Error("email or password in not valid");
    }
});

const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};