'use client';

import { useAuth } from "src/components/user/AuthData"
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { LogOut, LockKeyhole, Popcorn, Ticket, MoreVertical, Pencil, Trash2, MapPin, Armchair, Banknote, Calendar } from 'lucide-react';
import Link from "next/link";

export default function MembershipPage() {
  const { userData, isLoggedIn, isLoading, loading, logout, isAdmin, fetchUser } = useAuth();
  const [booking, setBooking] = useState([]);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);
  const [expandedTickets, setExpandedTickets] = useState({});
  const [showAllTickets, setShowAllTickets] = useState(false);
  const sortedBookings = [...booking].sort((a, b) => new Date(a.screeningTime) - new Date(b.screeningTime));

  const toggleExpand = (id) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers");
        const data = await res.json();
        setOffers(data.offers || []);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    fetchOffers();
  }, []);

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

  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setAdminMenuOpen(false);
      }
    }
    if (adminMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [adminMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    }
    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: '2-digit',
    minute: '2-digit'
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

  return (
    <div className="bg-[#250303] border-4 rounded-md border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] px-4 py-10">
      <div className="items-stretch max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10 w-full">
        {/* Left Column - User Info */}
        <div className="bg-[#2B0404]  border-1 border-yellow-400 rounded-2xl shadow-xl p-6 w-full md:w-1/2 min-w-[300px] md:ml-5 flex flex-col  md:ml-5 flex-grow ">
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
                      <li><Link href="/admin/movies">Filmhantering</Link></li>
                      <li><Link href="/admin/screenings">Visningshantering</Link></li>
                      <li><Link href="/admin/reviews">Reviewshantering</Link></li>
                      <li><Link href="/admin/offers">Erbjudandehantering</Link></li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <LogOut size={24} className="cursor-pointer hover:scale-110 transition" onClick={logout} />
          </div>

          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="relative group">
              <img
                src={userData?.profilePicture || "/kino-card.jpg"}
                className="border-2 border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] rounded-full w-50 h-50 object-cover"
                alt="Profilbild"
              />

              {/* Desktop */}
              <label className="absolute bottom-2 right-2 hidden sm:block bg-black/60 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
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
                className="absolute bottom-2 left-2 hidden sm:block bg-black/60 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                title="Ta bort profilbild"
              >
                <Trash2 size={18} color="#f87171" />
              </button>

              {/* Mobile */}
              <div className="sm:hidden absolute bottom-2 right-2" ref={mobileMenuRef}>
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="bg-black/60 p-1 rounded-full"
                >
                  <MoreVertical size={18} color="#facc15" />
                </button>

                {showMobileMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-[#CDCDCD] rounded-md shadow-lg p-3 space-y-3 z-50 min-w-[160px]">
                    <label className="flex items-center gap-3 text-[#2b0404] cursor-pointer px-3 py-2 hover:bg-[#2b0404] hover:text-[#CDCDCD] rounded">
                      <Pencil size={18} />
                      <span className="whitespace-nowrap">Ändra bild</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={handleRemoveImage}
                      className="flex items-center gap-3 text-[#2b0404] px-3 py-2 cursor-pointer hover:bg-[#2b0404] hover:text-[#CDCDCD] rounded w-full justify-start"
                    >
                      <Trash2 size={18} />
                      <span className="whitespace-nowrap">Ta bort bild</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-yellow-400 text-center mt-4 mb-4">{userData?.name}</h2>
            <p className="text-[#CDCDCD] text-m font-bold text-center">{userData?.email}</p>
            <p className="mt-2 font-bold text-m text-[#CDCDCD] text-center">
              {`Medlemsnivå: ${userData?.role === 'user' ? 'Filmguru' : 'Admin'}`}
            </p>
          </div>
        </div>



        {/* Right Columns - Tickets and Offers */}
        <div className="items-center flex flex-col gap-6 w-full md:w-1/2 min-w-[300px] mr-5 ml-0 md:ml-0 h-full">
          {/* Tickets */}
          <div className="bg-[#2B0404] rounded-2xl border-1 border-yellow-400 shadow-xl p-6 w-full">
            <h3 className="text-xl font-bold text-[#CDCDCD]  pb-1 mb-4 flex justify-center items-center gap-2">
              <Ticket size={40} /> Dina Biljetter
            </h3>
            {booking.length === 0 ? (
              <p className="text-[#CDCDCD]">Inga bokningar hittades.</p>
            ) : (
              <ul className="space-y-4">
                {(showAllTickets ? sortedBookings : sortedBookings.slice(0, 2)).map((b) => {
                  const isExpanded = expandedTickets[b._id];
                  const formattedDate = new Date(b.screeningTime).toLocaleString("sv-SE", options);
                  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
                  return (
                    <li
                      key={b._id}
                      className="border-t border-dashed border-yellow-400 my-4 border border-yellow-400 rounded-xl p-4 bg-[#3B0C0C] shadow-md"
                    >
                      <div className="font-semibold mb-1 text-yellow-400 text-lg">
                        {b.movieId?.title || "Okänd film"}
                      </div>
                      <div className="flex items-center text-[#CDCDCD] text-sm mb-2">
                        <Calendar size={16} />
                        <span className="ml-1 font-medium">
                          <span className="ml-1 font-medium">{capitalizedDate}</span>
                        </span>
                      </div>

                      {isExpanded && (
                        <>
                          <div className="mt-2 text-sm text-[#CDCDCD] flex items-center gap-1">
                            <MapPin size={16} /> Salong:{" "}
                            <span className="ml-1 font-medium">{b.auditorium}</span>
                          </div>
                          <div className="mt-2 text-sm text-[#CDCDCD] flex items-center gap-1 flex-wrap">
                            <Armchair size={16} /> Platser:
                            {b.seats.map((seat, i) => (
                              <span
                                key={i}
                                className="ml-2 px-2 py-1 bg-[#2b0404] rounded text-[#CDCDCD]"
                              >
                                Rad {seat.row}, Stol {seat.seat}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 text-sm text-[#CDCDCD] flex items-center gap-1">
                            <Banknote size={16} /> Totalt: {b.totalPrice} kr
                          </div>
                        </>
                      )}

                      <button
                        onClick={() => toggleExpand(b._id)}
                        className="mt-0 hover:cursor-pointer text-sm font-medium text-yellow-400 hover:underline"
                      >
                        {isExpanded ? "Visa mindre" : "Se mer"}
                      </button>
                    </li>

                  );

                })}
              </ul>

            )}
            {booking.length > 2 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllTickets(!showAllTickets)}
                  className="text-sm hover:cursor-pointer font-semibold text-yellow-400 hover:underline"
                >
                  {showAllTickets ? "Visa färre biljetter" : "Se fler biljetter"}
                </button>
              </div>
            )}
          </div>

          {/* Offers */}
          <div className="border-4 border-yellow-400 rounded-xl p-4 bg-[#2b0404] shadow-lg relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-6 h-6 bg-[#2b0404] rounded-br-full border-t-4 border-l-4 border-yellow-400" />
            <div className="absolute top-0 right-0 w-6 h-6 bg-[#2b0404] rounded-bl-full border-t-4 border-r-4 border-yellow-400" />
            <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#2b0404] rounded-tr-full border-b-4 border-l-4 border-yellow-400" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#2b0404] rounded-tl-full border-b-4 border-r-4 border-yellow-400" />

            <h3 className="text-xl font-bold text-[#CDCDCD] mb-3 flex justify-center items-center gap-2">
              <Popcorn size={40} /> Veckans erbjudande
            </h3>
            <ul className="space-y-2 list-none ml-0 font-bold text-yellow-400 text-lg">
              {offers.length > 0 ? (
                offers.map((offer, index) => (
                  <li key={index}>{offer.text}</li>
                ))
              ) : (
                <li>Inga aktuella erbjudanden.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
