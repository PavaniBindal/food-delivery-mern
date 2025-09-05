import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message : "User does not exist!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message : "Invalid Credentials!"});
        }

        const token = createToken(user._id);
        res.json({success:true, token});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"})
    }
};

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exits!" });
    }

    if(!validator.isEmail(email)){
        return res.json({ success: false, message: "Please enter a valid email" });
    }

    if(password.length < 8){
        return res.json({ success: false, message: "Password length should be greater than 8." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_pwd = await bcrypt.hash(password, salt);

    const newUser = new userModel({
        name : name,
        email : email,
        password : hashed_pwd
    })

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } 
  catch (err) {
    console.log(err);
    res.json({ success: false , message : "Error"});
  }
};

export { loginUser, registerUser };
