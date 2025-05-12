'use client';

export default function Events() {
  const events = [
    {
      title: "Star Wars Maraton",
      date: "2025-07-01",
      time: "08:00",
      description: "Se alla Star Wars filmer tillsammans med andra entusiaster. I priset ingår frukost-, lunch- och middagsbuffé samt obegränsat med läsk, popcorn och hot snacks.",
        image: "/StarWars.png"
    },
    {
      title: "Filmcirkel",
      date: "2025-07-15",
      time: "12:00",
      description: "Kom och titta på Fight Club tillsammans med andra fans. Därefter träffas vi för att diskutera filmen över en kopp kaffe och donuts.",
        image: "/FightClub.png"
    },
    {
      title: "Familjedag med Paw Patrol-tema",
      date: "2025-07-20",
      time: "13:00",
      description: "Paw Patrol, popcorn och pyssel efter temat. Perfekt för hela familjen.",
        image: "/PawPatrol.png"
    },
  ];

  return (
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
  );
}