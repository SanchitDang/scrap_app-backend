import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  phone : { 
    type: String, 
    required: true 
  },
  password : {
    type : String,
    required : true
  },
  image_url: {
    type: String
  }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);
export default userModel;
