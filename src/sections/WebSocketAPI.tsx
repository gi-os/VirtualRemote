import GlassCard from '../components/GlassCard';
import CodeBlock from '../components/CodeBlock';
import { codeExamples } from '../data/commands';

export default function WebSocketAPI() {
  const wsExamples = codeExamples.filter(e => e.category === 'websocket');

  return (
    <section id="websocket" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>WebSocket API</h2>
      <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
        Real-time events and commands via <code>ws://&lt;remote-ip&gt;/ws</code> (or{' '}
        <code>wss://</code> for TLS). Authenticate by passing the <code>API-KEY</code> header
        during the WebSocket upgrade handshake, or use a session cookie.
      </p>

      {/* Message types */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        <GlassCard glow="#4facfe">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '6px' }}>
            req
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            Client → Remote request. Includes <code>id</code>, <code>msg</code>, and <code>msg_data</code>.
          </p>
        </GlassCard>
        <GlassCard glow="#34c759">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-green)', marginBottom: '6px' }}>
            resp
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            Remote → Client response. Matches <code>req_id</code> to original request.
            Contains <code>code</code> (HTTP-style status).
          </p>
        </GlassCard>
        <GlassCard glow="#ff9f0a">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '6px' }}>
            event
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            Remote → Client push notification. Sent after subscribing. Includes <code>cat</code> (category)
            and <code>ts</code> (timestamp).
          </p>
        </GlassCard>
      </div>

      {/* Examples */}
      {wsExamples.map(ex => (
        <div key={ex.id} style={{ marginBottom: 'var(--space-md)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{ex.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{ex.description}</p>
          <CodeBlock language={ex.language} code={ex.code} title={ex.title} />
        </div>
      ))}

      {/* Important note */}
      <GlassCard variant="subtle" style={{ marginTop: 'var(--space-md)' }}>
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--glass-radius-sm)',
          background: 'rgba(175, 82, 222, 0.08)',
          border: '1px solid rgba(175, 82, 222, 0.15)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}>
          <strong style={{ color: 'var(--accent-purple)' }}>Key difference:</strong> In WebSocket messages,{' '}
          <code>cmd_id</code> uses the <strong>short form</strong> (<code>send_cmd</code>) rather than
          the fully qualified REST form (<code>remote.send_cmd</code>).
        </div>
      </GlassCard>
    </section>
  );
}
