import { Types } from "mongoose";

export type Params = {
  params: {
    id: string;
  };
};

export type DiscountType = "child" | "retired" | "student" | "member";

export interface Seat {
  row: number;
  seat: number;
  type: DiscountType | string;
}
export interface BookingType {
  movieId: string;
  screeningTime: string;
  seats: Seat[];
  auditorium: string;
  totalPrice: number;
  userId?: string | null;
}

export interface ScreeningType {
  _id: Types.ObjectId;
  startTime: Date;
  auditorium: string;
  availableSeats: number;
  bookedCount: number;
}

export interface UserType {
  _id: Types.ObjectId;
  name: string;
  email: string;
  hashedPassword: string;
  role: string;
  benefits: [];
  points:number;
  profilePicture?: string;
}
