import BookingClient from "@/components/booking/BookingClient";

export const metadata = {
  title: "Boka biljetter – Kino Uppsala",
  description:
    "Välj biljetter och sittplatser till din föreställning och genomför bokningen enkelt online.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{
    movieId: string;
    screeningTime: string;
    auditorium: string;
  }>
}) {
  const movieId = (await searchParams).movieId;
  const screeningTime = (await searchParams).screeningTime;
  const auditorium = "city";

  if (!movieId || !screeningTime) {
    return <p className="text-center mt-10 text-gray-400">Laddar visning...</p>;
  }

  return (
    <BookingClient
      movieId={movieId}
      screeningTime={screeningTime}
      auditorium={auditorium}
    />
  );
}
