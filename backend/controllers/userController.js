


// Route for User Login
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.json({ success: false, message: "User Doesn't Exists" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = createToken(user._id);
        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: "Wrong Credentials" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  export { loginUser}
  