'use client';

import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    { id: "tab1", label: "Live på Kino" },
    { id: "tab2", label: "Evenemang" },
  ];

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="flex flex-col">
      <div role="tablist" className="tabs tabs-lift tabs-xl justify-center">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            role="tab"
            className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >{tab.label}</a>
        ))}
      </div>

      {activeTab === "tab1" && (
        <h1>Jumpscare</h1>
      )}

      {activeTab === "tab2" && (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          <h1 className="text-4xl font-bold text-[#CDCDCD] mb-8 text-center">Kommande Evenemang</h1>

          <div className="space-y-10">
            {events.map((event, index) => (
              <div key={index} className="p-6 border border-yellow-400 rounded-xl shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] hover:shadow-[inset_0_0_12px_#fde047,0_0_25px_#fde047] hover:scale-[1.01] transition transform duration-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h2 className="text-2xl pt-4 font-semibold text-[#CDCDCD]">{event.title}</h2>
                <p className="text-[#CDCDCD] mt-2 mb-2">{event.date} kl {event.time}</p>
                <p className="text-[#CDCDCD] mb-4 text-l">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}