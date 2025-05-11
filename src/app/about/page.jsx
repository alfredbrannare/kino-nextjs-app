'use client';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16 text-center">
        <div>
            <h1 className="ml-2 text-3xl font-bold text-[#CDCDCD] ">OM OSS</h1>
        </div>
        <div className="flex flex-col gap-6 px-4 py-8 bg-[#250303] p-6">
      <section className="pl-10 pr-10">
        <h2 className="text-2xl font-bold text-[#CDCDCD] mb-4">Din lokala biograf</h2>
        <p className="text-[#CDCDCD] leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sem sit amet nulla lacinia viverra. 
          Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta libero a malesuada fermentum. 
          Curabitur nec urna at felis lacinia volutpat non sit amet erat.
        </p>
      </section>
      </div>

            <div className="flex flex-col gap-6 px-4 py-8 bg-[#250303] p-6">
            <section className="pl-10 pr-10">
        <h2 className="text-2xl font-bold text-[#CDCDCD] mb-4">Annorlunda och unikt</h2>
        <p className="text-[#CDCDCD] leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sem sit amet nulla lacinia viverra. 
          Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta libero a malesuada fermentum. 
          Curabitur nec urna at felis lacinia volutpat non sit amet erat.
        </p>
      </section>
      </div>

      <section className="flex flex-col gap-6 px-4 py-8 bg-[#250303] p-6">
        <h3 className="text-2xl font-bold text-[#CDCDCD] mb-2">Kontaktinformation</h3>
        <p className="text-[#CDCDCD]">E-post: kino@uppsala.se</p>
        <p className="text-[#CDCDCD]">Telefon: 070-123 45 67</p>
        <p className="text-[#CDCDCD]">Adress: Uppsalagatan 1, 123 12 Uppsala</p>
      </section>
      </div>
  );
}