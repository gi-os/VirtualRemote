import EndpointTable from '../components/EndpointTable';
import { endpoints } from '../data/endpoints';

export default function EndpointReference() {
  return (
    <section id="endpoints" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>REST Endpoint Reference</h2>
      <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
        Complete reference of all REST endpoints. The API runs at{' '}
        <code>http://&lt;remote-ip&gt;/api/</code> (port 80) and{' '}
        <code>https://&lt;remote-ip&gt;/api/</code> (port 443). The core simulator
        defaults to <code>localhost:8080</code> (HTTP) and <code>localhost:8443</code> (HTTPS).
      </p>
      <EndpointTable endpoints={endpoints} />
    </section>
  );
}
