export const transactionsData = [
  {
    id: 1,
    title: "Swiggy",
    amount: -500,
    category: "Food",
    type: "expense",
    date: "2026-01-10",
    notes: "Weekend order",
    recurring: false,
  },
  {
    id: 2,
    title: "Salary",
    amount: 50000,
    category: "Income",
    type: "income",
    date: "2026-01-01",
    notes: "Monthly salary",
    recurring: true,
  },
  {
    id: 3,
    title: "Uber",
    amount: -300,
    category: "Travel",
    type: "expense",
    date: "2026-02-05",
    notes: "Office commute",
    recurring: false,
  },
  {
    id: 4,
    title: "Zomato",
    amount: -850,
    category: "Food",
    type: "expense",
    date: "2026-02-12",
    notes: "Dinner with friends",
    recurring: false,
  },
  {
    id: 5,
    title: "Freelance",
    amount: 12000,
    category: "Income",
    type: "income",
    date: "2026-02-15",
    notes: "Landing page project",
    recurring: false,
  },
  {
    id: 6,
    title: "Electricity Bill",
    amount: -2200,
    category: "Utilities",
    type: "expense",
    date: "2026-02-20",
    notes: "Monthly bill",
    recurring: true,
  },
  {
    id: 7,
    title: "Movie",
    amount: -700,
    category: "Entertainment",
    type: "expense",
    date: "2026-03-03",
    notes: "IMAX ticket",
    recurring: false,
  },
  {
    id: 8,
    title: "Rent",
    amount: -15000,
    category: "Rent",
    type: "expense",
    date: "2026-03-05",
    notes: "Monthly rent",
    recurring: true,
  },
  {
    id: 9,
    title: "Bonus",
    amount: 10000,
    category: "Income",
    type: "income",
    date: "2026-03-10",
    notes: "Quarterly bonus",
    recurring: false,
  },
  {
    id: 10,
    title: "Grocery",
    amount: -2400,
    category: "Food",
    type: "expense",
    date: "2026-03-18",
    notes: "Monthly groceries",
    recurring: true,
  },
];

const income = transactionsData
  .filter((txn) => txn.amount > 0)
  .reduce((sum, txn) => sum + txn.amount, 0);

const expense = transactionsData
  .filter((txn) => txn.amount < 0)
  .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

const balance = income - expense;

export const summaryData = {
  balance,
  income,
  expense,
  savings: balance,
};

export const budgetData = {
  monthlyBudget: 50000,
};