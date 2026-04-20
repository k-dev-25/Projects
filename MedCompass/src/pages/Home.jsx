import { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../components/home/SearchBar.jsx";
import ResultsGrid from "../components/home/ResultsGrid.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="p-8 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-4 pt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-4xl font-bold text-slate-800 text-center sm:text-left">
              <span className="text-blue-600">Med</span>Compass
            </h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="self-center sm:self-auto inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              My Dashboard
            </button>
          </div>
          <p className="text-slate-600 max-w-xl text-center sm:text-left">
            Search for medications to understand their active ingredients, FDA
            warnings, and find generic alternatives.
          </p>
        </header>

        <SearchBar
          setResults={setResults}
          setLoading={setLoading}
          setError={setError}
        />

        <ResultsGrid results={results} loading={loading} error={error} />
      </div>
    </div>
  );
}
