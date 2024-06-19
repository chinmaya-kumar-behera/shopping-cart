const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const login = async (req, res) => {
   try {
     const { email, password } = req.body;
     console.log(req.body);
     console.log("login controller");

     if (!email || !password) {
       return res.status(400).json({ message: "All fields are required" });
     }

     const existingUser = await userModel.findOne({ email });

     if (!existingUser) {
       return res.status(400).json({ message: "Email not found!" });
     }

     const isPasswordValid = await bcrypt.compare(
       password,
       existingUser.password
     );

     if (!isPasswordValid) {
       return res.status(400).json({ message: "Invalid password" });
     }

     const payload = {
       user: {
         id: existingUser._id,
         email: existingUser.email,
       },
     };

     const token = jwt.sign(payload, process.env.JWT_SECRET, {
       expiresIn: "1h",
     });

     const { name, _id } = existingUser;

     res.status(200).json({
       message: "Login successful",
       userData: { name, email: existingUser.email, _id, token },
     });
   } catch (error) {
     console.error("Error logging in:", error);
     res.status(500).json({ message: "Internal server error" });
   }
};

module.exports = { signUp, login };
