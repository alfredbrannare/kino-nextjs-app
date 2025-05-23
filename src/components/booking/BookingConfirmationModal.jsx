'use client'

const ticketTypeLabels = {
    ordinary: "Ordinarie",
    child: "Barn",
    retired: "Pensionär",
    student: "Student",
    member: "Medlem"
};

export default function BookingConfirmationModal({
    visible,
    seats,
    movieTitle,
    screeningTime,
    ticketInfo,
    totalPrice,
    onClose
}) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-black">
                <h2 className="text-xl font-semibold mb-4">Bokning bekräftad!</h2>

                <p className="mb-1"><strong>Film:</strong> {movieTitle}</p>
                <p className="mb-1"><strong>Visningstid:</strong> {new Date(screeningTime).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}</p>

                <p className="mt-4 font-semibold">Valda platser:</p>
                <ul className="list-disc list-inside mb-4">
                    {seats.map((s, i) => (
                        <li key={i}>Rad {s.row}, Stol {s.seat}</li>
                    ))}
                </ul>

                <p className="font-semibold">Biljetter:</p>
                <ul className="list-disc list-inside mb-4">
                    {Object.entries(ticketInfo)
                        .filter(([_, count]) => count > 0)
                        .map(([type, count]) => (
                            <li key={type}>
                                {ticketTypeLabels[type] || type}: {count}
                            </li>
                        ))}
                </ul>

                <p className="mb-4"><strong>Totalt pris:</strong> {totalPrice.toFixed(0)} kr</p>

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded"
                >
                    Stäng
                </button>
            </div>
        </div>
    );
}