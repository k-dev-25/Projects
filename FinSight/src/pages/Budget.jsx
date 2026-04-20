import { useEffect, useState } from "react";
import axios from "axios";
import { useFinance } from "../context/FinanceContext";

function Budget() {
  const {
    summary,
    monthlyBudget,
    updateMonthlyBudget,
    currency,
    formatCurrency,
    convertFromBase,
  } = useFinance();
  const [budgetInput, setBudgetInput] = useState(String(monthlyBudget));
  const [usdRate, setUsdRate] = useState(null);
  const [loadingRate, setLoadingRate] = useState(false);

  useEffect(() => {
    setBudgetInput(String(monthlyBudget));
  }, [monthlyBudget]);

  useEffect(() => {
    const fetchRate = async () => {
      setLoadingRate(true);
      try {
        const response = await axios.get(`https://open.er-api.com/v6/latest/${currency}`);
        setUsdRate(response.data?.rates?.USD ?? null);
      } catch {
        setUsdRate(null);
      } finally {
        setLoadingRate(false);
      }
    };

    fetchRate();
  }, [currency]);

  const spent = summary.expense;
  const remaining = summary.remainingBudget;
  const usedPercentage = summary.usedPercentage;

  const handleSaveBudget = () => {
    updateMonthlyBudget(Number(budgetInput));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Budget Tracking</h1>

      <div className="bg-card rounded-2xl p-4 space-y-3 shadow-sm">
        <h2 className="text-lg font-semibold">Set Monthly Budget</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            className="p-2 rounded bg-background w-full sm:w-64"
            placeholder="Monthly Budget"
          />
          <button
            onClick={handleSaveBudget}
            className="bg-primary text-white px-4 py-2 rounded-xl"
          >
            Save Budget
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-muted">Total Spending</p>
          <p className="text-2xl font-bold">{formatCurrency(spent)}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-muted">Remaining Budget</p>
          <p className="text-2xl font-bold">{formatCurrency(remaining)}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-muted">Used</p>
          <p className="text-2xl font-bold">{usedPercentage.toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 shadow-sm space-y-2">
        <p className="text-sm text-muted">Budget Progress</p>
        <div className="h-3 rounded-full bg-background overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${Math.min(usedPercentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Currency Conversion ({currency} to USD)</h2>
        {loadingRate && <p className="text-sm text-muted">Loading exchange rate...</p>}
        {!loadingRate && usdRate && (
          <p className="text-sm text-muted">
            Your budget is approximately {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(convertFromBase(monthlyBudget) * usdRate)}
          </p>
        )}
        {!loadingRate && !usdRate && (
          <p className="text-sm text-muted">Could not load exchange rates right now.</p>
        )}
      </div>
    </div>
  );
}

export default Budget;
