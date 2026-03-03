import React from 'react';
import '../styles/summaryCard.css';

const SummaryCard = ({ total, count }) => {
  return (
    <div className="summary-card">
      <div className="summary-item">
        <div className="summary-label">Total Expenses</div>
        <div className="summary-value">${total.toFixed(2)}</div>
      </div>
      <div className="summary-item">
        <div className="summary-label">Number of Expenses</div>
        <div className="summary-value">{count}</div>
      </div>
      <div className="summary-average">
        <div className="summary-label">Average</div>
        <div className="summary-value">
          ${count > 0 ? (total / count).toFixed(2) : '0.00'}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
