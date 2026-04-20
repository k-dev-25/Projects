export default function NotFoundCard({ query }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold text-slate-800">No medicine found</h3>
      <p className="mt-2 text-slate-600">
        We could not find results for
        <span className="font-semibold text-slate-800"> "{query}"</span>.
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Try a different brand name or check spelling.
      </p>
    </div>
  );
}
