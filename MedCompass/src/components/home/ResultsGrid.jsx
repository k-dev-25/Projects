import DrugCard from "./DrugCard.jsx";

export default function ResultsGrid({ results, loading, error }) {
  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-blue-600 font-semibold animate-pulse">
          Fetching medical data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-rose-600 font-medium">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((drug, index) => {
        return <DrugCard key={drug.id || index} drug={drug} />;
      })}
    </div>
  );
}
