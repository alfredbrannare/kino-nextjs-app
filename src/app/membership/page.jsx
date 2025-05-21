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
    <div className="min-h-screen flex justify-center items-center bg-[#2B0404] md:flex-row space-x-6">
      <div>

        <h1 className="text-xl font-semibold text-white mb-4">{`Aktuell medlemsnivå: ${userData?.role === 'user' ? 'Filmguru' : 'Admin'}`}</h1>

        <div className="bg-white p-16 rounded-lg shadow-lg w-full">
          <div className="flex justify-end items-center space-x-4 mb-4">
            {/* Admin panel */}
            {!isLoading && isAdmin ? (
              <div className="dropdown dropdown-end">
                <div tabIndex="0" role="button" className="text-black hover:scale-110 cursor-pointer">
                  <LockKeyhole size={24} />
                </div>
                <ul
                  tabIndex="0"
                  className="menu menu-sm dropdown-content bg-base-300 text-base-content rounded-box z-20 mt-3 w-52 p-2 shadow">
                  <li><Link href="/admin/movies" className="text-lg font-bold">Filmhantering</Link></li>
                  <li><Link href="/admin/screenings" className="text-lg font-bold">Visningshantering</Link></li>
                  <li><Link href="/admin/reviews" className="text-lg font-bold">Reviewshantering</Link></li>
                </ul>
              </div>
            ) : null}
            {/* END*/}
            <LogOut onClick={logout} className="text-black hover:scale-110 cursor-pointer" size={24} />
          </div>
          <h3 className="text-4xl text-black font-bold pb-4 text-center">Profilsida</h3>
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=150" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-black text-2xl font-bold">{`${userData?.name}`}</h2>
              <p className="text-lg text-gray-500">{`${userData?.email}`}</p>
            </div>
          </div>

          <div className="flex space-x-18">
            <div className="bg-white p-12 rounded-lg shadow-md flex-2">
              <h3 className="text-xl text-black font-semibold mb-4 border-b border-gray-400 pb-2">Dina Biljetter<Ticket /></h3>
              <ul className="space-y-4">
                {booking?.map((booking) => (
                  <li key={booking._id} className="text-gray-700 border-b pb-2">
                    <div className="font-semibold">
                      {booking.movieId?.title || "Okänd film"}{<br/>}
                      {new Date(booking.screeningTime).toLocaleString('sv-SE', options)}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <MapPin /> Salong: <span className="font-medium">{booking.auditorium}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 items-center text-sm">
                      <Armchair />  Platser:
                      {booking.seats.map((seat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-black"
                        >
                          Rad {seat.row}, Stol {seat.seat}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <Banknote /> Totalt: {booking.totalPrice} kr
                    </div>
                  </li>
                ))}
              </ul>

            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-2">
              <h3 className="text-black text-xl font-semibold mb-4 border-b border-gray-400 pb-2">Veckans erbjudande<Popcorn /></h3>
              <ul className="space-y-4">
                {userData?.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}