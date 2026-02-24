import GlassCard from '../components/GlassCard';
import CodeBlock from '../components/CodeBlock';
import { codeExamples } from '../data/commands';

export default function Simulator() {
  const dockerExample = codeExamples.find(e => e.id === 'docker-compose');

  return (
    <section id="simulator" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Core Simulator</h2>
      <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
        Develop without physical hardware using the Docker-based core simulator. It exposes
        the identical REST and WebSocket APIs at <code>localhost:8080</code>.
      </p>

      {dockerExample && (
        <CodeBlock language={dockerExample.language} code={dockerExample.code} title="docker-compose.yml" />
      )}

      <CodeBlock
        language="bash"
        title="Start simulator"
        code={`docker compose up -d
# API available at http://localhost:8080/api/
# HTTPS at https://localhost:8443/api/`}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
        <GlassCard glow="#34c759">
          <h4 style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>Default Credentials</h4>
          <div style={{ fontSize: '0.88rem' }}>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Username: </span>
              <code>web-configurator</code>
            </div>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Password: </span>
              <code>1234</code>
            </div>
          </div>
        </GlassCard>
        <GlassCard glow="#4facfe">
          <h4 style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>Ports</h4>
          <div style={{ fontSize: '0.88rem' }}>
            <div style={{ marginBottom: '4px' }}>
              <code>8080</code> <span style={{ color: 'var(--text-tertiary)' }}>→ HTTP API</span>
            </div>
            <div>
              <code>8443</code> <span style={{ color: 'var(--text-tertiary)' }}>→ HTTPS API</span>
            </div>
          </div>
        </GlassCard>
        <GlassCard glow="#ff9f0a">
          <h4 style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>Environment</h4>
          <div style={{ fontSize: '0.88rem' }}>
            <div style={{ marginBottom: '4px' }}>
              <code>UC_MODEL=UCR3</code>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              Set model to UCR3, UCR2
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
