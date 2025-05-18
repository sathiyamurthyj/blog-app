const jwt = require("jsonwebtoken");

const verifyUser = (req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token) {
            return res.status(400).json({success:false, message:"Token missing"});
        } else {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if(decode) {
                req.email = decode.email;
                req.name = decode.name;
                req.id = decode.id;
                next();
            } else {
                throw new Error("Token is wrong");
            }
        }
    } catch(err) {
        return res.status(500).json({success:false, message:err.message});
    }
};

module.exports = verifyUser; 