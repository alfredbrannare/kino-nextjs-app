import { useState,} from "react";

const MovieCreator = ({ setUpdate }) => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const addFilm = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id || '' }),
      });
      const body = await response.json();
      if (response.ok) {
        setId('');
        alert(`Film is added successfully !br / ${JSON.stringify(body.movie)}}`)
        setUpdate(true);
      }else{
        alert(`${body.status}`);
      }
    } catch (err) {
      console.log('Movie is not found', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-10 text-center">
      <input
      className="input"
        type="text"
        placeholder="IMDb id (tt512332)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button className="btn" onClick={addFilm} disabled={loading}>
        {loading ? 'Ny film...' : 'Ny film'}
      </button>
    </div>
  );
};

export default MovieCreator;