"use client"

import { useState, useEffect, CSSProperties } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bannerCookie = localStorage.getItem('COOKIE_BANNER_ACKNOWLEDGED');
    if (!bannerCookie) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('COOKIE_BANNER_ACKNOWLEDGED', 'true');
      setIsVisible(false);
    } catch {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div style={styles.banner}>
      <p style={styles.text}>
        Vi använder nödvändiga cookies för att säkerställa att webbplatsen fungerar.
        För närvarande är webbplatsen under utveckling och all användardata kommer att raderas vid lanseringen.
        Genom att klicka på &quot;Acceptera&quot; godkänner du detta.
      </p>
      <button onClick={handleAccept} style={styles.button}>
        Acceptera
      </button>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  banner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: 'white',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    fontSize: '0.9rem',
    flexWrap: 'wrap',
    gap: '10px',
  },
  text: {
    margin: 0,
    flexGrow: 1,
    marginRight: '15px',
  },
  link: {
    color: '#aaccff',
    textDecoration: 'underline',
    marginLeft: '10px',
  },
  button: {
    padding: '8px 15px',
    backgroundColor: '#fff',
    color: '#333',
    border: 'none',
    borderRadius: 'var(--radius-small, 3px)',
    cursor: 'pointer',
    fontWeight: 'bold',
    flexShrink: 0,
  }
};

export default CookieBanner;
