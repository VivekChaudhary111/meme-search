// src/components/MemeSearch.jsx
import React, { useEffect, useRef, useState } from "react";
import { fetchMemesAPI } from "./api";
import MemeGrid from "./MemeGrid";

export default function MemeSearch() {
  const [query, setQuery] = useState("");
  const [allMemes, setAllMemes] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);


  const controllerRef = useRef(null);

  useEffect(() => {
    // preload memes once for client-side search
    const load = async () => {
      setLoading(true);
      setError(null);
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      try {
        const data = await fetchMemesAPI(controllerRef.current.signal);
        setAllMemes(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError(err.message || "Failed to fetch memes");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controllerRef.current?.abort();
  }, []);

  const searchNow = (q) => {
  setIsSearching(true);   // <-- start searching
  setHasSearched(true);

  const lc = (q || "").trim().toLowerCase();

  if (!lc) {
    setResults([]);
    setIsSearching(false); // <-- stop searching
    return;
  }

  const filtered = allMemes.filter(
    (m) =>
      m.name.toLowerCase().includes(lc) ||
      String(m.captions).includes(lc) ||
      String(m.box_count).includes(lc)
  );

  setResults(filtered.slice(0, 50));
  setIsSearching(false); // <-- stop searching
};


  const onSubmit = (e) => {
    e.preventDefault();
    searchNow(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-indigo-100 to-violet-200 flex flex-col items-center py-24 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Meme Search</h1>

      {/* centered search bar; same width used for results container (max-w-4xl) */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-4xl flex items-center gap-0 mb-6 mx-auto"
        role="search"
      >
        <input
          type="text"
          aria-label="Search memes"
          placeholder="Search memes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-l-md shadow-sm px-4 py-3 bg-white/90 placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <button
          type="submit"
          className="w-28 h-12 rounded-r-md bg-slate-900 text-white flex items-center justify-center shadow-md"
          aria-label="Search"
        >
          {isSearching ? (
            <span className="text-sm font-medium">Searching...</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          )}
        </button>

      </form>

      {/* results container uses max-w-4xl to match search bar width */}
      <div className="w-full max-w-4xl mx-auto">
        {loading && <div className="mb-4 text-sm text-slate-600">Loading…</div>}
        {error && <div className="mb-4 text-sm text-red-700">Error: {error}</div>}

        {/* only show feedback and grid after user searched */}
        {hasSearched && !loading && results.length === 0 && (
          <p className="text-center text-slate-600 mb-6">No results. Try another keyword.</p>
        )}

        {hasSearched && <MemeGrid results={results} />}
      </div>
    </div>
  );
}
