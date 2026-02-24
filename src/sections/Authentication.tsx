import GlassCard from '../components/GlassCard';
import CodeBlock from '../components/CodeBlock';

export default function Authentication() {
  return (
    <section id="authentication" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Authentication</h2>
      <p style={{ marginBottom: 'var(--space-lg)' }}>
        Three authentication methods are supported. Any of them works for every endpoint.
        To obtain credentials: tap the profile icon on the remote's touchscreen, enable the
        Web Configurator — the 4-digit PIN appears on screen. Username is always <code>web-configurator</code>.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <GlassCard glow="#34c759">
          <h3 style={{ marginBottom: 'var(--space-sm)' }}>HTTP Basic Auth</h3>
          <p style={{ fontSize: '0.88rem', marginBottom: 'var(--space-sm)' }}>
            Send credentials as <code>Authorization: Basic base64(user:pass)</code>.
            Simplest method for quick testing.
          </p>
          <CodeBlock
            language="bash"
            title="Basic Auth"
            code={`curl --user 'web-configurator:1234' \\
  http://<remote-ip>/api/entities`}
          />
        </GlassCard>

        <GlassCard glow="#4facfe">
          <h3 style={{ marginBottom: 'var(--space-sm)' }}>API Key (Bearer Token)</h3>
          <p style={{ fontSize: '0.88rem', marginBottom: 'var(--space-sm)' }}>
            Generate a persistent key via <code>POST /api/auth/api_keys</code> with Basic Auth.
            Use the returned token as a Bearer token for all subsequent requests.
          </p>
          <CodeBlock
            language="bash"
            title="Create API Key"
            code={`# Generate key
curl -X POST 'http://<remote-ip>/api/auth/api_keys' \\
  --user 'web-configurator:1234' \\
  -H 'Content-Type: application/json' \\
  -d '{"name": "my-app"}'

# Use key
curl -H "Authorization: Bearer BtlCEne.OWU2..." \\
  http://<remote-ip>/api/entities`}
          />
        </GlassCard>

        <GlassCard glow="#ff9f0a">
          <h3 style={{ marginBottom: 'var(--space-sm)' }}>Session Cookie</h3>
          <p style={{ fontSize: '0.88rem', marginBottom: 'var(--space-sm)' }}>
            Login via <code>POST /api/pub/login</code> to receive a session cookie.
            Ideal for browser-based sessions.
          </p>
          <CodeBlock
            language="bash"
            title="Session Login"
            code={`curl -X POST 'http://<remote-ip>/api/pub/login' \\
  -H 'Content-Type: application/json' \\
  -d '{"username":"web-configurator","password":"1234"}' \\
  -c cookies.txt

# Use session
curl -b cookies.txt http://<remote-ip>/api/entities`}
          />
        </GlassCard>

        {/* Auth table */}
        <GlassCard variant="subtle">
          <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Method</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Format</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--accent-green)' }}>Basic Auth</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Authorization: Basic ...</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>Quick testing, scripts</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--accent-blue)' }}>API Key</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Authorization: Bearer ...</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>Production apps, integrations</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 12px', color: 'var(--accent-orange)' }}>Session Cookie</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Cookie from POST /api/pub/login</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>Browser-based UIs</td>
              </tr>
            </tbody>
          </table>
        </GlassCard>
      </div>
    </section>
  );
}
