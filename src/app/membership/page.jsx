'use client';

import { useAuth } from "src/components/user/AuthData"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, LockKeyhole  } from 'lucide-react';
import Link from "next/link";

export default function MembershipPage() {
  const { userData, isLoggedIn, isLoading, loading, logout, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || loading) return <p>Loading page data...</p>;
  if (!isLoggedIn) return <p>Access Denied. You are not authorized to view this page.</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#2B0404] md:flex-row space-x-6">
      <div>

        <h1 className="text-xl font-semibold text-white mb-4">{`Aktuell medlemsnivå: ${userData?.role}`}</h1>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
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

          <div className="flex space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-xl text-black font-semibold mb-4 border-b border-gray-400 pb-2">Dina Biljetter</h3>
              <ul className="space-y-4">
                <li className="text-gray-700">x2 Forrest Gump</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-black text-xl font-semibold mb-4 border-b border-gray-400 pb-2">Veckans erbjudande</h3>
              <ul className="space-y-4">
                <li className="text-gray-700">2 små läsk för priset av en!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}