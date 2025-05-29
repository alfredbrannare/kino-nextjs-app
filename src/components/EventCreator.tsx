import { useState, useEffect, FC, FormEvent } from "react";

type EventToEditType = {
  _id: string;
  title?: string;
  time?: string;
  date?: string;
  image?: string;
  description?: string;
};

type Props = {
  setUpdate: (value: boolean) => void;
  setIsEditing: (value: boolean) => void;
  isEditing: boolean;
  eventToEdit: EventToEditType | null | undefined;
  clearEventToEdit: () => void;
};

const EventCreator: FC<Props> = ({
  setUpdate,
  setIsEditing,
  isEditing,
  eventToEdit,
  clearEventToEdit,
}) => {
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEditing && eventToEdit) {
      setEventId(eventToEdit._id);
      setTitle(eventToEdit.title || "");
      setTime(eventToEdit.time || "");
      setDate(eventToEdit.date ? eventToEdit.date.split("T")[0] : "");
      setImage(eventToEdit.image || "");

      setDescription(eventToEdit.description || "");
    } else {
      setEventId("");
      setTitle("");
      setTime("");
      setDate("");
      setImage("");
      setDescription("");
    }
  }, [isEditing, eventToEdit]);

  const handleSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const eventData = {
      title,
      date,
      time,
      image,
      description,
    };

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/events/${eventId}` : "/api/events";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(eventData),
      });

      const body = await response.json();
      if (response.ok) {
        setIsEditing(false);
        clearEventToEdit();
        setUpdate(true);
        alert(`${isEditing ? "Event updated" : "Event added"} successfully!`);
      } else {
        alert(`Error: ${body.message || response.statusText}`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} event:`, error);
      alert(
        `Error ${isEditing ? "updating" : "adding"} event. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    clearEventToEdit();
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
      onSubmit={handleSubmitEvent}
    >
      <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-2">
        <input
          className="input w-full p-2"
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
        <input
          className="input w-full p-2"
          type="time"
          placeholder="Tid"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
        <input
          className="input w-full p-2"
          type="date"
          placeholder="Datum"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-3 xl:col-span-4">
        <input
          className="input w-full p-2"
          type="text"
          placeholder="Bild länk"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div className="col-span-full md:col-span-2 lg:col-span-3 xl:col-span-4">
        <textarea
          className="input w-full p-2 text-white placeholder-gray-400 h-32"
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="col-span-full flex justify-center mt-4">
        {isEditing ? (
          <div>
            <button
              type="button"
              className="btn btn-warning mx-2"
              disabled={loading}
              onClick={handleCancelEdit}
            >
              {loading ? "Avbryter..." : "Avbryt"}
            </button>
            <button
              type="submit"
              className="btn btn-success mx-2"
              disabled={loading}
            >
              {loading ? "Uppdaterar..." : "Uppdatera"}
            </button>
          </div>
        ) : (
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Lägg till event..." : "Lägg till event"}
          </button>
        )}
      </div>
    </form>
  );
};

export default EventCreator;
