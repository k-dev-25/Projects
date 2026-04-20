import { useFinance } from "../context/FinanceContext";
import { useState, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";

const Transactions = () => {
  const { transactions, deleteTransaction, updateTransaction, formatCurrency } = useFinance();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const categories = useMemo(() => {
    const unique = [...new Set(transactions.map((txn) => txn.category))];
    return unique.sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const openEdit = (txn) => {
    setEditingId(txn.id);
    setEditTitle(txn.title);
    setEditNotes(txn.notes || "");
  };

  const handleUpdate = (txn) => {
    updateTransaction({
      ...txn,
      title: editTitle.trim() || txn.title,
      notes: editNotes,
    });
    setEditingId(null);
  };

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (debouncedSearch) {
      data = data.filter((txn) =>
        `${txn.title} ${txn.notes || ""}`
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()),
      );
    }

    if (category !== "all") {
      data = data.filter((txn) => txn.category === category);
    }

    if (type !== "all") {
      data = data.filter((txn) => txn.type === type);
    }

    if (startDate) {
      data = data.filter((txn) => txn.date >= startDate);
    }

    if (endDate) {
      data = data.filter((txn) => txn.date <= endDate);
    }

    if (sortBy === "amount") {
      data.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    } else if (sortBy === "date") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "category") {
      data.sort((a, b) => a.category.localeCompare(b.category));
    }

    return data;
  }, [transactions, debouncedSearch, category, type, startDate, endDate, sortBy]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <input
          placeholder="Search title or notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-card"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-card"
        >
          <option value="all">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-card"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded bg-card"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="category">Sort by Category</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded bg-card"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded bg-card"
        />
      </div>

      <div className="space-y-3">
        {filteredTransactions.map((txn) => (
          <div
            key={txn.id}
            className="bg-card p-4 rounded-xl flex flex-col gap-3 md:flex-row md:justify-between md:items-center"
          >
            <div className="space-y-1 w-full md:w-auto">
              {editingId === txn.id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="p-2 rounded bg-background w-full md:w-72"
                />
              ) : (
                <p className="font-medium">
                  {txn.title} {txn.recurring ? "(Recurring)" : ""}
                </p>
              )}
              <p className="text-sm text-muted">
                {txn.category} • {txn.date} • {txn.type}
              </p>
              {editingId === txn.id ? (
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="p-2 rounded bg-background w-full md:w-72"
                />
              ) : (
                txn.notes && <p className="text-sm text-muted">{txn.notes}</p>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-3 self-end md:self-auto">
              <div
                className={`font-semibold ${
                  txn.type === "income" ? "text-green-400" : "text-red-400"
                }`}
              >
                {formatCurrency(Math.abs(txn.amount))}
              </div>
              {editingId === txn.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(txn)}
                    className="px-3 py-1 rounded bg-primary text-white text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 rounded bg-background text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openEdit(txn)}
                    className="px-3 py-1 rounded bg-background text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(txn.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <p className="text-center text-muted mt-6">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
