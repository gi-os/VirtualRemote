import { useState, useMemo } from 'react';
import type { ApiEndpoint, HttpMethod, EndpointCategory, SortDirection } from '../types';
import MethodBadge from './MethodBadge';

interface EndpointTableProps {
  endpoints: ApiEndpoint[];
}

const categories: { value: EndpointCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'public', label: 'Public' },
  { value: 'auth', label: 'Auth' },
  { value: 'entities', label: 'Entities' },
  { value: 'activities', label: 'Activities' },
  { value: 'macros', label: 'Macros' },
  { value: 'remotes', label: 'Remotes' },
  { value: 'ir', label: 'IR' },
  { value: 'profiles', label: 'Profiles' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'configuration', label: 'Config' },
  { value: 'system', label: 'System' },
  { value: 'resources', label: 'Resources' },
  { value: 'dock', label: 'Docks' },
];

const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'];

export default function EndpointTable({ endpoints }: EndpointTableProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<EndpointCategory | 'all'>('all');
  const [activeMethod, setActiveMethod] = useState<HttpMethod | 'all'>('all');
  const [sortCol, setSortCol] = useState<'path' | 'method'>('path');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const filtered = useMemo(() => {
    let result = endpoints;
    if (activeCategory !== 'all') result = result.filter(e => e.category === activeCategory);
    if (activeMethod !== 'all') result = result.filter(e => e.method === activeMethod);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e =>
        e.path.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
      );
    }
    if (sortDir) {
      result = [...result].sort((a, b) => {
        const va = a[sortCol];
        const vb = b[sortCol];
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
    return result;
  }, [endpoints, search, activeCategory, activeMethod, sortCol, sortDir]);

  const handleSort = (col: 'path' | 'method') => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const pillStyle = (active: boolean, color?: string) => ({
    padding: '5px 14px',
    borderRadius: 'var(--glass-radius-pill)',
    border: '1px solid',
    borderColor: active ? (color || 'var(--accent-blue)') + '44' : 'rgba(255,255,255,0.08)',
    background: active ? (color || 'var(--accent-blue)') + '18' : 'rgba(255,255,255,0.04)',
    color: active ? (color || 'var(--accent-blue)') : 'var(--text-tertiary)',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontFamily: 'var(--font-sans)',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search endpoints..."
          style={{
            width: '100%',
            padding: '12px 18px',
            borderRadius: 'var(--glass-radius-sm)',
            border: '1px solid var(--glass-border)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-sans)',
            outline: 'none',
            transition: 'border-color var(--transition-fast)',
            backdropFilter: 'blur(8px)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
          onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
        />
      </div>

      {/* Category filter pills */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px',
        marginBottom: 'var(--space-md)',
      }}>
        {categories.map(c => (
          <button key={c.value} onClick={() => setActiveCategory(c.value)}
            style={pillStyle(activeCategory === c.value)}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Method filter pills */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px',
        marginBottom: 'var(--space-lg)',
      }}>
        <button onClick={() => setActiveMethod('all')}
          style={pillStyle(activeMethod === 'all')}>
          All Methods
        </button>
        {methods.map(m => (
          <button key={m} onClick={() => setActiveMethod(m)}
            style={pillStyle(activeMethod === m, `var(--method-${m.toLowerCase()})`)}>
            {m}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{
        fontSize: '0.8rem', color: 'var(--text-tertiary)',
        marginBottom: 'var(--space-sm)',
      }}>
        {filtered.length} endpoint{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0 4px',
          fontSize: '0.85rem',
        }}>
          <thead>
            <tr>
              <th onClick={() => handleSort('method')} style={{
                ...thStyle,
                cursor: 'pointer',
                userSelect: 'none',
                width: '90px',
              }}>
                Method {sortCol === 'method' ? (sortDir === 'asc' ? '↑' : sortDir === 'desc' ? '↓' : '') : ''}
              </th>
              <th onClick={() => handleSort('path')} style={{
                ...thStyle,
                cursor: 'pointer',
                userSelect: 'none',
              }}>
                Path {sortCol === 'path' ? (sortDir === 'asc' ? '↑' : sortDir === 'desc' ? '↓' : '') : ''}
              </th>
              <th style={thStyle}>Description</th>
              <th style={{ ...thStyle, width: '50px', textAlign: 'center' }}>Auth</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(ep => (
              <tr key={ep.id} style={{
                transition: 'background var(--transition-fast)',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={tdStyle}><MethodBadge method={ep.method} /></td>
                <td style={{ ...tdStyle, fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
                  {ep.path}
                </td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>{ep.description}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  {ep.authRequired ? (
                    <span style={{ color: 'var(--accent-orange)', fontSize: '0.75rem' }}>Required</span>
                  ) : (
                    <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem' }}>Public</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 14px',
  color: 'var(--text-tertiary)',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid var(--glass-border)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
  verticalAlign: 'top',
};
