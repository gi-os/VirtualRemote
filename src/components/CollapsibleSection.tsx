import { useState, useRef, type ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{
      borderRadius: 'var(--glass-radius-sm)',
      border: '1px solid',
      borderColor: isOpen ? 'var(--glass-border-bright)' : 'var(--glass-border)',
      background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
      transition: 'all var(--transition-normal)',
      overflow: 'hidden',
      marginBottom: 'var(--space-sm)',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.95rem',
          fontWeight: 600,
          textAlign: 'left' as const,
        }}
      >
        {title}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'transform var(--transition-normal)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--text-tertiary)',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s var(--ease-out), opacity 0.3s var(--ease-out)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0 18px 18px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
