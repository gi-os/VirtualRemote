import { useState, type FormEvent } from 'react';
import { Wifi } from 'lucide-react';
import { useConnection } from '../ConnectionContext';
import GlassCard from './GlassCard';

export default function ConnectionScreen() {
  const { state, connect } = useConnection();
  const [username, setUsername] = useState('web-configurator');
  const [password, setPassword] = useState('1234');

  const loading = state.status === 'connecting';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loading) connect(username, password);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'var(--space-xl)',
    }}>
      <GlassCard variant="elevated" glow="#4facfe" style={{
        maxWidth: 380,
        width: '100%',
        padding: 'var(--space-xl)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <Wifi size={40} color="var(--accent-blue)" style={{ marginBottom: 'var(--space-sm)' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>Virtual Remote</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            Connect to your UC Remote 3
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '4px',
            }}>
              Username
            </label>
            <input
              className="glass-input"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="web-configurator"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '4px',
            }}>
              PIN
            </label>
            <input
              className="glass-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="1234"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {state.error && (
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--glass-radius-sm)',
              border: '1px solid rgba(255,69,58,0.3)',
              background: 'rgba(255,69,58,0.1)',
              color: 'var(--accent-red)',
              fontSize: '0.82rem',
            }}>
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="glass-button"
            disabled={loading || !username || !password}
            style={{
              marginTop: 'var(--space-sm)',
              width: '100%',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          color: 'var(--text-tertiary)',
          marginTop: 'var(--space-md)',
        }}>
          Credentials are saved locally for auto-reconnect.
        </p>
      </GlassCard>
    </div>
  );
}
