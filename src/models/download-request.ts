import mongoose from "mongoose";

const downloadRequestSchema = new mongoose.Schema({
  mobile: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const DownloadRequestModel =
  mongoose.models.DownloadRequest ||
  mongoose.model("DownloadRequest", downloadRequestSchema);
