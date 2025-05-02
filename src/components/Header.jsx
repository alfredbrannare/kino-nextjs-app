import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header>
      <nav class="navbar bg-base-100 shadow-sm py-5">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabIndex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul class="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" href='/'>
            <Image
              src="/kino-logo.png"
              alt="Kino Uppsala Logo"
              width={150}
              height={80}
            />
          </Link>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li><Link href='/movies'>Movies</Link></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul class="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div class="navbar-end">
          <a className="btn btn-primary-muted">Custom Button</a>
        </div>
      </nav>
    </header>
  )
}

export default Header;