'use client'

export default function BookingConfirmationModal({ visible, seats, onClose }) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-black">
                <h2 className="text-xl font-semibold mb-4">Bokning bekräftad!</h2>
                <p className="mb-2">Du har bokat följande platser:</p>
                <ul className="list-disc list-inside mb-4">
                    {seats.map((s, i) => (
                        <li key={i}>Rad {s.row}, Stol {s.seat}</li>
                    ))}
                </ul>
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