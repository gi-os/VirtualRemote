import GlassCard from '../components/GlassCard';
import CodeBlock from '../components/CodeBlock';
import CollapsibleSection from '../components/CollapsibleSection';
import { codeExamples } from '../data/commands';

export default function SendingCommands() {
  const buttonExamples = codeExamples.filter(e => e.category === 'button-press');
  const powerExamples = codeExamples.filter(e => e.category === 'power-activity');
  const mediaExamples = codeExamples.filter(e => e.category === 'media');
  const irExamples = codeExamples.filter(e => e.category === 'ir');

  return (
    <section id="commands" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Sending Commands</h2>
      <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
        Every command flows through the critical endpoint{' '}
        <code>PUT /api/entities/&#123;entityId&#125;/command</code>. The payload structure is
        always <code>&#123; "cmd_id": "...", "params": &#123;&#125; &#125;</code>.
      </p>

      {/* Payload structure */}
      <GlassCard glow="#4facfe" style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ marginBottom: 'var(--space-sm)' }}>Payload Structure</h3>
        <CodeBlock
          language="json"
          title="Command payload"
          code={`{
  "cmd_id": "<entity_type>.<command>",
  "params": { ... }
}`}
        />
        <div style={{
          marginTop: 'var(--space-md)',
          padding: '12px 16px',
          borderRadius: 'var(--glass-radius-sm)',
          background: 'rgba(255, 159, 10, 0.08)',
          border: '1px solid rgba(255, 159, 10, 0.15)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}>
          <strong style={{ color: 'var(--accent-orange)' }}>Note:</strong> REST uses the fully qualified form
          (<code>remote.send_cmd</code>), while WebSocket uses the short form (<code>send_cmd</code>).
        </div>
      </GlassCard>

      {/* Button press examples */}
      <h3 style={{ marginBottom: 'var(--space-md)' }}>Button Press Commands</h3>
      {buttonExamples.map(ex => (
        <CollapsibleSection key={ex.id} title={ex.title} defaultOpen={ex.id === 'single-press'}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{ex.description}</p>
          <CodeBlock language={ex.language} code={ex.code} title={ex.title} />
        </CollapsibleSection>
      ))}

      {/* Power & Activity */}
      <h3 style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Power & Activity Commands</h3>
      <GlassCard variant="subtle">
        {powerExamples.map(ex => (
          <div key={ex.id} style={{ marginBottom: 'var(--space-sm)' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '2px' }}>{ex.title}</h4>
            <CodeBlock language={ex.language} code={ex.code} />
          </div>
        ))}
      </GlassCard>

      {/* Media Player */}
      <h3 style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Media Player Commands</h3>
      <GlassCard variant="subtle">
        {mediaExamples.map(ex => (
          <div key={ex.id} style={{ marginBottom: 'var(--space-sm)' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '2px' }}>{ex.title}</h4>
            <CodeBlock language={ex.language} code={ex.code} />
          </div>
        ))}
      </GlassCard>

      {/* IR Emitter */}
      <h3 style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>IR Emitter</h3>
      <GlassCard variant="subtle">
        {irExamples.map(ex => (
          <div key={ex.id} style={{ marginBottom: 'var(--space-sm)' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '2px' }}>{ex.title}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{ex.description}</p>
            <CodeBlock language={ex.language} code={ex.code} />
          </div>
        ))}
      </GlassCard>

      {/* Command name reference */}
      <h3 style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Standard Command Names</h3>
      <GlassCard variant="subtle">
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
          Command names for <code>remote.send_cmd</code> follow a standardized convention — max 20 characters, no whitespace:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            'CURSOR_UP', 'CURSOR_DOWN', 'CURSOR_LEFT', 'CURSOR_RIGHT', 'CURSOR_ENTER',
            'BACK', 'HOME', 'MENU', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE_TOGGLE',
            'PLAY_PAUSE', 'STOP', 'PREVIOUS', 'NEXT', 'FAST_FORWARD', 'REWIND',
            'DIGIT_0', 'DIGIT_1', 'DIGIT_2', 'DIGIT_3', 'DIGIT_4', 'DIGIT_5',
            'DIGIT_6', 'DIGIT_7', 'DIGIT_8', 'DIGIT_9',
            'CHANNEL_UP', 'CHANNEL_DOWN',
            'RED', 'GREEN', 'YELLOW', 'BLUE',
            'POWER', 'INPUT_HDMI1', 'APP_NETFLIX',
          ].map(cmd => (
            <span key={cmd} style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: 'var(--glass-radius-pill)',
              background: 'rgba(100, 210, 255, 0.08)',
              border: '1px solid rgba(100, 210, 255, 0.15)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-cyan)',
              fontWeight: 500,
            }}>
              {cmd}
            </span>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
