import { Smartphone, LayoutGrid } from 'lucide-react';

export type TabId = 'remote' | 'devices';

interface TabBarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Smartphone }[] = [
  { id: 'remote', label: 'Remote', icon: Smartphone },
  { id: 'devices', label: 'Devices', icon: LayoutGrid },
];

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      display: 'flex',
      borderRadius: 'var(--glass-radius-sm)',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
      WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
      border: '1px solid var(--glass-border)',
      overflow: 'hidden',
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px 0',
              border: 'none',
              background: isActive ? 'rgba(79,172,254,0.12)' : 'transparent',
              color: isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)',
              fontSize: '0.82rem',
              fontWeight: isActive ? 600 : 400,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderBottom: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
            }}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
