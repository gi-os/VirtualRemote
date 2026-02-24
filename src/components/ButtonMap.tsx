import { useState, useCallback } from 'react';

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

interface ButtonMapProps {
  onButtonPress: (buttonId: string) => void;
}

export default function ButtonMap({ onButtonPress }: ButtonMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);

  const handlePress = useCallback((id: string) => {
    setPressed(id);
    onButtonPress(id);
    setTimeout(() => setPressed(null), 200);
  }, [onButtonPress]);

  return (
    <svg
      viewBox="-20 0 240 490"
      style={{
        width: '100%',
        maxWidth: '300px',
        filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))',
        touchAction: 'manipulation',
      }}
    >
      {/* Remote body */}
      <rect x="10" y="10" width="180" height="470" rx="28" ry="28"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* Screen area */}
      <rect x="22" y="24" width="156" height="152" rx="14"
        fill="rgba(79,172,254,0.06)" stroke="rgba(79,172,254,0.15)" strokeWidth="1" />
      <text x="100" y="90" textAnchor="middle" fill="rgba(255,255,255,0.3)"
        fontSize="12" fontFamily="var(--font-sans)" fontWeight="600">
        UC Remote 3
      </text>
      <text x="100" y="110" textAnchor="middle" fill="rgba(255,255,255,0.15)"
        fontSize="8" fontFamily="var(--font-mono)">
        Virtual Remote
      </text>

      {/* Touch slider */}
      <rect x="50" y="180" width="100" height="4" rx="2"
        fill="rgba(255,255,255,0.12)" />

      {/* IR LED indicator */}
      <circle cx="100" cy="16" r="3" fill="rgba(255,69,58,0.5)" />

      {/* Buttons */}
      {layout.map(btn => {
        const isHovered = hovered === btn.id;
        const isPressed = pressed === btn.id;
        const active = isPressed || isHovered;

        return (
          <g key={btn.id}
            onMouseEnter={() => setHovered(btn.id)}
            onMouseLeave={() => setHovered(null)}
            onPointerDown={() => handlePress(btn.id)}
            style={{ cursor: 'pointer' }}
          >
            {/* Invisible larger hit target for touch */}
            <rect
              x={btn.x - 4} y={btn.y - 4}
              width={btn.w + 8} height={btn.h + 8}
              fill="transparent"
            />
            <rect
              x={btn.x} y={btn.y} width={btn.w} height={btn.h} rx={btn.rx}
              fill={isPressed ? btn.color + '70' : active ? btn.color + '40' : btn.color + '20'}
              stroke={active ? btn.color : btn.color + '60'}
              strokeWidth={isPressed ? 2 : active ? 1.5 : 1}
              style={{
                transition: 'all 0.15s ease',
                filter: isPressed ? `drop-shadow(0 0 6px ${btn.color})` : 'none',
                transform: isPressed ? 'scale(0.94)' : 'scale(1)',
                transformOrigin: `${btn.x + btn.w / 2}px ${btn.y + btn.h / 2}px`,
              }}
            />
            <text
              x={btn.x + btn.w / 2}
              y={btn.y + btn.h / 2 + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill={active ? '#fff' : 'rgba(255,255,255,0.6)'}
              fontSize={btn.w < 25 ? 5 : btn.id.length > 8 ? 6 : 7}
              fontFamily="var(--font-mono)"
              fontWeight="600"
              style={{ pointerEvents: 'none', transition: 'fill 0.15s' }}
            >
              {btn.id.replace('DPAD_', '').replace('CHANNEL_', 'CH').replace('VOLUME_', 'VOL')}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
