'use client';

import { useAuth } from "src/components/user/AuthData"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, LockKeyhole, Popcorn, Ticket } from 'lucide-react';
import Link from "next/link";
import { Armchair, MapPin, Banknote } from 'lucide-react';

export default function MembershipPage() {
  const { userData, isLoggedIn, isLoading, loading, logout, isAdmin } = useAuth();
  const [booking, setBooking] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    const getBookings = async () => {
      const response = await fetch('/api/bookings/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localToken}`,
        }
      });
      const data = await response.json();

      setBooking(Array.isArray(data) ? data : []);
    }
    getBookings();
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (isLoading || loading) return <p>Loading page data...</p>;
  if (!isLoggedIn) return <p>Access Denied. You are not authorized to view this page.</p>;
  console.log(booking);
  return (
    <div className="bg-[#250303] border-4 rounded-md border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] flex flex-col md:flex-row justify-center items-start gap-10 px-4 md:px-12 py-10 bg-[#2B0404]">
      {/* Left Column - User Info */}
      <div className="bg-[#2B0404] rounded-2xl shadow-xl p-6 w-full md:w-[50%] flex-shrink-0">
        <div className="flex justify-between items-center">
          {isAdmin && (
            <div className="relative group">
              <LockKeyhole size={24} className="cursor-pointer hover:scale-110 transition" />
              <div className="absolute  left-0 mt-2 z-10 w-48 p-3 bg-white text-black rounded shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200">
                <ul className="space-y-2 font-medium">
                  <li><Link href="/admin/movies">🎬 Filmhantering</Link></li>
                  <li><Link href="/admin/screenings">📅 Visningshantering</Link></li>
                  <li><Link href="/admin/reviews">📝 Reviewshantering</Link></li>
                </ul>
              </div>
            </div>
          )}
          <LogOut size={24} className="cursor-pointer hover:scale-110 transition" onClick={logout} />
        </div>

        <div className="flex flex-col items-center">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=150"
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />
          <h2 className="text-3xl font-bold text-[#CDCDCD] text-center mb-4">{userData?.name}</h2>
          <p className="text-[#CDCDCD] text-center">{userData?.email}</p>
          <p className="mt-2 font-medium text-m text-[#CDCDCD] text-center">
            {`Medlemsnivå: ${userData?.role === 'user' ? 'Filmguru' : 'Admin'}`}
          </p>
        </div>
      </div>

      {/* Right Columns - Tickets and Offers */}
      <div className="flex flex-col gap-6 w-full md:w-50%]">
        {/* Tickets */}
        <div className="bg-[#2B0404] rounded-2xl shadow-xl p-6 w-full">
          <h3 className="text-xl font-bold text-[#CDCDCD] border-b pb-3 mb-4 flex items-center gap-2">
            <Ticket size={40} /> Dina Biljetter
          </h3>
          {booking.length === 0 ? (
            <p className="text-[#CDCDCD]">Inga bokningar hittades.</p>
          ) : (
            <ul className="space-y-4">
              {booking.map((booking) => (
                <li key={booking._id} className="border-b pb-3">
                  <div className="font-semibold text-[#CDCDCD]">
                    🎬 {booking.movieId?.title || "Okänd film"}<br />
                    📆 {new Date(booking.screeningTime).toLocaleString('sv-SE', options)}
                  </div>
                  <div className="mt-2 text-sm text-[#CDCDCD] flex items-center gap-1">
                    <MapPin size={16} /> Salong: <span className="ml-1 font-medium">{booking.auditorium}</span>
                  </div>
                  <div className="mt-2 text-sm text-[#CDCDCD] flex items-center gap-1 flex-wrap">
                    <Armchair size={16} /> Platser:
                    {booking.seats.map((seat, i) => (
                      <span
                        key={i}
                        className="ml-2 px-2 py-1 bg-gray-100 rounded text-black"
                      >
                        Rad {seat.row}, Stol {seat.seat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-[#CDCDCD] flex items-center gap-1">
                    <Banknote size={16} /> Totalt: {booking.totalPrice} kr
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Offers */}
        <div className="bg-[#2B0404] rounded-2xl shadow-xl p-6 w-full">
          <h3 className="text-xl font-bold text-[#CDCDCD] border-b pb-3 mb-4 flex items-center gap-2">
            <Popcorn size={40} /> Veckans erbjudande
          </h3>
          <ul className="space-y-2 list-disc list-inside text-[#CDCDCD]">
            {userData?.benefits?.length ? (
              userData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))
            ) : (
              <li>Inga aktuella erbjudanden.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
