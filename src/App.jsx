import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(16);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]<>?/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-4">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Password Generator
        </h1>
        <p className="text-center text-gray-400 mt-2 text-lg" >
          Secure • Random • Instant
        </p>

        <div className="flex mt-8 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <input
            type="text"
            value={password}
            className="flex-1 px-4 py-3 font-mono text-lg bg-black/40 text-cyan-300 focus:outline-none"
            placeholder="Your password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-5 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold hover:opacity-90 transition  cursor-pointer"
          >
            Copy
          </button>
        </div>

        {/* Settings */}
        <div className="mt-8 space-y-6">
          {/* Length */}
          <div>
            <label className="flex justify-between items-center text-sm text-gray-300 mb-2">
              <span>Password Length</span>
              <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-cyan-300 font-mono">
                {length}
              </span>
            </label>
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/10">
              <span className="text-gray-300 text-sm">Include Numbers</span>
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="h-5 w-5 accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/10">
              <span className="text-gray-300 text-sm">Include Symbols</span>
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="h-5 w-5 accent-purple-400"
              />
            </label>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={passwordGenerator}
            className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-lg hover:opacity-90 transition hover:scale-105 cursor-pointer"
          >
            Generate New Password
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Built with ❤️ — No data leaves your browser
        </p>
      </div>
    </div>
  );
}

export default App;
