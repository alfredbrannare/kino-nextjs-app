import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { TimePicker } from 'react-accessible-time-picker';

const ScreeningCreator = ({ setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0 });
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
    let combinedDateTime;
    if (selectedDate && selectedTime) {
      combinedDateTime = new Date(selectedDate);
      combinedDateTime.setHours(selectedTime.hour, selectedTime.minute, 0, 0);
    } else {
      alert("Please select a date and time.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/screenings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId: selectedMovie, auditoriumId: selectedScreenings, startTime: combinedDateTime }),
      });
      console.log(response)
      if (response.ok) {
        alert('Screening added successfully!')
        setUpdate(true);
        setSelectedMovie('');
        setSelectedDate(undefined);
        setSelectedTime({ hour: 12, minute: 0 });
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
      <div className="flex justify-center items-center">
        <button popoverTarget="rdp-popover" className="input input-border w-51" style={{ anchorName: "--rdp" }}>
          {selectedDate ? selectedDate.toLocaleDateString('sv-SE') : "Välj datum"}
        </button>
        <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" }}>
          <DayPicker className="react-day-picker" mode="single" selected={selectedDate} onSelect={setSelectedDate} />
        </div>
        <div>
        <TimePicker
          value={selectedTime}
          onChange={setSelectedTime}
        />
        </div>
      </div>

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