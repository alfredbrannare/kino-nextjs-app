import { Types } from "mongoose";

export type Params = {
  params: {
    id: string;
  };
};

export type Context = {
    params: {
      slug: string;
    }
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
  _id: string;
  startTime: string;
  auditorium: string;
  bookedSeats: number;
  screeningTime: string;
  availableSeats?: number;
  bookedCount?: number;
}

export interface MovieType {
  _id: string;
  title: string;
  image: string;
  runtime?: number | string;
  genres?: string;
  description: string;
  screenings: ScreeningType[];
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

export interface BookingPageProps {
    searchParams: {
        movieId: string;
        screeningTime: string;
        auditorium: string;
    };
}