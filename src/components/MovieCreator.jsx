import { useState } from "react";

const MovieCreator = () => {
  const [id, setId] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);

  const addFilm = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret || ''}`,
        },
        body: JSON.stringify({ id: id || '' }),
      });
      const data = await response.json();

      if (response.ok) {
        setId('');
        setSecret('');
        alert('Film is added successfully!')
      }
    } catch (err) {
      console.log('Movie is not found', err);
    } finally {
      setLoading(false);
      alert('Error while adding film')
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="IMDb id (tt512332)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="password"
        placeholder="Secret key"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <button onClick={addFilm} disabled={loading}>
        {loading ? 'Adding film...' : 'Add film'}
      </button>
    </>
  );
};

export default MovieCreator;