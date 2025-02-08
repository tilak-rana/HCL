import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: [
      "Principal Investigator(PI)",
      "Clinical Research Coordinator(CRC)",
      "Regulatory Authority(RA)",
    ],
  },
});

export default mongoose.model("userSchema", userSchema, "Users");
