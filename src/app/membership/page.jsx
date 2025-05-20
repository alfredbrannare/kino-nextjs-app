'use client';

import { useAuth } from "src/components/user/AuthData"
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { LogOut, LockKeyhole, Popcorn, Ticket } from 'lucide-react';
import Link from "next/link";
import { Armchair, MapPin, Banknote } from 'lucide-react';
import { Pencil, Trash2 } from "lucide-react"

export default function MembershipPage() {
  const { userData, isLoggedIn, isLoading, loading, logout, isAdmin, fetchUser } = useAuth();
  const [booking, setBooking] = useState([]);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setAdminMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('token');

      const res = await fetch('/api/upload-profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      console.log('Upload response:', res.status, data);

      if (res.ok && data.profilePicture) {
        alert('Profilbilden har uppdaterats!');
        await fetchUser();
      } else {
        alert(`Något gick fel vid uppladdningen: ${data.error || 'Okänt fel'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Kunde inte ladda upp bilden.');
    }
  };

  const handleRemoveImage = async () => {
    const confirmDelete = window.confirm("Är du säker på att du vill ta bort profilbilden?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/remove-profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profilbilden har tagits bort.");
        await fetchUser();
      } else {
        alert(`Kunde inte ta bort bilden: ${data.error || 'Okänt fel'}`);
      }
    } catch (error) {
      console.error("Remove image error:", error);
      alert("Ett fel uppstod när bilden skulle tas bort.");
    }
  };

  console.log("Profile Picture URL:", userData?.profilePicture);

  return (
    <div className="bg-[#250303] border-4 rounded-md border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] flex flex-col md:flex-row justify-center md:items-center gap-10 px-4 md:px-12 py-10 bg-[#2B0404]">
      {/* Left Column - User Info */}
      <div className="bg-[#2B0404] rounded-2xl shadow-xl p-6 w-full md:w-[50%] flex-shrink-0">
        <div className="flex justify-between items-center">
          {isAdmin && (
            <div className="relative" ref={adminMenuRef}>
              <LockKeyhole
                size={24}
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => setAdminMenuOpen(prev => !prev)}
              />
              {adminMenuOpen && (
                <div className="absolute left-0 mt-2 z-10 w-48 p-3 bg-white text-black rounded shadow-lg">
                  <ul className="space-y-2 font-medium">
                    <li><Link href="/admin/movies">🎬 Filmhantering</Link></li>
                    <li><Link href="/admin/screenings">📅 Visningshantering</Link></li>
                    <li><Link href="/admin/reviews">📝 Reviewshantering</Link></li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <LogOut size={24} className="cursor-pointer hover:scale-110 transition" onClick={logout} />
        </div>


        <div className="flex flex-col items-center">
          <div className="relative group w-40 h-40">
            <img
              src={
                userData?.profilePicture
                  ? `${userData.profilePicture}?t=${Date.now()}`
                  : "/kino-card.jpg"
              }
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />

            <label className="absolute bottom-2 right-2 bg-black/60 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <Pencil size={18} color="#facc15" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              onClick={handleRemoveImage}
              className="absolute bottom-2 left-2 bg-black/60 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              title="Ta bort profilbild"
            >
              <Trash2 size={18} color="#f87171" />
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-yellow-400 text-center mt-4 mb-4">{userData?.name}</h2>
        <p className="text-[#CDCDCD] text-sm font-bold text-center">{userData?.email}</p>
        <p className="mt-2 font-bold text-sm text-[#CDCDCD] text-center">
          {`Medlemsnivå: ${userData?.role === 'user' ? 'Filmguru' : 'Admin'}`}
        </p>
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
          <h3 className="text-xl font-bold text-yellow-400[#CDCDCD] border-b pb-3 mb-4 flex items-center gap-2">
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
