import { useState, } from "react";

const EventCreator = ({ setUpdate }) => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [genre, setGenre] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');

    const addFilm = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/events/live', {
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
                alert(`Live event is added successfully !br / ${JSON.stringify(body.event)}}`)
                setUpdate(true);
            } else {
                alert(`${body.status}`);
            }
        } catch (err) {
            console.log('Live event is not found', err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-2">
                <input
                    className="input w-full p-2"
                    type="text"
                    placeholder="Titel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
                <input
                    className="input w-full p-2"
                    type="time"
                    placeholder="Beskrivning"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
                <input
                    className="input w-full p-2"
                    type="date"
                    placeholder="Beskrivning"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-2">
                <input
                    className="input w-full p-2"
                    type="text"
                    placeholder="Bild länk"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
                <input
                    className="input w-full p-2"
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
            </div>
            <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
                <input
                    className="input w-full p-2"
                    type="number"
                    placeholder="Längd (minuter)"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div className="col-span-full md:col-span-2 lg:col-span-3 xl:col-span-4">
                <textarea
                    className="input w-full p-2 text-white placeholder-gray-400 h-32"
                    placeholder="Beskrivning"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="col-span-full flex justify-center mt-4">
                <button className="btn" onClick={addFilm} disabled={loading}>
                    {loading ? 'Lägg till event...' : 'Lägg till event'}
                </button>
            </div>
        </div>
    );
};

export default EventCreator;