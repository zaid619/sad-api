import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

export default function App() {
  // FIXED: Added 'audit' to the state flow
  const [stage, setStage] = useState("terminal"); // terminal, lies, audit, spin, contract, final
  const [terminalText, setTerminalText] = useState([]);
  const [clearedLies, setClearedLies] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState(null);

  // Terminal Logic - Fast-paced and realistic
  useEffect(() => {
    if (stage === "terminal") {
      const lines = [
        "connecting to zaid_brain...",
        "status: regretting everything.",
        "analyzing recent arguments...",
        "error found: User 'zaid' used forbidden word: 'Toxic'.",
        "error found: Blocking protocol activated unnecessarily.",
        "system Suggestion: zaid should admit he is a dumb.",
        "correcting perspective: Alizeh = The Smartest Future CA.",
        "correcting perspective: Zaid = Lucky to have her.",
        "waiting for alizeh to take control."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setTerminalText((prev) => [...prev, lines[i]]);
        i++;
        if (i === lines.length) clearInterval(interval);
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [stage]);

  const lies = [
    { id: 1, lie: "Alizeh ruins my peace", truth: "Actually, you're the only one who keeps me sane. I was just acting out cuz I couldn't handle my own shit. My bad." },
    { id: 2, lie: "She is toxic", truth: "You're literally the best person I know. Calling you toxic was just a low blow cuz I was mad. I didn't mean a word of it." }
  ];

  const benefits = [
    "A Day at the Zoo 🦁", 
    "No blocking forever 📵", 
    "Unlimited Head and Back Massage 💆‍♀️", 
    "Handwritten apology letter ✍️", 
    "I'll admit you're right for 24h 🏆", 
    "Shopping at Mr. DIY 🛠️",
    "Everyday zero arguments 🕊️"
  ];

const spinWheel = () => {
  if (isSpinning) return;
  setIsSpinning(true);
  
  // 1. Calculate the landing spot FIRST
  const randomDegree = Math.floor(Math.random() * 360);
  const totalRotation = rotation + 1800 + randomDegree; // 5 full spins + extra
  setRotation(totalRotation);

  // 2. Calculate which slice that degree corresponds to
  // (360 / benefits.length) gives the size of each slice
  const sliceSize = 360 / benefits.length;
  const prizeIndex = Math.floor((360 - (randomDegree % 360)) / sliceSize);
  const wonPrize = benefits[prizeIndex];

  setTimeout(async () => {
    setIsSpinning(false);
    setPrize(wonPrize); // Now the prize matches the wheel visual!

    try {
      const response = await fetch('/api/save-prize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prize: wonPrize, 
          spunAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          user: "Alizeh" 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData.error);
      } else {
        console.log("Prize saved to MongoDB successfully!");
      }
    } catch (err) {
      console.error("Network/Connection error:", err);
    }
  }, 5000); // 4 seconds gives the animation time to fully settle
};

  const finalize = () => {
    confetti({ 
      particleCount: 200, 
      spread: 80, 
      origin: { y: 0.6 },
      colors: ['#ff0055', '#ffffff'] 
    });
    setStage("final");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Soft Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: TERMINAL */}
{stage === "terminal" && (
  <motion.div 
    key="terminal" 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, y: -20 }} 
    className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl font-mono relative overflow-hidden"
  >
    {/* Terminal Header Dots */}
    <div className="flex gap-1.5 mb-6">
      <div className="w-3 h-3 rounded-full bg-red-500/20" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
      <div className="w-3 h-3 rounded-full bg-green-500/20" />
    </div>

    {/* Text Area */}
    <div className="space-y-3 mb-10 min-h-[180px]">
      {terminalText.map((line, i) => (
        <motion.p 
          initial={{ opacity: 0, x: -5 }} 
          animate={{ opacity: 1, x: 0 }} 
          key={i} 
          className="text-sm text-gray-400 leading-relaxed"
        >
          <span className="text-pink-500 mr-2 opacity-80">›</span> 
          {line}
        </motion.p>
      ))}
      
      {/* Blinking Cursor for the last line */}
      {terminalText.length > 0 && terminalText.length < 9 && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-pink-500 ml-1"
        />
      )}
    </div>

    {/* Action Button */}
    {terminalText.length >= 7 && (
      <motion.button 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setStage("lies")}
        className="w-full py-4 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-lg"
      >
        Open Zaid's Apology
      </motion.button>
    )}

    {/* Subtle Scanline Effect */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
  </motion.div>
)}

        {/* STAGE 1: LIES */}
        {stage === "lies" && (
          <motion.div key="lies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ x: -100 }} className="z-10 w-full max-w-lg">
            <h1 className="text-3xl font-black mb-2 italic tracking-tighter">I said some stupid stuff.</h1>
            <p className="text-gray-500 mb-8 text-sm font-mono uppercase tracking-widest">Click the lies to decrypt the truth</p>
            <div className="space-y-4">
              {lies.map((l) => (
                <div 
                  key={l.id} 
                  onClick={() => !clearedLies.includes(l.id) && setClearedLies([...clearedLies, l.id])} 
                  className={`p-6 bg-white/5 border rounded-2xl cursor-pointer transition-all ${clearedLies.includes(l.id) ? 'border-pink-500/50 shadow-[0_0_15px_rgba(255,0,85,0.1)]' : 'border-white/10 hover:border-white/30'}`}
                >
                  <p className={`text-lg font-bold ${clearedLies.includes(l.id) ? 'line-through text-pink-500 opacity-50' : ''}`}>{l.lie}</p>
                  {clearedLies.includes(l.id) && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-gray-300 italic leading-relaxed">
                      {l.truth}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
            {clearedLies.length === 2 && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                onClick={() => setStage("audit")} // FIXED: Now goes to Audit
                className="w-full mt-8 py-4 bg-white text-black font-black rounded-xl uppercase text-[10px] tracking-[0.2em]"
              >
                View Audit Report
              </motion.button>
            )}
          </motion.div>
        )}

        {/* STAGE 2: THE RELATIONSHIP AUDIT */}
        {stage === "audit" && (
          <motion.div 
            key="audit" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="z-10 w-full max-w-xl bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] shadow-3xl"
          >
            <h2 className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-8 italic text-center">Internal Audit: Stress vs Peace</h2>
            
            <div className="space-y-6">
              {[
                { label: "Zaid's Maturity Level", val: "12%", color: "bg-red-500" },
                { label: "Alizeh's CA Stress", val: "98%", color: "bg-pink-600" },
                { label: "Probability of Zaid being a dumb", val: "100%", color: "bg-white" }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                    <span>{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: item.val }} transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-full ${item.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5 italic text-gray-400 text-sm leading-relaxed">
              "Audit Note: Calling Alizeh 'toxic' was a misclassification of assets. She is actually the primary shareholder of my heart. Error must be rectified immediately."
            </div>

            <button 
              onClick={() => setStage("spin")} // FIXED: Now goes to Spin
              className="mt-10 w-full py-4 bg-transparent border border-white/20 rounded-xl font-bold hover:bg-white hover:text-black transition-all"
            >
              PROCEED TO GET BENEFITS
            </button>
          </motion.div>
        )}
        
        {/* STAGE 3: SPIN */}
        {stage === "spin" && (
          <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-10 text-center">
            <h1 className="text-3xl font-black mb-8 italic tracking-tighter">The "I'm a Dumb" Wheel</h1>
            <div className="relative w-64 h-64 mx-auto mb-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-3xl">👇</div>
              <motion.div 
                animate={{ rotate: rotation }} 
                transition={{ duration: 3, ease: "circOut" }} 
                className="w-full h-full rounded-full border-4 border-white/10 relative overflow-hidden bg-[#111] shadow-2xl"
              >
                {benefits.map((b, i) => (
                  <div key={i} className="absolute w-full h-full text-center pt-4" style={{ transform: `rotate(${i * 60 + 30}deg)`, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-[7px] font-black uppercase tracking-tighter block mt-2 px-2">{b}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            {prize && <p className="mb-6 text-pink-500 font-bold animate-pulse text-lg uppercase tracking-widest font-mono">You won: {prize}!</p>}
            <div className="flex flex-col gap-4">
              <button onClick={spinWheel} className="px-10 py-4 bg-pink-600 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-pink-600/20">Spin for a favor</button>
              {prize && <button onClick={() => setStage("contract")} className="text-gray-500 underline text-[10px] uppercase tracking-widest font-mono">Okay, enough. Let's talk.</button>}
            </div>
          </motion.div>
        )}

        {/* STAGE 4: CONTRACT */}
        {stage === "contract" && (
          <motion.div key="contract" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white text-black p-10 rounded-[2.5rem] max-w-lg shadow-2xl relative z-10">
             <div className="absolute -top-5 -left-5 text-6xl">📝</div>
             <h2 className="text-4xl font-black mb-6 italic tracking-tighter" style={{ fontFamily: 'Dancing Script' }}>Official Contract</h2>
             <div className="space-y-6 text-gray-700">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0 text-xs">1</div>
                  <p className="text-sm">I, Zaid, admit that <b>blocking Alizeh</b> was a peak moment of immaturity. I was cowardly.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0 text-xs">2</div>
                  <p className="text-sm">I promise to be your <b>silent support</b> and not another headache in your life.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0 text-xs">3</div>
                  <p className="text-sm">I acknowledge that you are my priority, and I failed to show that. I will do better.</p>
                </div>
             </div>
             <button onClick={finalize} className="mt-10 w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-pink-600 transition-all active:scale-95 shadow-xl">
               Sign & Forgive Me 🖋️
             </button>
          </motion.div>
        )}

        {/* STAGE 5: FINAL */}
        {stage === "final" && (
          <motion.div key="final" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center z-10">
            <motion.h1 animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-8xl mb-8">❤️</motion.h1>
            <h1 className="text-5xl font-black italic mb-4 tracking-tighter">We're good?</h1>
            <p className="text-pink-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-12">I am missing you alottt...</p>
          
               <p className="text-sm italic text-gray-400/50  max-w-sm mx-auto leading-relaxed">
                 I know I messed up, and I know I don’t deserve a fast reply, but I’m literally holding my phone waiting for that 'typing...' bubble to pop up. Check your WhatsApp... I’m waiting for you.
               </p>
            
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}