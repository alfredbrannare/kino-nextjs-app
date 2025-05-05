'use client';

export default function MembershipPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#2B0404]">
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center">
        
        <h1 className="text-xl font-semibold text-white mb-4">Aktuell medlemsnivå: Filmguru</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h3 className="text-4xl font-bold pb-4 text-center">Profilsida</h3>
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=150" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Namn</h2>
            <p className="text-lg text-gray-500">Telefonnummer</p>
            <p className="text-lg text-gray-500">E-mail</p>
            <p className="text-lg text-gray-500">Lösenord: ********</p>
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-400 pb-2">Dina Biljetter</h3>
            <ul className="space-y-4">
              <li className="text-gray-700">x2 Forrest Gump</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-400 pb-2">Veckans erbjudande</h3>
            <ul className="space-y-4">
              <li className="text-gray-700">2 små läsk för priset av en!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}