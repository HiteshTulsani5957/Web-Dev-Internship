import React from 'react';
import '../styles/expenseItem.css';

const CATEGORY_ICONS = {
  Food: '🍽️',
  Transportation: '🚗',
  Entertainment: '🎬',
  Healthcare: '🏥',
  Utilities: '💡',
  Other: '📦'
};

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const icon = CATEGORY_ICONS[expense.category] || '📦';
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(expense.id);
    }
  };

  return (
    <div className="expense-item">
      <div className="expense-icon">{icon}</div>
      <div className="expense-details">
        <h3>{expense.description}</h3>
        <div className="expense-meta">
          <span className="category">{expense.category}</span>
          <span className="date">{formattedDate}</span>
        </div>
      </div>
      <div className="expense-amount">${parseFloat(expense.amount).toFixed(2)}</div>
      <div className="expense-actions">
        <button 
          className="btn-icon edit" 
          onClick={() => onEdit(expense)}
          title="Edit"
        >
          ✏️
        </button>
        <button 
          className="btn-icon delete" 
          onClick={handleDelete}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
