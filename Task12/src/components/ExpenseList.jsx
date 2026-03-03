import React from 'react';
import ExpenseItem from './ExpenseItem';
import '../styles/expenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="expense-list empty">
        <div className="empty-state">
          <p>📭 No expenses found</p>
          <p>Add your first expense to get started!</p>
        </div>
      </div>
    );
  }

  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="expense-list">
      <h2>Recent Expenses</h2>
      <div className="expense-items">
        {sortedExpenses.map(expense => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
