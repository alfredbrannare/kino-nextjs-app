import Link from 'next/link';
const Header = () => {
  return (
    <header>
      <h1>Kino bio</h1>
      <nav>
      <Link href='/'>Home</Link>
      <Link href='/movies'>Movies</Link>
      </nav>
    </header>
  )
}

export default Header;