// src/components/MemeGrid.jsx
import React from "react";
import MemeCard from "./MemeCard";

export default function MemeGrid({ results }) {
  if (!results || results.length === 0) return null;

  // Grid uses 5 columns on large screens; smaller breakpoints degrade gracefully.
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {results.map((m) => (
          <MemeCard key={m.id} meme={m} />
        ))}
      </div>
    </div>
  );
}
