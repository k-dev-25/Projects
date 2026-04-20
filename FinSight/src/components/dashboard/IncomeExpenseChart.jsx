import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useFinance } from "../../context/FinanceContext";

const IncomeExpenseChart = () => {
  const { transactions, formatCurrency } = useFinance();

  const chartData = useMemo(() => {
    const monthlyData = {};

    transactions.forEach((txn) => {
      const date = new Date(txn.date || "1970-01-01");
      const month = date.toLocaleString("default", { month: "short" });

      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expense: 0 };
      }

      if (txn.amount > 0) {
        monthlyData[month].income += txn.amount;
      } else {
        monthlyData[month].expense += Math.abs(txn.amount);
      }
    });

    return Object.values(monthlyData);
  }, [transactions]);

  return (
    <div className="p-1">
      <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>

      <div className="w-full h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              width={44}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />

            <Line type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;