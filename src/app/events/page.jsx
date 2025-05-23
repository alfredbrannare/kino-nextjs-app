'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventsTabs from "src/components/events/EventsTabs";
import EventCardSkeleton from "src/components/events/MovieCardSkeleton";
import LoadingSpinner from "src/components/LoadingSpinner";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'tab1';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "tab1", label: "Live på Kino" },
    { id: "tab2", label: "Evenemang" },
  ];

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch("/api/events/live")
      .then((res) => res.json())
      .then((data) => setLiveEvents(data));
    setLoading(false);
  }, []);

  const currentEvents = activeTab === "tab1" ? liveEvents : events;
  const currentTitle = activeTab === "tab1" ? "Live på Kino" : "Kommande Evenemang";

  return (
    <div className="flex flex-col">
      <div role="tablist" className="tabs tabs-lift tabs-xl justify-center">
        <EventsTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        ></EventsTabs>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <h1 className="text-4xl font-bold text-[#CDCDCD] mb-8 text-center">{currentTitle}</h1>

        <div className="space-y-10">
          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : currentEvents.map((event, index) => (
            <div key={index} className="p-6 border border-yellow-400 rounded-xl shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] hover:shadow-[inset_0_0_12px_#fde047,0_0_25px_#fde047] hover:scale-[1.01] transition transform duration-200">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-60 object-cover rounded-lg"
              />
              <h2 className="text-2xl pt-4 font-semibold text-[#CDCDCD]">{event.title}</h2>
              {event.runtime ? <p className="text-md font-semibold text-[#CDCDCD]">
                {Math.floor(event.runtime / 60)} timmar och {event.runtime % 60} minuter
              </p> : <p></p>}
              <p className="text-[#CDCDCD] mt-2 mb-2">{event.date} kl {event.time}</p>
              <p className="text-[#CDCDCD] mb-4 text-l">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}