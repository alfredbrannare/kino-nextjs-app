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