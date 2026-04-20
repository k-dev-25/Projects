import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { budgetData, transactionsData } from "../data/mockData.js";

const FinanceContext = createContext();

const FINANCE_STORAGE_KEY = "finsight-transactions";
const BUDGET_STORAGE_KEY = "finsight-budget";
const CURRENCY_STORAGE_KEY = "finsight-currency";
const BASE_CURRENCY = "INR";
const SUPPORTED_CURRENCIES = ["INR", "USD", "EUR", "GBP", "JPY"];

const currencyLocales = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
};

const getSavedTransactions = () => {
  const stored = localStorage.getItem(FINANCE_STORAGE_KEY);
  if (!stored) {
    return transactionsData;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : transactionsData;
  } catch {
    return transactionsData;
  }
};

const getSavedBudget = () => {
  const stored = localStorage.getItem(BUDGET_STORAGE_KEY);
  if (!stored) {
    return budgetData.monthlyBudget;
  }

  const parsed = Number(stored);
  return Number.isFinite(parsed) ? parsed : budgetData.monthlyBudget;
};

const getSavedCurrency = () => {
  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
  return SUPPORTED_CURRENCIES.includes(stored) ? stored : "INR";
};

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(getSavedTransactions);
  const [monthlyBudget, setMonthlyBudget] = useState(getSavedBudget);
  const [currency, setCurrency] = useState(getSavedCurrency);
  const [exchangeRates, setExchangeRates] = useState({ INR: 1 });

  useEffect(() => {
    let isMounted = true;

    const fetchRates = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/INR");
        const data = await response.json();
        const rates = data?.rates;

        if (!isMounted || !rates) {
          return;
        }

        const supportedRates = SUPPORTED_CURRENCIES.reduce((acc, code) => {
          if (code === BASE_CURRENCY) {
            acc[code] = 1;
            return acc;
          }

          const parsed = Number(rates[code]);
          if (Number.isFinite(parsed) && parsed > 0) {
            acc[code] = parsed;
          }
          return acc;
        }, { INR: 1 });

        setExchangeRates(supportedRates);
      } catch {
        // Keep default INR-only fallback when rates API is unavailable.
      }
    };

    fetchRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(currencyLocales[currency] || "en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "JPY" ? 0 : 2,
      }),
    [currency],
  );

  const addTransaction = (txn) => {
    setTransactions((prev) => {
      const next = [txn, ...prev];
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => {
      const next = prev.filter((t) => t.id !== id);
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const updateTransaction = (updatedTxn) => {
    setTransactions((prev) => {
      const next = prev.map((txn) =>
        txn.id === updatedTxn.id ? { ...txn, ...updatedTxn } : txn,
      );
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const updateMonthlyBudget = (value) => {
    const parsed = Number(value);
    const safeBudget = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    setMonthlyBudget(safeBudget);
    localStorage.setItem(BUDGET_STORAGE_KEY, String(safeBudget));
  };

  const updateCurrency = (nextCurrency) => {
    if (!SUPPORTED_CURRENCIES.includes(nextCurrency)) {
      return;
    }

    setCurrency(nextCurrency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency);
  };

  const convertFromBase = (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return 0;
    }

    const rate = exchangeRates[currency] || 1;
    return parsed * rate;
  };

  const formatCurrency = (value) => {
    return currencyFormatter.format(convertFromBase(value));
  };

  const summary = useMemo(() => {
    const income = transactions
      .filter((txn) => txn.amount > 0)
      .reduce((sum, txn) => sum + txn.amount, 0);

    const expense = transactions
      .filter((txn) => txn.amount < 0)
      .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

    const categorySpend = transactions
      .filter((txn) => txn.amount < 0)
      .reduce((acc, txn) => {
        acc[txn.category] = (acc[txn.category] || 0) + Math.abs(txn.amount);
        return acc;
      }, {});

    const topCategoryEntry = Object.entries(categorySpend).sort(
      (a, b) => b[1] - a[1],
    )[0];

    const balance = income - expense;
    const usedPercentage = monthlyBudget
      ? Math.min((expense / monthlyBudget) * 100, 100)
      : 0;

    return {
      balance,
      income,
      expense,
      savings: balance,
      topCategory: topCategoryEntry ? topCategoryEntry[0] : "N/A",
      monthlyBudget,
      remainingBudget: Math.max(monthlyBudget - expense, 0),
      usedPercentage,
    };
  }, [transactions, monthlyBudget]);

  return (
    <FinanceContext.Provider
      value={{
        summary,
        transactions,
        monthlyBudget,
        currency,
        currencies: SUPPORTED_CURRENCIES,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        updateMonthlyBudget,
        updateCurrency,
        convertFromBase,
        exchangeRates,
        formatCurrency,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}