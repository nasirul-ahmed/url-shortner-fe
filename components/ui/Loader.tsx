import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="flex space-x-2 items-center">
        {/* The Text Pulses Softly */}
        <h2 className="text-xl font-serif font-light text-black tracking-[0.2em] uppercase animate-pulse">
          Establishing Identity
        </h2>
      </div>
      {/* Optional: A very thin, subtle pulsing underline */}
      <div className="w-16 h-px bg-zinc-300 mt-3 animate-pulse"></div>
    </div>
  );
};

export default Loader;
