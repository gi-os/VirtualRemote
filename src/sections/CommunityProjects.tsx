import GlassCard from '../components/GlassCard';

interface Project {
  name: string;
  url: string;
  description: string;
  tag: string;
  tagColor: string;
}

const projects: Project[] = [
  {
    name: 'unfoldedcircle/core-api',
    url: 'https://github.com/unfoldedcircle/core-api',
    description: 'Official API repo with OpenAPI YAML, AsyncAPI spec for WebSocket, and developer guide.',
    tag: 'Official',
    tagColor: 'var(--accent-blue)',
  },
  {
    name: 'unfoldedcircle/core-simulator',
    url: 'https://github.com/unfoldedcircle/core-simulator',
    description: 'Docker-based simulator — develop without physical hardware.',
    tag: 'Official',
    tagColor: 'var(--accent-blue)',
  },
  {
    name: 'albaintor/UC-Remote-Two-Toolkit',
    url: 'https://github.com/albaintor/UC-Remote-Two-Toolkit',
    description: 'Angular + Node.js web app with "Play Remote" feature — renders a virtual remote and sends real commands via the REST API.',
    tag: 'Community',
    tagColor: 'var(--accent-purple)',
  },
  {
    name: 'JackJPowell/hass-unfoldedcircle',
    url: 'https://github.com/JackJPowell/hass-unfoldedcircle',
    description: 'Primary Home Assistant integration (100+ stars). Python source wraps the full Core REST API with all 21 button identifiers.',
    tag: 'Community',
    tagColor: 'var(--accent-purple)',
  },
  {
    name: '@unfoldedcircle/integration-api',
    url: 'https://www.npmjs.com/package/@unfoldedcircle/integration-api',
    description: 'Official TypeScript/Node.js SDK for building integration drivers.',
    tag: 'SDK',
    tagColor: 'var(--accent-green)',
  },
  {
    name: 'integration-python-library',
    url: 'https://github.com/unfoldedcircle/integration-python-library',
    description: 'Official Python library for building UC integrations.',
    tag: 'SDK',
    tagColor: 'var(--accent-green)',
  },
  {
    name: 'Postman Collection',
    url: 'https://github.com/unfoldedcircle/core-api/tree/main/rest',
    description: 'Ready-to-use Postman collection at core-api/rest/remote-core_rest-api.postman_collection.json.',
    tag: 'Tool',
    tagColor: 'var(--accent-orange)',
  },
];

export default function CommunityProjects() {
  return (
    <section id="community" style={{ scrollMarginTop: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Community & Resources</h2>
      <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--text-secondary)' }}>
        Open-source projects, official SDKs, and tools for building on the UC Remote 3 platform.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-md)' }}>
        {projects.map(p => (
          <GlassCard key={p.name} glow={p.tagColor}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                padding: '2px 8px',
                borderRadius: 'var(--glass-radius-pill)',
                fontSize: '0.68rem',
                fontWeight: 700,
                background: p.tagColor + '18',
                color: p.tagColor,
                border: `1px solid ${p.tagColor}33`,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {p.tag}
              </span>
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '6px',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {p.name}
            </a>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.55 }}>{p.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
