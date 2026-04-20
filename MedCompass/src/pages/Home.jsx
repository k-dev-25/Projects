import { useState } from "react";
import SearchBar from "../components/home/SearchBar.jsx";
import ResultsGrid from "../components/home/ResultsGrid.jsx";

export default function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="p-8 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-4 pt-10">
          <h1 className="text-4xl font-bold text-slate-800 text-center sm:text-left">
            <span className="text-blue-600">Med</span>Compass
          </h1>
          <p className="text-slate-600 max-w-xl text-center sm:text-left">
            Search for medications to understand their active ingredients, FDA
            warnings, and find generic alternatives.
          </p>
        </header>

        <SearchBar
          setResults={setResults}
          setLoading={setLoading}
          setError={setError}
          setQuery={setQuery}
          setHasSearched={setHasSearched}
        />

        <ResultsGrid
          results={results}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          query={query}
        />
      </div>
    </div>
  );
}
