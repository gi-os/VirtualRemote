import GlassCard from '../components/GlassCard';

export default function Overview() {
  return (
    <section id="overview" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      {/* Hero */}
      <div style={{
        marginBottom: 'var(--space-2xl)',
        position: 'relative',
      }}>
        {/* Floating orbs */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-20px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,172,254,0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'meshFloat 15s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '-60px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(175,82,222,0.10) 0%, transparent 70%)',
          filter: 'blur(25px)',
          animation: 'meshFloat 20s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: 'var(--space-md)',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            UC Remote 3
          </span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple), var(--accent-teal))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Local API Reference
          </span>
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          lineHeight: 1.7,
        }}>
          Complete developer reference for the REST and WebSocket API that gives you
          programmatic control over every entity, activity, button mapping, IR code,
          and macro on the device.
        </p>

        {/* Version badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: 'var(--space-lg)',
          padding: '6px 16px',
          borderRadius: 'var(--glass-radius-pill)',
          background: 'rgba(79,172,254,0.1)',
          border: '1px solid rgba(79,172,254,0.2)',
          fontSize: '0.82rem',
        }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: 'var(--accent-green)',
            boxShadow: '0 0 6px var(--accent-green)',
          }} />
          <span style={{ color: 'var(--text-secondary)' }}>API v0.10.0-beta</span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span style={{ color: 'var(--text-tertiary)' }}>SemVer</span>
        </div>
      </div>

      {/* Info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
        <GlassCard glow="#4facfe">
          <h3 style={{ marginBottom: '8px' }}>REST API</h3>
          <p style={{ fontSize: '0.88rem' }}>
            Full CRUD control at <code>http://&lt;remote-ip&gt;/api/</code> with 60+ endpoints
            covering entities, activities, macros, IR, profiles, and system config.
          </p>
        </GlassCard>
        <GlassCard glow="#af52de">
          <h3 style={{ marginBottom: '8px' }}>WebSocket</h3>
          <p style={{ fontSize: '0.88rem' }}>
            Real-time events at <code>ws://&lt;remote-ip&gt;/ws</code> for live state
            sync — entity changes, activity transitions, and device status.
          </p>
        </GlassCard>
        <GlassCard glow="#5ac8fa">
          <h3 style={{ marginBottom: '8px' }}>Swagger UI</h3>
          <p style={{ fontSize: '0.88rem' }}>
            Explore the full API live at <code>https://&lt;remote-ip&gt;/doc/core-rest</code> with
            the built-in interactive documentation.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
