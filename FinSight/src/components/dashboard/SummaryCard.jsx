function SummaryCard({ title, amount }) {
  return ( 
    <div className="p-4 bg-card border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-500 rounded-2xl shadow-sm hover:shadow-md dark:shadow-white/20 dark:hover:shadow-white/25 transition">
      <h2 className="text-sm text-muted">{ title }</h2>
      <p className="text-2xl font-bold text-text">{ amount }</p>
    </div>
  );
}

export default SummaryCard;