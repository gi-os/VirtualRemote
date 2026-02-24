import { useState } from 'react';
import { buttons } from '../data/buttons';

interface ButtonPos {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  color: string;
}

const zoneColors: Record<string, string> = {
  navigation: '#8e8e93',
  dpad: '#4facfe',
  color: 'dynamic',
  channel: '#af52de',
  media: '#ff9f0a',
  volume: '#34c759',
  power: '#ff453a',
};

const colorMap: Record<string, string> = {
  GREEN: '#34c759',
  YELLOW: '#ffd60a',
  RED: '#ff453a',
  BLUE: '#4facfe',
};

const layout: ButtonPos[] = [
  // Navigation row
  { id: 'BACK', x: 25, y: 190, w: 42, h: 28, rx: 8, color: zoneColors.navigation },
  { id: 'HOME', x: 79, y: 190, w: 42, h: 28, rx: 8, color: zoneColors.navigation },
  { id: 'VOICE', x: 133, y: 190, w: 42, h: 28, rx: 8, color: zoneColors.navigation },

  // D-pad + color buttons
  { id: 'GREEN', x: 28, y: 235, w: 30, h: 24, rx: 6, color: colorMap.GREEN },
  { id: 'DPAD_UP', x: 85, y: 232, w: 30, h: 30, rx: 15, color: zoneColors.dpad },
  { id: 'YELLOW', x: 142, y: 235, w: 30, h: 24, rx: 6, color: colorMap.YELLOW },

  { id: 'DPAD_LEFT', x: 55, y: 265, w: 30, h: 30, rx: 15, color: zoneColors.dpad },
  { id: 'DPAD_MIDDLE', x: 85, y: 265, w: 30, h: 30, rx: 15, color: '#64d2ff' },
  { id: 'DPAD_RIGHT', x: 115, y: 265, w: 30, h: 30, rx: 15, color: zoneColors.dpad },

  { id: 'RED', x: 28, y: 298, w: 30, h: 24, rx: 6, color: colorMap.RED },
  { id: 'DPAD_DOWN', x: 85, y: 298, w: 30, h: 30, rx: 15, color: zoneColors.dpad },
  { id: 'BLUE', x: 142, y: 298, w: 30, h: 24, rx: 6, color: colorMap.BLUE },

  // Channel buttons
  { id: 'CHANNEL_UP', x: 70, y: 340, w: 60, h: 24, rx: 8, color: zoneColors.channel },
  { id: 'CHANNEL_DOWN', x: 70, y: 368, w: 60, h: 24, rx: 8, color: zoneColors.channel },

  // Transport row
  { id: 'MUTE', x: 22, y: 404, w: 36, h: 24, rx: 8, color: zoneColors.media },
  { id: 'PREV', x: 64, y: 404, w: 36, h: 24, rx: 8, color: zoneColors.media },
  { id: 'PLAY', x: 106, y: 404, w: 36, h: 24, rx: 8, color: zoneColors.media },
  { id: 'NEXT', x: 148, y: 404, w: 36, h: 24, rx: 8, color: zoneColors.media },

  // Volume (left side)
  { id: 'VOLUME_UP', x: -10, y: 260, w: 18, h: 36, rx: 6, color: zoneColors.volume },
  { id: 'VOLUME_DOWN', x: -10, y: 300, w: 18, h: 36, rx: 6, color: zoneColors.volume },

  // Power
  { id: 'POWER', x: 75, y: 440, w: 50, h: 26, rx: 13, color: zoneColors.power },
];

export default function ButtonMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleClick = async (id: string) => {
    await navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const hoveredButton = hovered ? buttons.find(b => b.id === hovered) : null;

  return (
    <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ position: 'relative' }}>
        <svg viewBox="-20 0 240 490" width="240" style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))' }}>
          {/* Remote body */}
          <rect x="10" y="10" width="180" height="470" rx="28" ry="28"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          {/* Screen area */}
          <rect x="22" y="24" width="156" height="152" rx="14"
            fill="rgba(79,172,254,0.06)" stroke="rgba(79,172,254,0.15)" strokeWidth="1" />
          <text x="100" y="95" textAnchor="middle" fill="rgba(255,255,255,0.25)"
            fontSize="11" fontFamily="var(--font-sans)" fontWeight="500">
            3.2" Touchscreen
          </text>
          <text x="100" y="112" textAnchor="middle" fill="rgba(255,255,255,0.15)"
            fontSize="8" fontFamily="var(--font-mono)">
            Touch-driven UI
          </text>

          {/* Touch slider */}
          <rect x="50" y="180" width="100" height="4" rx="2"
            fill="rgba(255,255,255,0.12)" />
          <text x="100" y="176" textAnchor="middle" fill="rgba(255,255,255,0.2)"
            fontSize="7" fontFamily="var(--font-sans)">
            Capacitive Slider
          </text>

          {/* IR LED indicator */}
          <circle cx="100" cy="16" r="3" fill="rgba(255,69,58,0.5)" />

          {/* Buttons */}
          {layout.map(btn => {
            const isHovered = hovered === btn.id;
            const isCopied = copied === btn.id;
            return (
              <g key={btn.id}
                onMouseEnter={() => setHovered(btn.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(btn.id)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={btn.x} y={btn.y} width={btn.w} height={btn.h} rx={btn.rx}
                  fill={isHovered ? btn.color + '40' : btn.color + '20'}
                  stroke={isHovered ? btn.color : btn.color + '60'}
                  strokeWidth={isHovered ? 1.5 : 1}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <text
                  x={btn.x + btn.w / 2}
                  y={btn.y + btn.h / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isHovered ? '#fff' : 'rgba(255,255,255,0.6)'}
                  fontSize={btn.w < 25 ? 5 : btn.id.length > 8 ? 6 : 7}
                  fontFamily="var(--font-mono)"
                  fontWeight="600"
                  style={{ pointerEvents: 'none', transition: 'fill 0.2s' }}
                >
                  {isCopied ? 'Copied!' : btn.id.replace('DPAD_', '').replace('CHANNEL_', 'CH').replace('VOLUME_', 'VOL')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip / info panel */}
      <div style={{
        flex: 1,
        minWidth: '200px',
        padding: 'var(--space-lg)',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 'var(--glass-radius-sm)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(12px)',
        minHeight: '120px',
        transition: 'all var(--transition-normal)',
      }}>
        {hoveredButton ? (
          <>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '6px',
            }}>
              {hoveredButton.zone} button
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              marginBottom: '8px',
            }}>
              {hoveredButton.id}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              marginBottom: '12px',
            }}>
              {hoveredButton.description}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-tertiary)',
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
            }}>
              Supports: <span style={{ color: 'var(--accent-green)' }}>short_press</span>,{' '}
              <span style={{ color: 'var(--accent-orange)' }}>long_press</span>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
            }}>
              Click to copy API ID
            </div>
          </>
        ) : (
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            Hover over a button on the remote to see its API details.
          </div>
        )}
      </div>
    </div>
  );
}
