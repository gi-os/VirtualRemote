import GlassCard from '../components/GlassCard';
import CodeBlock from '../components/CodeBlock';

export default function Discovery() {
  return (
    <section id="discovery" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>mDNS Discovery</h2>
      <p style={{ marginBottom: 'var(--space-lg)' }}>
        The remote announces itself via mDNS/DNS-SD with service type{' '}
        <code>_uc-remote._tcp</code>. The TXT record includes model number,
        API version, and IP address for automatic discovery.
      </p>

      <GlassCard>
        <h3 style={{ marginBottom: 'var(--space-sm)' }}>TXT Record Fields</h3>
        <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Field</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Example</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['ver', '1.2.0', 'Firmware version'],
              ['ver_api', '0.10.0', 'API version'],
              ['model', 'UCR3', 'Model: UCR3, UCR2, or UCR2-simulator'],
              ['https_port', '443', 'HTTPS port number'],
            ].map(([field, example, desc], i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>{field}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{example}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
        <GlassCard variant="subtle">
          <h4 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>macOS</h4>
          <CodeBlock language="bash" code={`dns-sd -Z _uc-remote._tcp local.`} />
        </GlassCard>
        <GlassCard variant="subtle">
          <h4 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>Linux</h4>
          <CodeBlock language="bash" code={`avahi-browse -r _uc-remote._tcp`} />
        </GlassCard>
      </div>
    </section>
  );
}
