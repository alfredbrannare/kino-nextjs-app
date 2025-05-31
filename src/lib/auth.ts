import User from '@/models/model.users';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const checkAuth = async () => {
  try {
    const allCookies = await cookies();
    const authCookie = allCookies.get('token');
    const token = authCookie?.value;

    if (!token) {
      return null;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT SERCRET NOT FOUND!');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select('-hashedPassword');

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Auth error:', error.message);
      return null;
    }
  }
};
