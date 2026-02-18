import { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'];

export default function ExpenseForm({ onExpenseAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      if (!formData.amount || isNaN(parseFloat(formData.amount))) {
        throw new Error('Please enter a valid amount');
      }

      // Convert amount to cents (integer)
      const amountInCents = Math.round(parseFloat(formData.amount) * 100);

      if (amountInCents <= 0) {
        throw new Error('Amount must be greater than zero');
      }

      await onExpenseAdded({
        ...formData,
        amount: amountInCents,
      });

      // Reset form
      setFormData({
        amount: '',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={20} className="text-primary" />
        Add New Expense
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="label">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Description</label>
          <input
            type="text"
            placeholder="What was this for?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{error}</p>}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}
