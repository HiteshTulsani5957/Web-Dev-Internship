import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../styles/expenseChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <div className="expense-chart empty">
        <p>No data to display. Add some expenses to see the chart.</p>
      </div>
    );
  }

  // Aggregate expenses by category
  const categoryTotals = {};
  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
  });

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: amounts,
        backgroundColor: COLORS.slice(0, categories.length),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className="expense-chart">
      <h2>Spending Distribution</h2>
      <div className="chart-container">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
