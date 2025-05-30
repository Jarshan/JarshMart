import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel";



//Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  };


// Route for User Login
const loginUser = async (req, res) => {
    // try {
    //   const { email, password } = req.body;
  
    //   const user = await userModel.findOne({ email });
  
    //   if (!user) {
    //     return res.json({ success: false, message: "User Doesn't Exists" });
    //   }
  
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (isMatch) {
    //     const token = createToken(user._id);
    //     res.json({ success: true, token });
    //   } else {
    //     res.json({ success: false, message: "Wrong Credentials" });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   res.json({ success: false, message: error.message });
    // }
  };


  // Route for User Registration
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
    
        // Checking User Already exists or not
        const existsUser = await userModel.findOne({ email });
        if (existsUser) {
          return res.json({ success: false, message: "User Already Exists" });
        }
        // Validating Email Format and Strong Password
        if (!validator.isEmail(email)) {
          return res.json({
            success: false,
            message: "Please Provide a Valid Email",
          });
        }
        if (password.length < 8) {
          return res.json({
            success: false,
            message: "Please Enter a Strong Password",
          });
        }
    
        // Hashing User Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new userModel({
          name,
          email,
          password: hashedPassword,
        });
        const user = await newUser.save();
    
        const token = createToken(user._id);
    
        res.json({ success: true, token });

      } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
      }

}



// Route for Admin Login
const adminLogin = async (req, res) => {

}


  export { loginUser, registerUser, adminLogin}
  