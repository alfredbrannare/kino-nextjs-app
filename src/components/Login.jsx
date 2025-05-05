'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      <button className="btn" onClick={() => setOpen(true)}>Login</button>

      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Login</h3>
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" className="input input-bordered w-full" />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn" onClick={() => setOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;