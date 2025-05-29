import { Types } from "mongoose";

export type Params = {
  params: {
    userId: string;
    settingId: string;
    id: string;
  };
};

export type Context = {
  params: {
    slug: string;
  };
};

export type DiscountType = 'ordinary' | 'child' | 'retired' | 'student' | 'member';

export interface Seat {
  isWheelchair: boolean;
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
  movieId: MovieType;
  auditoriumId: AuditoriumType;
  _id: string;
  startTime: string;
  auditorium: string;
  bookedSeats: number;
  screeningTime: string;
  availableSeats?: number;
  bookedCount?: number;
}

export interface AuditoriumType {
  _id: string;
  name: string;
  capacity: number;
  seats: Seat;
  slug: string;
}

export interface MovieType {
  _id: string;
  title: string;
  image: string;
  runtime?: number | string;
  genres?: string;
  description: string;
  screenings: ScreeningType[];
  inCinemas: boolean;
}

export interface ReviewsType {
  _id: string;
  movieId: string;
  userName: string;
  rating: number;
  text: string;
}

export interface UserType {
  _id: Types.ObjectId;
  name: string;
  email: string;
  hashedPassword: string;
  role: string;
  benefits: [];
  points: number;
  profilePicture?: string;
}

export interface BookingPageProps {
  searchParams: {
    movieId: string;
    screeningTime: string;
    auditorium: string;
  };
}

export interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  userId: string;
}

export interface EventType {
  _id: string;
  title: string;
}

export interface OffersType {
  _id: string;
  text: string;
}

export interface TicketDetails {
    ordinary: number;
    child: number;
    retired: number;
    student: number;
    member: number;
}
export interface TicketSelectionInfo {
    total: number;
    details: TicketDetails;
    totalPrice: number;
}