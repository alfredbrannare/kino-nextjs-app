import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Sidan Hittades Inte</h1>
      <p>Ursäkta, sidan du letar efter finns inte.</p>
      <Link href="/">
        Gå tillbaka till startsidan
      </Link>
    </div>
  );
}