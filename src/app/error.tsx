'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="sv">
      <body>
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
          <h2>Något gick fel!</h2>
          <p>Ett oväntat fel har inträffat. Försök igen.</p>
          <button onClick={() => reset()} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Försök igen
          </button>
        </div>
      </body>
    </html>
  );
}