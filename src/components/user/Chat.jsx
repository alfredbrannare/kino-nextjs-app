'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Bot } from 'lucide-react';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleChat = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      const response = await fetch('/api/user/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ msg: question }),
          credentials: 'include',
        });
      const data = await response.json();
      if (data.status) {
        setResponseMsg(data.status);
        setQuestion('');
        setLoading(false);
      } else {
        console.error(data.error);
        setErr('Fältet får inte vara tomt!')
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Bot
        onClick={() => setOpen(true)}
      ></Bot >
      {/* LOGIN */}
      {open && (
        <div className="modal modal-open">
          <div className="modal-box relative  bg-[#2B0404] ">
            <button
              className="cursor-pointer absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => { setOpen(false); }}

              aria-label="Close"
            >
              <X size={24} />
            </button>

            <h3 className="text-lg font-bold text-gray-200">Chat</h3>

            <form onSubmit={handleChat} className="space-y-4 mt-4">
              <div>
                <label className="label text-gray-300">
                  {responseMsg ? (<span className="label-text text-gray-300">Svar:</span>) : null}
                </label>
                <p>{responseMsg}</p>
                {<fieldset className="fieldset">
                  <legend className="fieldset-legend">Ställ din fråga</legend>
                  <input type="text" className={`input ${err? 'input-error': null}`} placeholder="Skriv här" onChange={(e) => setQuestion(e.target.value)}
                    value={question} />
                </fieldset>}
                <p className="label">{err}</p>
              </div>
              <div className="modal-action">
                <button type="submit" className={`btn bg-yellow-400 text-black hover:bg-yellow-300 ${loading ? 'loading' : null}`}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;