// src/components/MemeCard.jsx
import React from "react";

export default function MemeCard({ meme }) {
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(meme.image);
      // optionally you can add visual feedback here (toast)
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div
      onClick={onClick}
      title={meme.name}
      className="bg-white/90 rounded-xl p-3 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition cursor-pointer"
    >
      <div className="w-full mb-2">
        {/* aspect-[3/2] sets the width:height ratio ~ 3:2 */}
        <img
          src={meme.image}
          alt={meme.name}
          className="w-full aspect-[3/2] object-cover rounded-md"
          loading="lazy"
        />
      </div>

      <div className="font-semibold text-slate-800 truncate w-full">{meme.name}</div>
      <div className="text-xs text-slate-500 mt-1 w-full">
        {meme.box_count} boxes • {Number(meme.captions).toLocaleString()} captions
      </div>
    </div>
  );
}
