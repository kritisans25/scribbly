import React from 'react';

export default function TopButtons({ onAddNote, onToggleLocked, onSearch }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 px-4 w-full max-w-screen-lg mx-auto">
      {/* Add Note Button */}
      <button
        onClick={onAddNote}
        className="w-full sm:w-auto bg-scribblyYellow hover:bg-[rgba(78,224,158,0.2)] text-black font-semibold py-2 px-6 rounded-full shadow-md border-2 border-scribblyBrown transition"
      >
        ＋ Add Note
      </button>

      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search the Note"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full sm:w-64 px-4 py-2 rounded-full border-2 border-scribblyBrown shadow-md outline-none bg-scribblyYellow hover:bg-[rgba(78,224,158,0.2)] text-black placeholder:text-black"
      />

      {/* Toggle Locked Notes Button */}
      <button
        onClick={onToggleLocked}
        className="w-full sm:w-auto bg-scribblyYellow hover:bg-[rgba(78,224,158,0.2)] text-black font-semibold py-2 px-6 rounded-full shadow-md border-2 border-scribblyBrown transition"
      >
        🔒 Locked Notes
      </button>
    </div>
  );
}
