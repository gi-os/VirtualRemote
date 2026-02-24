import { useState, useEffect } from 'react';
import { sections } from '../data/sections';

interface SidebarProps {
  activeSection: string;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isMobile) setMobileOpen(false);
  };

  const nav = (
    <nav style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      padding: 'var(--space-sm)',
    }}>
      {sections.map(s => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: 'var(--glass-radius-sm)',
              border: 'none',
              background: isActive ? 'rgba(79, 172, 254, 0.12)' : 'transparent',
              color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontSize: '0.88rem',
              fontWeight: isActive ? 600 : 450,
              cursor: 'pointer',
              textAlign: 'left' as const,
              transition: 'all var(--transition-fast)',
              fontFamily: 'var(--font-sans)',
              width: '100%',
              position: 'relative' as const,
            }}
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={e => {
              if (!isActive) e.currentTarget.style.background = 'transparent';
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '20px',
                borderRadius: '0 3px 3px 0',
                background: 'var(--accent-blue)',
                boxShadow: '0 0 8px var(--accent-blue)',
              }} />
            )}
            {s.label}
          </button>
        );
      })}
    </nav>
  );

  if (isMobile) {
    return (
      <>
        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            position: 'fixed',
            top: '14px',
            left: '14px',
            zIndex: 1001,
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
          />
        )}

        {/* Drawer */}
        <aside style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '280px',
          background: 'rgba(15, 15, 24, 0.95)',
          backdropFilter: 'blur(var(--glass-blur-heavy))',
          borderRight: '1px solid var(--glass-border)',
          zIndex: 1000,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s var(--ease-out)',
          paddingTop: '60px',
          overflowY: 'auto',
        }}>
          {nav}
        </aside>
      </>
    );
  }

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 'var(--sidebar-width)',
      height: '100vh',
      background: 'rgba(10, 10, 15, 0.7)',
      backdropFilter: 'blur(var(--glass-blur-heavy)) saturate(var(--glass-saturate))',
      WebkitBackdropFilter: 'blur(var(--glass-blur-heavy)) saturate(var(--glass-saturate))',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        padding: 'var(--space-lg) var(--space-lg) var(--space-md)',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          UC Remote 3
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-tertiary)',
          marginTop: '2px',
        }}>
          API Reference v0.10.0
        </div>
      </div>

      {nav}

      {/* Footer */}
      <div style={{
        marginTop: 'auto',
        padding: 'var(--space-md) var(--space-lg)',
        borderTop: '1px solid var(--glass-border)',
        fontSize: '0.72rem',
        color: 'var(--text-tertiary)',
      }}>
        <a href="https://github.com/unfoldedcircle/core-api" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--text-tertiary)' }}>
          GitHub: core-api
        </a>
        <span style={{ margin: '0 6px' }}>·</span>
        <a href="https://unfoldedcircle.github.io/core-api/" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--text-tertiary)' }}>
          Docs
        </a>
      </div>
    </aside>
  );
}
