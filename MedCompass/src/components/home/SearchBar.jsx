import { useEffect, useState } from "react";

function SearchBar({ setResults, setLoading, setError, setQuery: setParentQuery, setHasSearched }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      setHasSearched(false);
      setParentQuery("");
      setLoading(false);
      return;
    }

    setParentQuery(query.trim());

    const debouncing = setTimeout(async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}*&limit=9`,
        );

        if (!response.ok) {
          if (response.status === 404) {
            setResults([]);
            setHasSearched(true);
            return;
          }

          throw new Error("Unable to fetch medication data right now.");
        }

        const data = await response.json();
        setResults(data.results || []);
        setHasSearched(true);
      } catch (error) {
        setResults([]);
        setError(error.message || "Something went wrong. Please try again.");
        setHasSearched(false);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debouncing);
  }, [query, setError, setResults, setLoading]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-5xl">
      <input
        type="text"
        name="query"
        placeholder="Search for a medication (e.g., Advil, Tylenol)..."
        value={query}
        onChange={handleChange}
        className="w-full px-6 py-4 text-lg border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      />
    </div>
  );
}

export default SearchBar;
