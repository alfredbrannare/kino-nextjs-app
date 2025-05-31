'use client';

import Link from 'next/link';
import Image from 'next/image';
import Login from './Login';
import { useAuth } from './user/AuthData';
import { UserRound, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname() || '';
  const { isLoggedIn, logout, isLoading, userData } = useAuth();
  return (
    <header>
      <nav className="navbar bg-[#2B0404] shadow-sm py-5 px-4">
        <div className="header-container w-full max-w-[1280px] mx-auto flex justify-between items-center">
          <div className="navbar-start text-[#CDCDCD]">
            <div className="dropdown custom-sm:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost" aria-label="Menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#2B0404] text-[#CDCDCD] rounded-box z-10 mt-3 w-52 p-2 shadow">
                <li><Link
                  href="/tickets"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/tickets' ? 'text-yellow-400' : 'text-[#CDCDCD]'
                    }`}
                >
                  BILJETTER
                </Link></li>

                <li><Link
                  href="/events"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/events' ? 'text-yellow-400' : 'text-[#CDCDCD]'
                    }`}
                >
                  EVENEMANG
                </Link></li>
                <li><Link
                  href="/movies"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/movies' ? 'text-yellow-400' : 'text-[#CDCDCD]'
                    }`}
                >
                  FILMER
                </Link></li>
                <li><Link
                  href="/about"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/about' ? 'text-yellow-400' : 'text-[#CDCDCD]'
                    }`}
                >
                  OM OSS
                </Link></li>
              </ul>
            </div>

            <Link href='/'>
              <Image
                src="/kino-logo.png"
                alt="Kino Uppsala Logo"
                width={150}
                height={80}
              />
            </Link>
          </div>

          <div className="navbar-center hidden custom-sm:flex justify-center text-[#CDCDCD]">
            <ul className="flex gap-8">
              <li>
                <Link
                  href="/tickets"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/tickets' ? 'text-yellow-400 scale-110' : 'text-[#CDCDCD]'
                    }`}
                >
                  BILJETTER
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/events' ? 'text-yellow-400 scale-110' : 'text-[#CDCDCD]'
                    }`}
                >
                  EVENEMANG
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/movies' ? 'text-yellow-400 scale-110' : 'text-[#CDCDCD]'
                    }`}
                >
                  FILMER
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`text-lg font-bold hover:scale-110 px-1 rounded-sm transition-transform duration-200 ease-in-out ${pathname === '/about' ? 'text-yellow-400 scale-110' : 'text-[#CDCDCD]'
                    }`}
                >
                  OM OSS
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end flex items-center space-x-4 mr-6">
            {isLoading ? (
              <span className="loading"></span>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/membership"
                  className="flex items-center gap-2 text-yellow-400 hover:text-white transition-transform hover:scale-110"
                >
                  <span className="font-semibold text-sm">
                    {userData?.name || userData?.email || 'Medlem'}
                  </span>
                  <UserRound size={24} />
                </Link>
                <button
                  onClick={logout}
                  className="text-[#CDCDCD] hover:cursor-pointer hover:text-red-400 transition-transform hover:scale-110"
                  aria-label="Logga ut"
                  title="Logga ut"
                >
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;