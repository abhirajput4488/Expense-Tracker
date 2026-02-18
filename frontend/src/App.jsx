import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import Register from './components/Register';
import { expenseService } from './services/api';
import { Wallet, LogOut, User } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    sort: 'newest',
  });
  const { user, logout } = useAuth();

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await expenseService.getExpenses(filters);
      setExpenses(data.data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = async (expenseData) => {
    const response = await expenseService.createExpense(expenseData);
    if (response.success) {
      fetchExpenses();
    }
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'var(--card-bg)',
          padding: '0.75rem 1.5rem',
          borderRadius: '2rem',
          border: '1px solid var(--border)'
        }}>
          <Wallet size={24} className="text-primary" />
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>ExpenseTracker</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <User size={18} />
            <span style={{ fontWeight: 600 }}>{user?.name}</span>
          </div>
          <button onClick={logout} style={{
            background: 'none',
            border: 'none',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="grid-layout">
        <aside>
          <ExpenseForm onExpenseAdded={handleAddExpense} />
        </aside>

        <section>
          <ExpenseList
            expenses={expenses}
            loading={loading}
            filters={filters}
            setFilters={setFilters}
          />
        </section>
      </main>

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        &copy; 2024 Expense Tracker. Built with MERN Stack.
      </footer>
    </div>
  );
}

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loading-spinner"></div>
    </div>
  );

  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
