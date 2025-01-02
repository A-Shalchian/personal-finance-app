"use client";
import React, { useState } from "react";
import AddExpenseForm from "./components/AddExpenseForm";

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<
    { title: string; amount: number; recurrence: string }[]
  >([]);

  const addExpense = (title: string, amount: number, recurrence: string) => {
    setExpenses([...expenses, { title, amount, recurrence }]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-1/6 bg-gray-800 text-white p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Finance Tracker</h1>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded">Add Expense</li>
          <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
          {/* Additional Tabs Can Be Added Here */}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="w-5/6 p-6 bg-gray-200">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        <AddExpenseForm onAddExpense={addExpense} />

        <h3 className="text-xl font-bold mt-8">Expenses</h3>
        <ul className="mt-4">
          {expenses.map((expense, index) => (
            <li key={index} className="p-4 bg-white shadow-md rounded mb-2">
              <strong>{expense.title}</strong>: ${expense.amount} (
              {expense.recurrence})
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
