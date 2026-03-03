/* Sample Data Loading Script */
/* To use: Paste this in browser DevTools Console while app is running */

// Sample expenses data
const sampleExpenses = [
  {
    id: Date.now() - 86400000 * 5,
    description: "Grocery shopping",
    amount: "85.50",
    category: "Food",
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0]
  },
  {
    id: Date.now() - 86400000 * 4,
    description: "Gas fill-up",
    amount: "45.00",
    category: "Transportation",
    date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0]
  },
  {
    id: Date.now() - 86400000 * 3,
    description: "Movie tickets",
    amount: "30.00",
    category: "Entertainment",
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0]
  },
  {
    id: Date.now() - 86400000 * 2,
    description: "Doctor visit",
    amount: "120.00",
    category: "Healthcare",
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0]
  },
  {
    id: Date.now() - 86400000,
    description: "Electricity bill",
    amount: "95.00",
    category: "Utilities",
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
  },
  {
    id: Date.now() - 3600000,
    description: "Restaurant dinner",
    amount: "65.50",
    category: "Food",
    date: new Date(Date.now() - 3600000).toISOString().split('T')[0]
  },
  {
    id: Date.now() - 1800000,
    description: "Taxi ride",
    amount: "22.00",
    category: "Transportation",
    date: new Date(Date.now() - 1800000).toISOString().split('T')[0]
  },
  {
    id: Date.now(),
    description: "Game purchase",
    amount: "59.99",
    category: "Entertainment",
    date: new Date().toISOString().split('T')[0]
  }
];

// Load sample data to localStorage
localStorage.setItem('expenses', JSON.stringify(sampleExpenses));

// Reload the page to see the data
console.log('✅ Sample data loaded! Reloading page...');
setTimeout(() => {
  window.location.reload();
}, 1000);
