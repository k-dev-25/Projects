import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { useFinance } from "../../context/FinanceContext";

const COLORS = [
  "#3B82F6", // blue
  "#06B6D4", // cyan
  "#14B8A6", // teal
  "#22C55E", // green
  "#84CC16", // lime
  "#F59E0B", // amber
  "#F97316", // orange
  "#EF4444", // red
  "#0EA5E9", // sky
  "#6366F1", // indigo
];

const ExpenseChart = () => {
  const { transactions, formatCurrency } = useFinance();

  const chartData = useMemo(() => {
    const expenseData = {};

    transactions.forEach((txn) => {
      if (txn.amount < 0) {
        const category = txn.category;
        expenseData[category] =
          (expenseData[category] || 0) + Math.abs(txn.amount);
      }
    });

    return Object.entries(expenseData).map(([key, value], index) => ({
      name: key,
      value,
      fill: COLORS[index % COLORS.length],
    }));
  }, [transactions]);

  return (
    <div className="p-1">
      <h2 className="mb-4 tracking-tight text-lg font-semibold">Expenses</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="75%"
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
