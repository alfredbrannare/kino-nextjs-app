import { useState, useEffect, FC, ChangeEvent } from 'react';
import { DayPicker } from 'react-day-picker';
import { TimePicker } from 'react-accessible-time-picker';

type MovieForSelect = {
  _id: string;
  title: string;
};

type AuditoriumForSelect = {
  _id: string;
  name: string;
};

type SelectedTimeType = {
  hour: string;
  minute: string;
};

type Props = {
  setUpdate: (value: boolean) => void;
};

const ScreeningCreator: FC<Props> = ({ setUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<SelectedTimeType>({
    hour: '12',
    minute: '00',
  }); // Use strings
  const [movies, setMovies] = useState<MovieForSelect[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [auditoriums, setAuditoriums] = useState<AuditoriumForSelect[]>([]);
  const [selectedAuditorium, setSelectedAuditorium] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/movies');
      const data: MovieForSelect[] = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchAuditoriums = async () => {
      const res = await fetch('/api/auditoriums');
      const data: AuditoriumForSelect[] = await res.json();
      setAuditoriums(data);
    };
    fetchAuditoriums();
  }, []);

  const addFilm = async () => {
    setLoading(true);
    let combinedDateTime;
    if (selectedDate && selectedTime) {
      combinedDateTime = new Date(selectedDate);
      // Parse string hours and minutes to numbers before setting
      const hour = parseInt(selectedTime.hour, 10);
      const minute = parseInt(selectedTime.minute, 10);
      if (isNaN(hour) || isNaN(minute)) {
        // Basic validation
        alert('Invalid time selected.');
        setLoading(false);
        return;
      }
      combinedDateTime.setHours(hour, minute, 0, 0);
    } else {
      alert('Please select a date and time.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/screenings/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          movieId: selectedMovie,
          auditoriumId: selectedAuditorium,
          startTime: combinedDateTime,
        }),
      });
      const body = await response.json();
      if (response.ok) {
        alert('Screening added successfully!');
        setUpdate(true);
        setSelectedMovie('');
        setSelectedAuditorium('');
        setSelectedDate(undefined);
        setSelectedTime({ hour: '12', minute: '00' });
      } else {
        alert(`${body.status}`);
      }
    } catch (err) {
      console.log('Screening is not found', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='pt-10 text-center'>
      <div className='flex justify-center items-center'>
        <button
          popoverTarget='rdp-popover'
          className='input input-border w-51'
          style={{ anchorName: '--rdp' }}
        >
          {selectedDate
            ? selectedDate.toLocaleDateString('sv-SE')
            : 'Välj datum'}
        </button>
        <div
          popover='auto'
          id='rdp-popover'
          className='dropdown'
          style={{ positionAnchor: '--rdp' }}
        >
          <DayPicker
            className='react-day-picker'
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
        <div>
          <TimePicker value={selectedTime} onChange={setSelectedTime} />
        </div>
      </div>

      <select
        className='select select-bordered'
        value={selectedMovie}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedMovie(e.target.value)
        }
      >
        <option value=''>-- Välj film --</option>
        {movies.map((movie: MovieForSelect) => (
          <option key={movie._id} value={movie._id}>
            {movie.title}
          </option>
        ))}
      </select>
      <br />
      <select
        className='select select-bordered'
        value={selectedAuditorium}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedAuditorium(e.target.value)
        }
      >
        <option value=''>-- Välj salong --</option>
        {auditoriums.map((auditorium: AuditoriumForSelect) => (
          <option key={auditorium._id} value={auditorium._id}>
            {auditorium.name}
          </option>
        ))}
      </select>
      <br />
      <button className='btn' onClick={addFilm} disabled={loading}>
        {loading ? 'Ny visning...' : 'Ny visning'}
      </button>
    </div>
  );
};

export default ScreeningCreator;
