import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";

const ScreeningCreator = ({ setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [screenings, setScreenings] = useState([]);
  const [selectedScreenings, setSelectedScreenings] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchScreenings = async () => {
      const res = await fetch("/api/auditoriums");
      const data = await res.json();
      setScreenings(data);
    };

    fetchScreenings();
  }, []);

  const addFilm = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/screenings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId: selectedMovie, auditoriumId: selectedScreenings, startTime: date }),
      });
      console.log(response)
      if (response.ok) {
        alert('Screening added successfully!')
        setUpdate(true);
        setSelectedMovie('');
        setDate(undefined);
      } else {
        alert('Error while adding screening');
      }
    } catch (err) {
      console.log('Screening is not found', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-10 text-center">
      <button popoverTarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" }}>
        {date ? date.toLocaleDateString() : "Pick a date"}
      </button>
      <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" }}>
        <DayPicker className="react-day-picker" mode="single" selected={date} onSelect={setDate} />
      </div><br />

      <select
        className="select select-bordered"
        value={selectedMovie}
        onChange={(e) => setSelectedMovie(e.target.value)}
      >
        <option value="">
          -- Välj film --
        </option>
        {movies.map((movie) => (
          <option key={movie._id} value={movie._id}>
            {movie.title}
          </option>
        ))}
      </select>
      <br />
      <select
        className="select select-bordered"
        value={selectedScreenings}
        onChange={(e) => setSelectedScreenings(e.target.value)}
      >
        <option value="">
          -- Välj salong --
        </option>
        {screenings.map((screening) => (
             <option key={screening._id} value={screening._id}>
             {screening.name}
             </option>
        ))}
      </select>
      <br />
      <button className="btn" onClick={addFilm} disabled={loading}>
        {loading ? 'Adding film...' : 'Add film'}
      </button>
    </div>
  );
};

export default ScreeningCreator;