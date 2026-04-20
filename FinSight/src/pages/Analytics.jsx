import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFinance } from "../context/FinanceContext";

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#14B8A6", "#6366F1"];

function Analytics() {
  const { transactions, formatCurrency } = useFinance();

  const expenseByCategory = useMemo(() => {
    const grouped = {};

    transactions.forEach((txn) => {
      if (txn.amount < 0) {
        grouped[txn.category] = (grouped[txn.category] || 0) + Math.abs(txn.amount);
      }
    });

    return Object.entries(grouped).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length],
    }));
  }, [transactions]);

  const monthlyTrend = useMemo(() => {
    const grouped = {};

    transactions.forEach((txn) => {
      const date = new Date(txn.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!grouped[key]) {
        grouped[key] = { month: key, income: 0, expense: 0 };
      }

      if (txn.amount > 0) {
        grouped[key].income += txn.amount;
      } else {
        grouped[key].expense += Math.abs(txn.amount);
      }
    });

    return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const incomeVsExpense = useMemo(() => {
    const income = transactions
      .filter((txn) => txn.amount > 0)
      .reduce((sum, txn) => sum + txn.amount, 0);
    const expense = transactions
      .filter((txn) => txn.amount < 0)
      .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

    return [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ];
  }, [transactions]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseByCategory} dataKey="value" nameKey="name" outerRadius="75%" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeVsExpense}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="bg-card rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Monthly Spending Trend</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default Analytics;
