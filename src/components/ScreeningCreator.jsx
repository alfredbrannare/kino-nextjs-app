import { useState } from "react";
import { DayPicker } from "react-day-picker";

const ScreeningCreator = ({ setUpdate }) => {
  const [id, setId] = useState('');
  const [idS, setIdS] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();

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
        body: JSON.stringify({ movieId: id, auditoriumId: idS, startTime:date}),
      });

      if (response.ok) {
        setId('');
        alert('Screening is added successfully!')
        setUpdate(true);
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
      </div>

      <input
        className="input"
        type="text"
        placeholder="Screening id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
            <input
        className="input"
        type="text"
        placeholder="Sal id"
        value={idS}
        onChange={(e) => setIdS(e.target.value)}
      /> <br />
      <button className="btn" onClick={addFilm} disabled={loading}>
        {loading ? 'Adding film...' : 'Add film'}
      </button>
    </div>
  );
};

export default ScreeningCreator;