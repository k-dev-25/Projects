import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFinance } from "../context/FinanceContext";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  category: yup.string().required("Category is required"),
  type: yup.string().required("Transaction type is required"),
  date: yup.string().required("Date is required"),
  notes: yup.string().max(250, "Notes can be at most 250 characters"),
  recurring: yup.boolean(),
});

const AddTransaction = () => {
  const { addTransaction, transactions } = useFinance();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "expense",
      category: "Food",
      recurring: false,
    },
  });

  const onSubmit = (data) => {
    const amount = Number(data.amount);
    const lastId = transactions.reduce((maxId, txn) => Math.max(maxId, Number(txn.id) || 0), 0);
    addTransaction({
      ...data,
      id: lastId + 1,
      amount: data.type === "expense" ? -Math.abs(amount) : Math.abs(amount),
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-6">Add Transaction</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Title */}
        <input
          placeholder="Title"
          {...register("title")}
          className="w-full p-2 rounded bg-card"
        />
        <p className="text-red-400 text-sm">{errors.title?.message}</p>

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          {...register("amount")}
          className="w-full p-2 rounded bg-card"
        />
        <p className="text-red-400 text-sm">{errors.amount?.message}</p>

        {/* Category */}
        <select {...register("category")} className="w-full p-2 rounded bg-card">
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Utilities">Utilities</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Income">Income</option>
        </select>
        <p className="text-red-400 text-sm">{errors.category?.message}</p>

        {/* Type */}
        <select {...register("type")} className="w-full p-2 rounded bg-card">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <p className="text-red-400 text-sm">{errors.type?.message}</p>

        {/* Date */}
        <input
          type="date"
          {...register("date")}
          className="w-full p-2 rounded bg-card"
        />
        <p className="text-red-400 text-sm">{errors.date?.message}</p>

        <textarea
          rows={3}
          placeholder="Notes"
          {...register("notes")}
          className="w-full p-2 rounded bg-card"
        />
        <p className="text-red-400 text-sm">{errors.notes?.message}</p>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("recurring")} />
          Mark as recurring
        </label>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-xl"
        >
          Add Transaction
        </button>

      </form>
    </div>
  );
};

export default AddTransaction;