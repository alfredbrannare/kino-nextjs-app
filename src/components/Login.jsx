'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { X } from 'lucide-react';

const Login = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setOpen(false);
        router.push('/membership');
    };

    return (
        <div>
            <button
                className="btn bg-yellow-400 text-black hover:bg-yellow-300"
                onClick={() => setOpen(true)}
            >
                Logga in
            </button>

            {open && (
                <div className="modal modal-open">
                    <div className="modal-box relative  bg-[#2B0404] ">
                        <button
                            className="cursor-pointer absolute top-4 right-4 text-white hover:text-gray-300"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-lg font-bold text-gray-200">Inloggning</h3>

                        <form onSubmit={handleLogin} className="space-y-4 mt-4">
                            <div>
                                <label className="label text-gray-300">
                                    <span className="label-text text-gray-300">E-post eller telefonnummer</span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label text-gray-300">
                                    <span className="label-text text-gray-300">Lösenord</span>
                                </label>
                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn bg-yellow-400 text-black hover:bg-yellow-300">
                                    Logga in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;