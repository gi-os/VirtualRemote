import { useState, useCallback } from 'react';
import {
  Power, Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Sun, Lightbulb, ToggleLeft, ToggleRight,
  ChevronUp, ChevronDown, Thermometer, Activity, Eye,
} from 'lucide-react';
import type { Entity } from '../types';
import { useConnection } from '../ConnectionContext';
import GlassCard from './GlassCard';

const TYPE_COLORS: Record<string, string> = {
  media_player: '#ff9f0a',
  light: '#ffd60a',
  switch: '#34c759',
  cover: '#af52de',
  climate: '#5ac8fa',
  sensor: '#64d2ff',
  remote: '#4facfe',
  activity: '#ff375f',
};

function getEntityName(entity: Entity): string {
  return entity.name?.en || entity.name?.[''] || Object.values(entity.name)[0] || entity.entity_id;
}

function getState(entity: Entity): string {
  const s = entity.attributes?.state;
  return typeof s === 'string' ? s : 'unknown';
}

export default function EntityCard({ entity }: { entity: Entity }) {
  const { sendEntityCmd } = useConnection();
  const [busy, setBusy] = useState(false);

  const color = TYPE_COLORS[entity.entity_type] || '#8e8e93';
  const state = getState(entity);
  const isOn = state === 'ON' || state === 'PLAYING' || state === 'OPEN';

  const send = useCallback(async (cmdId: string, params?: Record<string, unknown>) => {
    setBusy(true);
    try {
      await sendEntityCmd(entity.entity_id, cmdId, params);
    } catch { /* non-fatal */ }
    finally { setBusy(false); }
  }, [sendEntityCmd, entity.entity_id]);

  return (
    <GlassCard glow={color} style={{
      padding: 'var(--space-md)',
      opacity: busy ? 0.7 : 1,
      transition: 'opacity 0.15s ease',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-sm)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <TypeIcon type={entity.entity_type} color={color} />
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {getEntityName(entity)}
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}>
              {entity.entity_type}
            </div>
          </div>
        </div>
        <div style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          color: isOn ? color : 'var(--text-tertiary)',
          textTransform: 'uppercase',
        }}>
          {state}
        </div>
      </div>

      {/* Controls per entity type */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        marginTop: 'var(--space-sm)',
      }}>
        {entity.entity_type === 'media_player' && <MediaControls send={send} state={state} />}
        {entity.entity_type === 'light' && <LightControls send={send} isOn={isOn} />}
        {(entity.entity_type === 'switch') && <SwitchControls send={send} isOn={isOn} />}
        {entity.entity_type === 'cover' && <CoverControls send={send} />}
        {entity.entity_type === 'climate' && <ClimateInfo entity={entity} />}
        {entity.entity_type === 'sensor' && <SensorInfo entity={entity} />}
        {entity.entity_type === 'activity' && <ActivityControls send={send} isOn={isOn} />}
        {!['media_player', 'light', 'switch', 'cover', 'climate', 'sensor', 'activity'].includes(entity.entity_type) && (
          <GenericControls send={send} isOn={isOn} />
        )}
      </div>
    </GlassCard>
  );
}

// --- Sub-components for each entity type ---

function IconBtn({ onClick, children, label }: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 'var(--glass-radius-sm)',
        border: '1px solid var(--glass-border)',
        background: 'rgba(255,255,255,0.06)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </button>
  );
}

function MediaControls({ send, state }: { send: (cmd: string) => void; state: string }) {
  const playing = state === 'PLAYING';
  return (
    <>
      <IconBtn onClick={() => send('media_player.previous')} label="Previous">
        <SkipBack size={16} />
      </IconBtn>
      <IconBtn onClick={() => send('media_player.play_pause')} label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </IconBtn>
      <IconBtn onClick={() => send('media_player.next')} label="Next">
        <SkipForward size={16} />
      </IconBtn>
      <IconBtn onClick={() => send('media_player.volume_down')} label="Volume Down">
        <VolumeX size={16} />
      </IconBtn>
      <IconBtn onClick={() => send('media_player.volume_up')} label="Volume Up">
        <Volume2 size={16} />
      </IconBtn>
      <IconBtn onClick={() => send('media_player.toggle')} label="Power">
        <Power size={16} />
      </IconBtn>
    </>
  );
}

function LightControls({ send, isOn }: { send: (cmd: string) => void; isOn: boolean }) {
  return (
    <>
      <IconBtn onClick={() => send('light.toggle')} label="Toggle">
        {isOn ? <Lightbulb size={16} /> : <Lightbulb size={16} />}
      </IconBtn>
      <IconBtn onClick={() => send('light.on')} label="On">
        <Sun size={16} />
      </IconBtn>
      <IconBtn onClick={() => send('light.off')} label="Off">
        <Power size={16} />
      </IconBtn>
    </>
  );
}

function SwitchControls({ send, isOn }: { send: (cmd: string) => void; isOn: boolean }) {
  return (
    <IconBtn onClick={() => send('switch.toggle')} label="Toggle">
      {isOn ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
    </IconBtn>
  );
}

function CoverControls({ send }: { send: (cmd: string) => void }) {
  return (
    <>
      <IconBtn onClick={() => send('cover.open')} label="Open">
        <ChevronUp size={16} />
      </IconBtn>
      <IconBtn onClick={() => send('cover.stop')} label="Stop">
        <Power size={16} />
      </IconBtn>
      <IconBtn onClick={() => send('cover.close')} label="Close">
        <ChevronDown size={16} />
      </IconBtn>
    </>
  );
}

function ClimateInfo({ entity }: { entity: Entity }) {
  const temp = entity.attributes?.current_temperature;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
      <Thermometer size={16} />
      {temp != null ? `${temp}°` : 'N/A'}
    </div>
  );
}

function SensorInfo({ entity }: { entity: Entity }) {
  const value = entity.attributes?.value ?? entity.attributes?.state;
  const unit = entity.attributes?.unit;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
      <Eye size={16} />
      {value != null ? `${value}${unit ? ` ${unit}` : ''}` : 'N/A'}
    </div>
  );
}

function ActivityControls({ send, isOn }: { send: (cmd: string) => void; isOn: boolean }) {
  return (
    <IconBtn onClick={() => send(isOn ? 'activity.off' : 'activity.on')} label={isOn ? 'Stop' : 'Start'}>
      <Activity size={16} />
    </IconBtn>
  );
}

function GenericControls({ send, isOn }: { send: (cmd: string) => void; isOn: boolean }) {
  return (
    <IconBtn onClick={() => send(isOn ? 'switch.off' : 'switch.on')} label="Toggle">
      {isOn ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
    </IconBtn>
  );
}

function TypeIcon({ type, color }: { type: string; color: string }) {
  const props = { size: 18, color };
  switch (type) {
    case 'media_player': return <Play {...props} />;
    case 'light': return <Lightbulb {...props} />;
    case 'switch': return <ToggleRight {...props} />;
    case 'cover': return <ChevronUp {...props} />;
    case 'climate': return <Thermometer {...props} />;
    case 'sensor': return <Eye {...props} />;
    case 'activity': return <Activity {...props} />;
    default: return <Power {...props} />;
  }
}
