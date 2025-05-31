import ErrorMessage from '@/components/ErrorMessage';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <ErrorMessage error='404 - Sidan Hittades Inte' />
      <Link href="/">
        Gå tillbaka till startsidan
      </Link>
    </div>
  );
}