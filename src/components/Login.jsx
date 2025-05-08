'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { X } from 'lucide-react';

const Login = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        const response = await fetch('/api/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            setOpen(false);
            setLoading(false);
        }
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className={`btn bg-yellow-400 text-black hover:bg-yellow-300 ${loading ? 'loading' : ''}`}>
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