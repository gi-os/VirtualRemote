import type { HttpMethod } from '../types';

const methodStyles: Record<HttpMethod, { bg: string; color: string }> = {
  GET: { bg: 'rgba(52, 199, 89, 0.15)', color: 'var(--method-get)' },
  POST: { bg: 'rgba(255, 159, 10, 0.15)', color: 'var(--method-post)' },
  PUT: { bg: 'rgba(79, 172, 254, 0.15)', color: 'var(--method-put)' },
  PATCH: { bg: 'rgba(175, 82, 222, 0.15)', color: 'var(--method-patch)' },
  DELETE: { bg: 'rgba(255, 69, 58, 0.15)', color: 'var(--method-delete)' },
  HEAD: { bg: 'rgba(142, 142, 147, 0.15)', color: 'var(--method-head)' },
};

export default function MethodBadge({ method }: { method: HttpMethod }) {
  const { bg, color } = methodStyles[method];
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 'var(--glass-radius-pill)',
      background: bg,
      color,
      fontSize: '0.72rem',
      fontWeight: 700,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.04em',
      lineHeight: 1.4,
      border: `1px solid ${color}22`,
      minWidth: '56px',
      textAlign: 'center' as const,
    }}>
      {method}
    </span>
  );
}
