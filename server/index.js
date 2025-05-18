const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv").config();
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const verifyUser = require("./src/middlewares/verifyUser");

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
}));
app.use(cookieParser());
app.use(express.static('public'));

// connect to DB
connectDB();

// routes
app.get("/", verifyUser,(req,res)=>{
    return res.status(200).json({success: true, user:{name:req.name,email:req.email,id:req.id}});
});

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({success: true,message:"Logged out successfully"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`);
});