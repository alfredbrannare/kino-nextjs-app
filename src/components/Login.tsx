'use client';
import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useAuth } from './user/AuthData';
import { AuthContextType } from '@/ts/types';

const Login = () => {
  const { login, loading } = useAuth() as AuthContextType;
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status) {
      login(data.user);
      setOpen(false);
      setEmail('');
      setPassword('');
      window.location.reload();
      setResponseMsg(data.message);
    } else {
      setResponseMsg(data.message);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, name, password, passwordRepeat }),
    });
    const data = await response.json();
    if (data) {
      login(data.user);
      setOpen(false);
      setIsLogin(true);
      setEmail('');
      setPassword('');
      window.location.reload();
      setResponseMsg(data.message);
    } else {
      setResponseMsg(data.message);
    }
  };

  return (
    <div>
      <button
        className='btn bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-300 '
        onClick={() => setOpen(true)}
      >
        Logga in
      </button>
      {/* LOGIN */}
      {open && isLogin && (
        <div className='modal modal-open'>
          <div className='modal-box relative  bg-[#2B0404] '>
            <button
              className='cursor-pointer absolute top-4 right-4 text-white hover:text-gray-300'
              onClick={() => {
                setOpen(false);
                setIsLogin(true);
              }}
              aria-label='Close'
            >
              <X size={24} />
            </button>

            <h3 className='text-lg font-bold text-gray-200'>Inloggning</h3>

            <form onSubmit={handleLogin} className='space-y-4 mt-4'>
              <div>
                <label className='label text-gray-300'>
                  <span className='label-text text-gray-300'>E-post</span>
                </label>
                <input
                  type='email'
                  className='input input-bordered w-full'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div>
                <label className='label text-gray-300'>
                  <span className='label-text text-gray-300'>Lösenord</span>
                </label>
                <input
                  type='password'
                  className='input input-bordered w-full'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <span className='text-red-600'>{responseMsg}</span>
              <div className='modal-action'>
                <button
                  type='submit'
                  className={`btn bg-yellow-400 text-black hover:bg-yellow-300 ${loading ? 'loading' : null}`}
                >
                  Logga in
                </button>
              </div>
              <span
                onClick={() => setIsLogin(false)}
                className={'cursor-pointer hover:font-bold'}
              >
                Inte medlem?{' '}
                <span className='text-yellow-400'>Registrera dig här!</span>
              </span>
            </form>
          </div>
        </div>
      )}
      {/* REGISTER */}
      {open && !isLogin && (
        <div className='modal modal-open'>
          <div className='modal-box relative  bg-[#2B0404] '>
            <button
              className='cursor-pointer absolute top-4 right-4 text-white hover:text-gray-300'
              onClick={() => {
                setOpen(false);
                setIsLogin(true);
              }}
              aria-label='Close'
            >
              <X size={24} />
            </button>

            <h3 className='text-lg font-bold text-gray-200'>Skapa konto</h3>

            <form onSubmit={handleRegister} className='space-y-4 mt-4'>
              <div>
                <label className='label text-gray-300'>
                  <span className='label-text text-gray-300'>E-post</span>
                </label>
                <input
                  type='email'
                  className='input input-bordered w-full'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label className='label text-gray-300'>
                  <span className='label-text text-gray-300'>Namn</span>
                </label>
                <input
                  type='text'
                  className='input input-bordered w-full'
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div>
                <label className='label text-gray-300'>
                  <span className='label-text text-gray-300'>Lösenord</span>
                </label>
                <input
                  type='password'
                  className='input input-bordered w-full'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label className='label text-gray-300'>
                  <span className='label-text text-gray-300'>
                    Ange lösenord igen
                  </span>
                </label>
                <input
                  type='password'
                  className='input input-bordered w-full'
                  required
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  value={passwordRepeat}
                />
              </div>
              <span className='text-red-600'>{responseMsg}</span>
              <div className='modal-action'>
                <button
                  type='submit'
                  className={`btn bg-yellow-400 text-black hover:bg-yellow-300 ${loading ? 'loading' : null}`}
                >
                  Registrera
                </button>
              </div>
              <span
                onClick={() => setIsLogin(true)}
                className={'cursor-pointer hover:font-bold'}
              >
                Medlem? Logga in här!
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
