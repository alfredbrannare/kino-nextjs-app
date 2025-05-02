import { useState } from "react";

const MovieCreator = ({ setUpdate }) => {
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
        alert('Film is added successfully!')
        setUpdate(true);
      }else{
        alert('Error while adding film');
      }
    } catch (err) {
      console.log('Movie is not found', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <input
      className="input"
        type="text"
        placeholder="IMDb id (tt512332)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
      className="input"
        type="password"
        placeholder="Secret key"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <button className="btn" onClick={addFilm} disabled={loading}>
        {loading ? 'Adding film...' : 'Add film'}
      </button>
    </>
  );
};

export default MovieCreator;