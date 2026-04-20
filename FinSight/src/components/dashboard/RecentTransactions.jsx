import { useFinance } from "../../context/FinanceContext.jsx";

function RecentTransactions() {
  const { transactions, formatCurrency } = useFinance();
  const recent = transactions.slice(0, 5);

  return ( 
    <div className="p-4 bg-card rounded-2xl shadow-sm">
      <h2 className="mb-4 tracking-tight text-lg font-semibold">Recent Transactions</h2>
      <div className="space-y-3">
        {recent.length === 0 && (
          <p className="text-sm text-muted">No transactions yet.</p>
        )}
        {
          recent.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition">
              <span className="text-muted">{txn.title}</span>
              <span className={txn.amount < 0 ? "text-red-400" : "text-green-400"}>
                {formatCurrency(Math.abs(txn.amount))}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default RecentTransactions;