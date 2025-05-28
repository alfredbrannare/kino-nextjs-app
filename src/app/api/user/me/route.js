import connectDB from "src/lib/mongodb";
import { checkAuth } from "src/lib/auth";
import { NextResponse } from "next/server";
import User from "src/models/model.users";

export const GET = async (req) => {
  try {
    await connectDB();
    const authenticatedUser = await checkAuth(req);

    if (!authenticatedUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userStatus = authenticatedUser.role.split(" ")[0];
    
      let newRole = userStatus;
    
      if (authenticatedUser.points >= 1000) {
        newRole += " kinoguru";
      } else if (authenticatedUser.points >= 500) {
        newRole += " guld";
      } else if (authenticatedUser.points >= 100) {
        newRole += " silver";
      }
    
      await User.findByIdAndUpdate(
        authenticatedUser.id,
        { role: newRole },
        { new: true, runValidators: true }
      );

    return NextResponse.json(
      {
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
        benefits: authenticatedUser.benefits,
        profilePicture: authenticatedUser.profilePicture || '',
        updatedRole: `Your new role is: ${newRole} You have ${authenticatedUser.points} points`
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error:", error: error.message },
      { status: 500 }
    );
  }
};
