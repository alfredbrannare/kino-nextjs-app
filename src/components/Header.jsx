'use client';
import Link from 'next/link';
import Image from 'next/image';
import Login from './Login';
import './header.css'
import { useAuth } from './user/AuthData';

const Header = () => {
  const { isLoggedIn, isLoading, logout, isAdmin } = useAuth();

  return (
    <header>
      <nav className="navbar bg-[#2B0404] shadow-sm py-5 px-4">
        <div className="navbar-start text-[#CDCDCD]">
          <div className="dropdown custom-sm:hidden">
            <div tabIndex="0" role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-[#2B0404] text-[#CDCDCD] rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li><Link href="/tickets" className="text-lg font-bold">BILJETTER</Link></li>
              <li><Link href="/events" className="text-lg font-bold">EVENEMANG</Link></li>
              <li><Link href="/movies" className="text-lg font-bold">FILMER</Link></li>
              <li><Link href="/about" className="text-lg font-bold">OM OSS</Link></li>
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
            <li><Link href="/tickets" className="text-lg font-bold hover:scale-110 hover:text-white px-1 rounded-sm transition-transform duration-200 ease-in-out text-[#CDCDCD]">BILJETTER</Link></li>
            <li><Link href="/events" className="text-lg font-bold hover:scale-110 hover:text-white px-1 rounded-sm transition-transform duration-200 ease-in-out text-[#CDCDCD]">EVENEMANG</Link></li>
            <li><Link href="/movies" className="text-lg font-bold hover:scale-110 hover:text-white px-1 rounded-sm transition-transform duration-200 ease-in-out text-[#CDCDCD]">FILMER</Link></li>
            <li><Link href="/about" className="text-lg font-bold hover:scale-110 hover:text-white px-1 rounded-sm transition-transform duration-200 ease-in-out text-[#CDCDCD]">OM OSS</Link></li>
          </ul>
        </div>

        <div className="navbar-end">
          {isLoading ? (
            <span className="loading"></span>
          ) : !isLoggedIn ? (
            <Login />
          ) : (
            <button onClick={logout} className="btn btn-ghost">Logout</button>
          )}
        </div>
        {/* Admin panel */}
        {!isLoading && isAdmin ? <div className="dropdown custom-sm ml-4">
          <div tabIndex="0" role="button" className="btn btn-ghost">
            <button className="btn btn-primary">
              Admin
            </button>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-[#2B0404] text-[#CDCDCD] rounded-box z-10 mt-3 w-auto p-2 shadow">
            <li><Link href="/admin/movies" className="text-lg font-bold">Lägg till film</Link></li>
            <li><Link href="/admin/screenings" className="text-lg font-bold">Lägg till visning</Link></li>
          </ul>
        </div> : null}
        {/* END */}
      </nav>
    </header>
  )
}

export default Header;