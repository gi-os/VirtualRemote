import { useState, useEffect, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { useConnection } from '../ConnectionContext';
import EntityCard from './EntityCard';
import type { Entity } from '../types';

function groupByType(entities: Entity[]): Record<string, Entity[]> {
  const groups: Record<string, Entity[]> = {};
  for (const e of entities) {
    const type = e.entity_type || 'other';
    if (!groups[type]) groups[type] = [];
    groups[type].push(e);
  }
  return groups;
}

const TYPE_ORDER = [
  'media_player', 'light', 'switch', 'cover', 'climate',
  'sensor', 'activity', 'remote',
];

function sortedTypes(types: string[]): string[] {
  return types.sort((a, b) => {
    const ai = TYPE_ORDER.indexOf(a);
    const bi = TYPE_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

const TYPE_LABELS: Record<string, string> = {
  media_player: 'Media Players',
  light: 'Lights',
  switch: 'Switches',
  cover: 'Covers',
  climate: 'Climate',
  sensor: 'Sensors',
  activity: 'Activities',
  remote: 'Remotes',
};

export default function DevicesView() {
  const { state, refreshEntities } = useConnection();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const hasPages = state.pages.length > 0;

  // Get entities for current page if pages exist
  const pageEntities = useMemo(() => {
    if (!hasPages || state.pages.length === 0) return null;
    const page = state.pages[currentPage];
    if (!page) return null;
    const entityMap = new Map(state.entities.map(e => [e.entity_id, e]));
    return page.items
      .map(item => entityMap.get(item.entity_id))
      .filter((e): e is Entity => e != null);
  }, [hasPages, state.pages, state.entities, currentPage]);

  const grouped = useMemo(() => {
    const source = pageEntities || state.entities;
    return groupByType(source);
  }, [pageEntities, state.entities]);

  const types = useMemo(() => sortedTypes(Object.keys(grouped)), [grouped]);

  // Auto-refresh entities periodically
  useEffect(() => {
    const interval = setInterval(() => { refreshEntities(); }, 30000);
    return () => clearInterval(interval);
  }, [refreshEntities]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshEntities();
    setTimeout(() => setRefreshing(false), 500);
  };

  if (state.entities.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color: 'var(--text-tertiary)',
        gap: 'var(--space-md)',
        padding: 'var(--space-xl)',
      }}>
        <p style={{ fontSize: '1rem' }}>No entities found on this device.</p>
        <button className="glass-button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: 'var(--space-md)',
      width: '100%',
      maxWidth: '600px',
    }}>
      {/* Page tabs (if pages exist) */}
      {hasPages && state.pages.length > 1 && (
        <div style={{
          display: 'flex',
          gap: '6px',
          marginBottom: 'var(--space-md)',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {state.pages.map((page, i) => (
            <button
              key={page.page_id}
              onClick={() => setCurrentPage(i)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--glass-radius-pill)',
                border: '1px solid ' + (i === currentPage ? 'var(--accent-blue)' : 'var(--glass-border)'),
                background: i === currentPage ? 'rgba(79,172,254,0.15)' : 'rgba(255,255,255,0.04)',
                color: i === currentPage ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {page.name || `Page ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      {/* Refresh button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 'var(--space-sm)',
      }}>
        <button
          onClick={handleRefresh}
          title="Refresh entities"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: 'var(--glass-radius-sm)',
            border: '1px solid var(--glass-border)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--text-tertiary)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <RefreshCw size={12} style={{
            transition: 'transform 0.5s ease',
            transform: refreshing ? 'rotate(360deg)' : 'rotate(0)',
          }} />
          {state.entities.length} entities
        </button>
      </div>

      {/* Entity groups */}
      {types.map(type => (
        <div key={type} style={{ marginBottom: 'var(--space-lg)' }}>
          <h3 style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 'var(--space-sm)',
            paddingLeft: '4px',
          }}>
            {TYPE_LABELS[type] || type}
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)',
          }}>
            {grouped[type].map(entity => (
              <EntityCard key={entity.entity_id} entity={entity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
