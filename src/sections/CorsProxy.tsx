import GlassCard from '../components/GlassCard';
import CodeBlock from '../components/CodeBlock';
import { codeExamples } from '../data/commands';

export default function CorsProxy() {
  const proxyExample = codeExamples.find(e => e.id === 'vite-proxy');

  return (
    <section id="cors" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>CORS Workaround</h2>
      <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
        The remote's HTTP server <strong>does not send CORS headers</strong>. No{' '}
        <code>Access-Control-Allow-Origin</code> configuration exists in the firmware.
        For browser-based apps, you <strong>must</strong> use a proxy.
      </p>

      <GlassCard glow="#ff453a" style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: 'var(--space-md)',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '10px',
            background: 'rgba(255, 69, 58, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem',
          }}>
            !
          </div>
          <h3 style={{ margin: 0 }}>Why is this mandatory?</h3>
        </div>
        <p style={{ fontSize: '0.88rem' }}>
          Browsers enforce the Same-Origin Policy. When your React app at{' '}
          <code>localhost:5173</code> makes a fetch to <code>http://192.168.1.100/api/</code>,
          the browser blocks the response because the remote doesn't include CORS headers.
          Community projects universally confirm this by using backend proxies.
        </p>
      </GlassCard>

      <h3 style={{ marginBottom: 'var(--space-sm)' }}>Vite Dev Server Proxy</h3>
      <p style={{ marginBottom: 'var(--space-sm)', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
        In development, Vite's built-in proxy forwards <code>/api/*</code> requests from
        your dev server to the remote. No CORS issues because the browser only talks to localhost.
      </p>
      {proxyExample && (
        <CodeBlock language={proxyExample.language} code={proxyExample.code} title="vite.config.ts" />
      )}

      <GlassCard variant="subtle" style={{ marginTop: 'var(--space-lg)' }}>
        <h3 style={{ marginBottom: 'var(--space-sm)' }}>Production</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          For production, deploy a lightweight Node.js/Express proxy or serve your built app
          from a small server that proxies to the remote. The pattern used by{' '}
          <a href="https://github.com/albaintor/UC-Remote-Two-Toolkit" target="_blank" rel="noopener noreferrer">
            albaintor/UC-Remote-Two-Toolkit
          </a>{' '}
          — Angular frontend proxied through Node.js — is the proven approach.
        </p>
      </GlassCard>
    </section>
  );
}
