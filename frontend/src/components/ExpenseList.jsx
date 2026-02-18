import { format } from 'date-fns';
import { Filter, ArrowUpDown, TrendingDown } from 'lucide-react';

export default function ExpenseList({ expenses, loading, filters, setFilters }) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0) / 100;

  if (loading && expenses.length === 0) {
    return (
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Summary Card */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, var(--primary), #818cf8)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{ opacity: 0.8, fontSize: '0.875rem', fontWeight: 600 }}>Total Filtered Expenses</p>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.25rem' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
        </div>
        <TrendingDown size={48} style={{ opacity: 0.3 }} />
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          <Filter size={18} className="text-muted" />
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            style={{ padding: '0.5rem' }}
          >
            <option value="">All Categories</option>
            {['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={18} className="text-muted" />
          <select
            value={filters.sort}
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
            style={{ padding: '0.5rem' }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No expenses found.
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                    <td style={tdStyle}>{format(new Date(expense.date), 'MMM dd, yyyy')}</td>
                    <td style={tdStyle}>
                      <span style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem'
                      }}>
                        {expense.category}
                      </span>
                    </td>
                    <td style={tdStyle}>{expense.description || '-'}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--text)' }}>
                      ${(expense.amount / 100).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

const thStyle = {
  padding: '1rem 1.5rem',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  letterSpacing: '0.05em'
};

const tdStyle = {
  padding: '1rem 1.5rem',
  fontSize: '0.875rem'
};
