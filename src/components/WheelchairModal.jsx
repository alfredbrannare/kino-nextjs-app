'use client'

export default function WheelchairModal({ seat, onConfirm, onCancel }) {
    if (!seat) return null;

    return (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#2B0404] p-6 rounded-lg shadow-lg max-w-sm text-center space-y-4">
                <p className="text-white font-medium">
                    Detta är en plats för rörelsehindrade.<br />
                    Är du säker på att du vill boka denna plats?
                </p>
                <div className="flex justify-center gap-20">
                    <button
                        className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 cursor-pointer"
                        onClick={onConfirm}
                    >
                        Ja
                    </button>
                    <button
                        className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 cursor-pointer"
                        onClick={onCancel}
                    >
                        Nej
                    </button>
                </div>
            </div>
        </div>
    );
}