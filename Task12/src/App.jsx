import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import ExpenseChart from './components/ExpenseChart';
import SummaryCard from './components/SummaryCard';
import './styles/app.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense) => {
    if (editingId) {
      setExpenses(expenses.map(e => e.id === editingId ? { ...expense, id: editingId } : e));
      setEditingId(null);
      setEditingExpense(null);
    } else {
      const newExpense = { ...expense, id: Date.now() };
      setExpenses([newExpense, ...expenses]);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingId(expense.id);
    setEditingExpense(expense);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingExpense(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingExpense(null);
  };

  const filteredExpenses = filteredCategory === 'All'
    ? expenses
    : expenses.filter(e => e.category === filteredCategory);

  const categories = ['All', ...new Set(expenses.map(e => e.category))];
  const totalAmount = filteredExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Manage your finances with ease</p>
      </header>

      <main className="app-main">
        <div className="app-grid">
          <section className="form-section">
            <ExpenseForm 
              onAddExpense={handleAddExpense}
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />
          </section>

          <section className="sidebar">
            <SummaryCard 
              total={totalAmount}
              count={filteredExpenses.length}
            />
            <CategoryFilter
              categories={categories}
              selectedCategory={filteredCategory}
              onCategoryChange={setFilteredCategory}
            />
          </section>
        </div>

        <section className="chart-section">
          <ExpenseChart expenses={expenses} />
        </section>

        <section className="list-section">
          <ExpenseList
            expenses={filteredExpenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
