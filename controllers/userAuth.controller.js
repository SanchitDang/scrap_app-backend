import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({ message : "Required Fields not sent" });
    }

    const user = await userModel.findOne({email}).lean();

    if(!user){
      return res.status(400).json({ message : "User doesn't exists" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if(!passwordMatch){
      return res.status(401).json({ message : "Incorrect Password Provided" });
    }

    delete user.password;

    return res.status(200).json({ message : "Successfully logged in." , result : user });
  } catch (error) {
    return res.status(500).json({ error : "Internal Server Error", message : error.message });
  }
}

const registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
      return res.status(400).json({ message : "Required Fields not sent." });
    }

    const userExists = await userModel.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if(userExists){
      return res.status(400).json({ message : "User Already Exists!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await userModel.create({
      username, email, password : hashedPassword
    });

    delete newUser.password;

    return res.status(200).json({ message : "User Created Successfully", result : newUser});
  } catch (error) {
    return res.status(500).json({ error : "Interval Server Error", message : error.message });
  }
}

export {loginUser, registerUser};