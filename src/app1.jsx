import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

export default function App() {
  const [gameState, setGameState] = useState("mood"); // mood, intro, game, letter, final
  const [activeLie, setActiveLie] = useState(null);
  const [angerLevel, setAngerLevel] = useState(5);

  const triggerConfetti = () => {
    confetti({ 
      particleCount: 150, 
      spread: 70, 
      origin: { y: 0.6 },
      colors: ['#ff0055', '#ff77aa', '#ffffff']
    });
    setGameState("final");
  };

  const debunkedResponses = {
    0: "The truth is: You are my sanctuary. When the CA pressure gets loud, talking to you is the only thing that actually brings me peace. I was just projecting my own noise on you. 🕊️",
    1: "The truth is: You are the most 'pure' soul I know. You're out here grinding for a CA title, and I had the nerve to call you toxic? I'm the one who needs a reality check. 🧠",
    2: "The truth is: I am absolutely lost without you. Being 'alone' sounds like a nightmare. You make my life colorful, and I'm a mess when we aren't okay. 🏠"
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-900/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: THE MOOD METER */}
        {gameState === "mood" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center z-10 bg-[#1a1a1a] p-10 rounded-[2rem] border border-white/10"
          >
            <h2 className="text-pink-500 font-bold mb-4 uppercase tracking-widest">Honesty Check</h2>
            <h1 className="text-2xl font-bold mb-8 text-white">How angry are you right now?</h1>
            <input 
              type="range" min="1" max="10" value={angerLevel} 
              onChange={(e) => setAngerLevel(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500 mb-6"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-8 font-mono">
              <span>1: Just a bit annoyed</span>
              <span className="text-red-500 font-bold">{angerLevel}/10</span>
              <span>10: Ready to block me forever</span>
            </div>
            <button 
              onClick={() => setGameState("intro")}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-pink-500 hover:text-white transition-all"
            >
              {angerLevel > 7 ? "I deserve the worst, let's go" : "Proceed to Apology"}
            </button>
          </motion.div>
        )}

        {/* STAGE 1: THE LOCKOUT */}
        {gameState === "intro" && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }}
            className="text-center z-10"
          >
            <div className="mb-6 inline-block p-4 rounded-full bg-pink-500/10 border border-pink-500/50">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-5xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Quicksand' }}>
              ACCESS <span className="text-pink-500">DENIED</span>
            </h1>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
              {angerLevel > 7 
                ? "Warning: Your anger level is critical. Systems are locked until Zaid proves he is not a total idiot." 
                : "Zaid's communication privileges have been revoked for being a dummy."}
            </p>
            <button 
              onClick={() => setGameState("game")}
              className="group relative px-10 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10">Unlock for Alizeh only</span>
              <div className="absolute inset-0 bg-pink-500 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
            </button>
          </motion.div>
        )}

        {/* STAGE 2: THE DEBUNKING BOX */}
        {gameState === "game" && (
          <motion.div 
            key="game" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-xl z-10"
          >
            <div className="bg-[#1a1a1a]/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
              <h2 className="text-sm font-bold text-pink-500 tracking-[0.4em] uppercase mb-2">Evidence Review</h2>
              <h3 className="text-3xl font-bold mb-8">Select a lie to debunk it:</h3>
              
              <div className="grid gap-4">
                {[
                  { q: "Aliza ruins my peace", icon: "🕊️" },
                  { q: "She is toxic", icon: "🧪" },
                  { q: "I'm better off alone", icon: "🚶‍♂️" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <button
                      onClick={() => setActiveLie(activeLie === i ? null : i)}
                      className={`w-full p-5 rounded-2xl text-left transition-all border ${activeLie === i ? 'border-pink-500 bg-pink-500/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                    >
                      <div className="flex justify-between items-center text-white">
                        <span className="font-medium text-lg">{item.icon} &nbsp; {item.q}</span>
                        <span className="text-xs text-pink-400 font-bold uppercase">{activeLie === i ? "The Truth" : "LIES!"}</span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeLie === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="p-5 bg-white/5 rounded-2xl text-gray-300 italic text-sm leading-relaxed border-l-4 border-pink-500">
                            {debunkedResponses[i]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {activeLie !== null && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setGameState("letter")}
                  className="w-full mt-10 py-4 bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl font-black uppercase tracking-widest text-sm text-white"
                >
                  Proceed to Peace Treaty
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* STAGE 3: THE SINCERE TERMS */}
        {gameState === "letter" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white text-black p-10 rounded-[3rem] max-w-lg shadow-2xl relative"
          >
             <div className="absolute -top-5 -left-5 text-6xl">📝</div>
             <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'Dancing Script' }}>Official Contract</h2>
             
             <div className="space-y-6 text-gray-700">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0">1</div>
                  <p>I, Zaid, admit that <b>blocking Alizeh</b> was a peak moment of immaturity. I was cowardly.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0">2</div>
                  <p>I promise to be your <b>silent support</b> (not another stressor) while you conquer your CA journey.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0">3</div>
                  <p>I acknowledge that you are my priority, and I failed to show that. I will do better.</p>
                </div>
             </div>

             <button 
              onClick={triggerConfetti}
              className="mt-10 w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-pink-600 transition-all active:scale-95 shadow-xl"
             >
               Sign & Forgive 🖋️
             </button>
          </motion.div>
        )}

        {/* STAGE 4: THE REWARD */}
        {gameState === "final" && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-center z-10"
          >
            <h1 className="text-9xl mb-8 animate-pulse">💖</h1>
            <h2 className="text-6xl font-black mb-4 text-white" style={{ fontFamily: 'Dancing Script' }}>Forgiven?</h2>
            <p className="text-pink-500 font-bold tracking-[0.3em] uppercase mb-12">Connection Re-established</p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-gray-500 uppercase mb-1">Status</p>
                <p className="font-bold text-white">Unblocked ✅</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-gray-500 uppercase mb-1">Love Level</p>
                <p className="font-bold text-white">1000%</p>
              </div>
            </div>
            <p className="mt-8 text-gray-500 text-sm animate-bounce">I'm waiting for your text...</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}