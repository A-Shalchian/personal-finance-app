// AddExpenseForm.tsx
import React, { useState } from "react";

interface AddExpenseFormProps {
  onAddExpense: (title: string, amount: number, recurrence: string) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [recurrence, setRecurrence] = useState("Monthly");

  const numericAmount = Number(amount);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && numericAmount > 0) {
      onAddExpense(title, numericAmount, recurrence);
      setTitle("");
      setAmount("");
      setRecurrence("Monthly");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <div className="mb-4 w-1/2">
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-5"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Groceries"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4 w-1/2">
        <label
          htmlFor="amount"
          className="block text-gray-700 font-semibold mb-2"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4 w-1/2">
        <label
          htmlFor="recurrence"
          className="block text-gray-700 font-semibold mb-2"
        >
          Recurrence
        </label>
        <select
          id="recurrence"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Monthly">Monthly</option>
          <option value="Weekly">Weekly</option>
          <option value="Biweekly">Biweekly</option>
          <option value="One-time">One-time</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
