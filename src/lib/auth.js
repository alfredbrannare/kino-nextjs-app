import User from "src/models/model.users";
import jwt from "jsonwebtoken";

export const checkAuth = async (req) => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return null;
  }
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if(!user){
    return null;
  }

  return user;
};
