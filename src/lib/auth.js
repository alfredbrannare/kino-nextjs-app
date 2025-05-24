import User from "src/models/model.users";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const checkAuth = async () => {
  try {
    const allCookies = await cookies();
    const authCookie = allCookies.get("token");
    const token = authCookie?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-hashedPassword");

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Auth error:", error.message);
    return null;
  }
};
