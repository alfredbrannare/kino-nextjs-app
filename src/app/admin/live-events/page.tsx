'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/user/AuthData';
import { useRouter } from 'next/navigation';
import AdminTabs from '@/components/AdminTabs';
import LiveEventCreator from '@/components/LiveEventCreator';
import { SquarePen } from 'lucide-react';
import { AuthContextType, EventType, LiveEventToEditType } from '@/ts/types';

const LiveEventsPage = () => {
  const [liveEvents, setLiveEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>('');
  const {
    isLoggedIn,
    isAdmin,
    isLoading: isAuthLoading,
  } = useAuth() as AuthContextType;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<LiveEventToEditType | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading) {
      if (!isAdmin) {
        router.push('/');
      }
    }
  }, [isLoggedIn, isAdmin, isAuthLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/events/live');
        const data = await res.json();
        setLiveEvents(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setUpdate(false);
  }, [update]);

  const deleteLiveEvent = async (id: string) => {
    try {
      await fetch(`/api/events/live/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error deleting live event:', error);
    } finally {
      setUpdate(true);
    }
  };

  const handleEditClick = (event: EventType) => {
    setIsEditing(true);
    const transformedEvent: LiveEventToEditType = {
      _id: event._id,
      title: event.title,
      time: event.time,
      date: event.date,
      image: event.image,
      runtime:
        event.runtime !== undefined ? event.runtime.toString() : undefined,
      description: event.description,
    };
    setEventToEdit(transformedEvent);
  };

  if (isAuthLoading || loading) return <p>Loading page data...</p>;
  if (!isAdmin)
    return <p>Access Denied. You are not authorized to view this page.</p>;

  const filteredLiveEvents = liveEvents.filter((event) => {
    if (!inputSearch) return true;

    const eventTitle = event.title?.toLowerCase() || '';
    return eventTitle.includes(inputSearch.toLowerCase());
  });

  return (
    <>
      <div className='p-6'>
        <AdminTabs />
        <LiveEventCreator
          setUpdate={setUpdate}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          eventToEdit={eventToEdit}
          clearEventToEdit={() => setEventToEdit(null)}
        />

        <input
          type='text'
          className='input block mx-auto mt-10'
          placeholder='Sök'
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />

        <h1 className='italic font-semibold text-3xl text-center pt-10'>
          Live Events:
        </h1>
        <br />
        {filteredLiveEvents.map((event) => (
          <div
            key={event._id}
            className='block mx-auto p-4 mb-3 bg-base-300 flex justify-between max-w-200 '
          >
            <h2 className=''>{event.title}</h2>
            <div>
              <span
                className='btn btn-warning mr-1'
                onClick={() => handleEditClick(event)}
              >
                Edit
                <SquarePen />
              </span>

              <button
                onClick={() => deleteLiveEvent(event._id)}
                className='btn btn-error'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LiveEventsPage;
