import { type ReactNode, type CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'subtle' | 'code';
  className?: string;
  style?: CSSProperties;
  glow?: string;
  id?: string;
}

const baseStyle: CSSProperties = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
  WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
  border: '1px solid var(--glass-border)',
  borderRadius: 'var(--glass-radius)',
  boxShadow: 'var(--glass-shadow), var(--glass-inner-glow)',
  position: 'relative' as const,
  overflow: 'hidden',
  padding: 'var(--space-lg)',
};

const variants: Record<string, CSSProperties> = {
  elevated: {
    background: 'var(--glass-bg-elevated)',
    boxShadow: 'var(--glass-shadow-elevated), var(--glass-inner-glow)',
    border: '1px solid var(--glass-border-bright)',
  },
  subtle: {
    background: 'rgba(255,255,255,0.03)',
    boxShadow: 'none',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  code: {
    background: 'var(--bg-code)',
    padding: '0',
    borderRadius: 'var(--glass-radius-sm)',
  },
};

export default function GlassCard({ children, variant = 'default', className = '', style, glow, id }: GlassCardProps) {
  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(variant !== 'default' ? variants[variant] : {}),
    ...style,
  };

  return (
    <div className={`glass-card ${className}`} style={mergedStyle} id={id}>
      {/* Liquid shine highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: glow
            ? `linear-gradient(135deg, ${glow}15 0%, transparent 50%, ${glow}08 100%)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
