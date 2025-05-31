'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventsTabs from '@/components/events/EventsTabs';
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';
import { EventType } from '@/ts/types';
import ErrorMessage from '@/components/ErrorMessage';

export default function EventsPageContent() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [liveEvents, setLiveEvents] = useState<EventType[]>([]);
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'tab1';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'tab1', label: 'Live på Kino' },
    { id: 'tab2', label: 'Evenemang' },
  ];

  useEffect(() => {
    Promise.all([
      fetch('/api/events').then((res) => res.json() as Promise<EventType[]>),
      fetch('/api/events/live').then(
        (res) => res.json() as Promise<EventType[]>,
      ),
    ])
      .then(([eventData, liveEventData]) => {
        setEvents(eventData || []);
        setLiveEvents(liveEventData || []);
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
        setEvents([]);
        setLiveEvents([]);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setError('Vi har för tillfället problem med att hämta evenemang');
        setLoading(false);
      });
  }, []);

  const currentEvents = activeTab === 'tab1' ? liveEvents : events;

  return (
    <div className='flex flex-col'>
      <EventsTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className='max-w-5xl mx-auto px-6 py-12 space-y-12'>
        <h1 className='text-4xl font-bold text-[#CDCDCD] mb-8 text-center'>
          {activeTab === 'tab1' ? 'Live på Kino' : 'Kommande Evenemang'}
        </h1>
        <div
          role='tabpanel'
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage error={error} />
          ) : (
            <div className='space-y-10' aria-labelledby='evenemang-titlar'>
              {currentEvents.map((event, index) => (
                <div
                  key={event._id || index}
                  className='p-6 border border-yellow-400 rounded-xl shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] hover:shadow-[inset_0_0_12px_#fde047,0_0_25px_#fde047] hover:scale-[1.01] transition transform duration-200'
                >
                  <div className='relative w-full h-60'>
                    {' '}
                    {}
                    <Image
                      src={event.image}
                      alt={`Omslag för eventet ${event.title}`}
                      layout='fill'
                      objectFit='cover'
                      className='rounded-lg'
                    />
                  </div>
                  <h2 className='text-2xl pt-4 font-semibold text-[#CDCDCD]'>
                    {event.title}
                  </h2>
                  {event.runtime && (
                    <p className='text-md font-semibold text-[#CDCDCD]'>
                      {Math.floor(event.runtime / 60)} timmar och{' '}
                      {event.runtime % 60} minuter
                    </p>
                  )}
                  <p className='text-[#CDCDCD] mt-2 mb-2'>
                    {event.date} kl {event.time}
                  </p>
                  <p className='text-[#CDCDCD] mb-4 text-l'>
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
