import ExpenseChart from "../components/dashboard/ExpenseChart.jsx";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart.jsx";
import RecentTransactions from "../components/dashboard/RecentTransactions.jsx";
import SummaryCard from "../components/dashboard/SummaryCard.jsx";
import { useFinance } from "../context/FinanceContext.jsx";

function Dashboard() {
  const { summary, currency, currencies, updateCurrency, formatCurrency } = useFinance();

  return (
    <div
      className="p-6 min-h-screen dark:bg-linear-to-br 
                from-[#020617] via-[#020617] to-[#0a1020] text-text"
    >
      <div className="space-y-8 mx-auto max-w-7xl">
        <div className="flex justify-end">
          <label className="flex items-center gap-2 text-sm text-muted">
            Currency
            <select
              value={currency}
              onChange={(e) => updateCurrency(e.target.value)}
              className="rounded-lg border border-white/10 bg-card px-3 py-1.5 text-text"
            >
              {currencies.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard title="Balance" amount={formatCurrency(summary.balance)} />
          <SummaryCard title="Income" amount={formatCurrency(summary.income)} />
          <SummaryCard title="Expenses" amount={formatCurrency(summary.expense)} />
          <SummaryCard title="Top Category" amount={summary.topCategory} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 space-y-4 rounded-2xl bg-card shadow-sm border border-white/10 p-4">
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Charts</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-0">
              <div className="xl:pr-4 xl:border-r xl:border-white/10">
                <ExpenseChart />
              </div>
              <div className="xl:pl-4">
                <IncomeExpenseChart />
              </div>
            </div>
          </section>
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
