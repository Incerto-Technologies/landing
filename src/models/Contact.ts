import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  message: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
