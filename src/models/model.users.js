import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
  hashedPassword: String,
  role: {
    type: String,
    enum: ["user", "member", "admin"],
    default: "user"
  },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;