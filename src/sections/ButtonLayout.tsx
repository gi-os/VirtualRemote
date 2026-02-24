import GlassCard from '../components/GlassCard';
import ButtonMap from '../components/ButtonMap';
import { buttons } from '../data/buttons';

const zoneColors: Record<string, string> = {
  navigation: 'var(--method-head)',
  dpad: 'var(--accent-blue)',
  color: 'var(--accent-purple)',
  channel: 'var(--accent-purple)',
  media: 'var(--accent-orange)',
  volume: 'var(--accent-green)',
  power: 'var(--accent-red)',
};

export default function ButtonLayout() {
  return (
    <section id="buttons" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Physical Button Layout</h2>
      <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
        The Remote 3 is a slim aluminum wand (198.6 × 45.7 × 9.7 mm, 156g) with a
        3.2" touchscreen, capacitive touch slider, and 21 physical buttons with RGB backlighting.
        Each button supports <code>short_press</code> and <code>long_press</code> (800ms threshold)
        mappings. Retrieve the current mapping with <code>GET /api/cfg/device/button_layout</code>.
      </p>

      {/* Interactive SVG */}
      <GlassCard style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Interactive Remote Diagram</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
          Hover over any button to see its API ID and details. Click to copy.
        </p>
        <ButtonMap />
      </GlassCard>

      {/* Button reference table */}
      <GlassCard variant="subtle">
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Complete Button Reference</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                {['API ID', 'Label', 'Zone', 'Description'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 12px',
                    color: 'var(--text-tertiary)', fontWeight: 600,
                    fontSize: '0.75rem', textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buttons.map(btn => (
                <tr key={btn.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--accent-cyan)',
                    fontWeight: 600,
                  }}>
                    {btn.id}
                  </td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-primary)' }}>{btn.label}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 'var(--glass-radius-pill)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      background: (zoneColors[btn.zone] || 'var(--text-tertiary)') + '18',
                      color: zoneColors[btn.zone] || 'var(--text-tertiary)',
                      border: `1px solid ${(zoneColors[btn.zone] || 'var(--text-tertiary)')}33`,
                    }}>
                      {btn.zone}
                    </span>
                  </td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{btn.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </section>
  );
}
