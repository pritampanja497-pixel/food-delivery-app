import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

const loginUser = async (req,res) =>{
      const {email,password} = req.body;
      try {
        const user = await userModel.findOne({email})

        if(!user){
          return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
          return res.json({success:false,message:"Password does not match"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

      } catch (error) {
        console.log(error);
        res.json({success:false,messsage:"Error"})
        
      }

}

const createToken =(id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    // Response
    res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
};


export {loginUser,registerUser}