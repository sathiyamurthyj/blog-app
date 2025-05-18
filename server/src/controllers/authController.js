const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signup = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({success:true, message:"User successfully registered"});
    } catch (error) {
        res.status(500).json({success:false, message:"Something went wrong.Try Later"});
    }
};

const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false, message:`User with ${email} not found`});
        }
        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message:"Invalid password"});
        }
        const token = jwt.sign({id: user._id,name: user.name,email:user.email},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token", token,{
        secure: true,
        sameSite: 'none'
      });
        return res.status(200).json({success: true,message:"Logged In successfully"});

    } catch (error) {
        res.status(500).json({success: false,message:"Something went wrong"});
    }
};

module.exports = {signup, login};