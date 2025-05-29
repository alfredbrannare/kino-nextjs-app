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

export type DiscountType =
  | "ordinary"
  | "child"
  | "retired"
  | "student"
  | "member";

export interface Seat {
  isWheelchair: boolean;
  row: number;
  seat: number;
  type: DiscountType | string;
}
export interface BookingType {
  _id?: string;
  movieId: MovieType;
  screeningTime: string;
  seats: Seat[];
  auditorium: string;
  totalPrice: number;
  userId?: string | null;
  title?: string;
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
  userData?: UserType;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  isLoading?: boolean;
  userId?: string;
  loading?: boolean;
  logout?: () => void;
  checkUser?: () => void;
}

export interface EventType {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export interface OffersType {
  _id: string;
  text: string;
}

export interface LiveEventsType {
  _id: string;
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  image: string;
  genre: string;
  runtime: number;
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
