import { useState, } from "react";

const EventCreator = ({ setUpdate }) => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className="pt-10 text-center flex flex-wrap justify-center">
            <input
                className="input mx-1 my-1"
                type="text"
                placeholder="Titel"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                className="input mx-1 my-1"
                type="time"
                placeholder="Beskrivning"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                className="input mx-1 my-1"
                type="date"
                placeholder="Beskrivning"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                className="input mx-1 my-1"
                type="text"
                placeholder="Bild länk"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                className="input mx-1 my-1"
                type="text"
                placeholder="Genre"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                className="input mx-1 my-1"
                type="number"
                placeholder="Längd (minuter)"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <textarea
                className="input mx-1 my-1"
                placeholder="Beskrivning"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button className="btn" onClick={addFilm} disabled={loading}>
                {loading ? 'Lägg till event...' : 'Lägg till event'}
            </button>
        </div>
    );
};

export default EventCreator;