import { useState } from 'react';
import { Settings, LogOut, Trash2 } from 'lucide-react';
import { useConnection } from '../ConnectionContext';

export default function StatusBar() {
  const { state, disconnect, forgetCredentials } = useConnection();
  const [menuOpen, setMenuOpen] = useState(false);

  const statusColor =
    state.status === 'connected' ? 'var(--accent-green)' :
    state.status === 'connecting' ? 'var(--accent-orange)' :
    state.status === 'error' ? 'var(--accent-red)' :
    'var(--text-tertiary)';

  const deviceLabel = state.deviceInfo
    ? `${state.deviceInfo.name || state.deviceInfo.model} · v${state.deviceInfo.version}`
    : 'Connecting...';

  const appVersion = `v${__APP_VERSION__}`;

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      borderRadius: 'var(--glass-radius-sm)',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
      WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
      border: '1px solid var(--glass-border)',
      position: 'relative',
    }}>
      {/* Status + device info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: statusColor,
          flexShrink: 0,
          animation: state.status === 'connecting' ? 'statusPulse 1.5s infinite' : 'none',
        }} />
        <span style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {deviceLabel}
        </span>
      </div>

      {/* App version */}
      <span style={{
        fontSize: '0.7rem',
        color: 'var(--text-tertiary)',
        flexShrink: 0,
      }}>
        {appVersion}
      </span>

      {/* Settings button */}
      <button
        onClick={() => setMenuOpen(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '8px',
          border: 'none',
          background: menuOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          flexShrink: 0,
        }}
      >
        <Settings size={16} />
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '6px',
          padding: '6px',
          borderRadius: 'var(--glass-radius-sm)',
          background: 'var(--glass-bg-elevated)',
          backdropFilter: 'blur(var(--glass-blur-heavy))',
          WebkitBackdropFilter: 'blur(var(--glass-blur-heavy))',
          border: '1px solid var(--glass-border-bright)',
          boxShadow: 'var(--glass-shadow-elevated)',
          zIndex: 100,
          minWidth: 180,
        }}>
          <MenuItem
            icon={<LogOut size={14} />}
            label="Disconnect"
            onClick={() => { disconnect(); setMenuOpen(false); }}
          />
          <MenuItem
            icon={<Trash2 size={14} />}
            label="Forget credentials"
            onClick={() => { forgetCredentials(); setMenuOpen(false); }}
            danger
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        padding: '8px 12px',
        borderRadius: '8px',
        border: 'none',
        background: 'transparent',
        color: danger ? 'var(--accent-red)' : 'var(--text-secondary)',
        fontSize: '0.82rem',
        cursor: 'pointer',
        transition: 'background 0.15s ease',
        textAlign: 'left',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {icon}
      {label}
    </button>
  );
}
