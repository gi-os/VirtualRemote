import type { CodeExample } from '../types';

export const codeExamples: CodeExample[] = [
  // === Button Press ===
  {
    id: 'single-press',
    title: 'Single Button Press',
    description: 'Send a single button command to a remote entity',
    language: 'bash',
    category: 'button-press',
    code: `curl -X PUT 'http://<remote-ip>/api/entities/remote-1/command' \\
  -H 'Content-Type: application/json' \\
  --user 'web-configurator:1234' \\
  -d '{
    "cmd_id": "remote.send_cmd",
    "params": {
      "command": "VOLUME_UP"
    }
  }'`,
  },
  {
    id: 'long-press',
    title: 'Long Press (Hold)',
    description: 'Hold a button for a specified duration in milliseconds',
    language: 'json',
    category: 'button-press',
    code: `{
  "cmd_id": "remote.send_cmd",
  "params": {
    "command": "CURSOR_ENTER",
    "hold": 800
  }
}`,
  },
  {
    id: 'repeat-press',
    title: 'Repeated Press',
    description: 'Press a button multiple times',
    language: 'json',
    category: 'button-press',
    code: `{
  "cmd_id": "remote.send_cmd",
  "params": {
    "command": "VOLUME_DOWN",
    "repeat": 5
  }
}`,
  },
  {
    id: 'command-sequence',
    title: 'Command Sequence',
    description: 'Send a sequence of commands with delay between each',
    language: 'json',
    category: 'button-press',
    code: `{
  "cmd_id": "remote.send_cmd_sequence",
  "params": {
    "sequence": ["HOME", "CURSOR_DOWN", "CURSOR_RIGHT", "CURSOR_ENTER"],
    "delay": 200
  }
}`,
  },
  {
    id: 'js-fetch',
    title: 'JavaScript fetch()',
    description: 'Send a command from browser JavaScript via the Vite proxy',
    language: 'javascript',
    category: 'button-press',
    code: `const sendCommand = async (entityId, command) => {
  const res = await fetch(\`/api/entities/\${entityId}/command\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cmd_id: 'remote.send_cmd',
      params: { command }
    }),
  });
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
};

await sendCommand('remote-1', 'VOLUME_UP');`,
  },

  // === Power & Activity ===
  {
    id: 'power-on',
    title: 'Power On',
    description: 'Turn on a remote entity',
    language: 'json',
    category: 'power-activity',
    code: `{ "cmd_id": "remote.on" }`,
  },
  {
    id: 'power-off',
    title: 'Power Off',
    description: 'Turn off a remote entity',
    language: 'json',
    category: 'power-activity',
    code: `{ "cmd_id": "remote.off" }`,
  },
  {
    id: 'power-toggle',
    title: 'Power Toggle',
    description: 'Toggle remote power state',
    language: 'json',
    category: 'power-activity',
    code: `{ "cmd_id": "remote.toggle" }`,
  },
  {
    id: 'activity-on',
    title: 'Start Activity',
    description: 'Activate an activity (e.g., Watch TV)',
    language: 'json',
    category: 'power-activity',
    code: `{ "cmd_id": "activity.on" }`,
  },
  {
    id: 'activity-off',
    title: 'Stop Activity',
    description: 'Deactivate an activity',
    language: 'json',
    category: 'power-activity',
    code: `{ "cmd_id": "activity.off" }`,
  },

  // === Media Player ===
  {
    id: 'media-play-pause',
    title: 'Play / Pause',
    description: 'Toggle media playback',
    language: 'json',
    category: 'media',
    code: `{ "cmd_id": "media_player.play_pause" }`,
  },
  {
    id: 'media-volume',
    title: 'Media Volume Up',
    description: 'Increase media player volume',
    language: 'json',
    category: 'media',
    code: `{ "cmd_id": "media_player.volume_up" }`,
  },
  {
    id: 'media-source',
    title: 'Select Source / Input',
    description: 'Switch input source (e.g., HDMI 1)',
    language: 'json',
    category: 'media',
    code: `{
  "cmd_id": "media_player.select_source",
  "params": {
    "source": "HDMI 1"
  }
}`,
  },

  // === IR Emitter ===
  {
    id: 'ir-pronto',
    title: 'Send IR Code (Pronto)',
    description: 'Transmit a raw Pronto IR code',
    language: 'json',
    category: 'ir',
    code: `{
  "cmd_id": "ir_emitter.send_ir",
  "params": {
    "code": "0000 006D 0004 0002 0155 00AB 0015 0015 ...",
    "repeat": 1
  }
}`,
  },

  // === WebSocket ===
  {
    id: 'ws-send-cmd',
    title: 'WebSocket: Send Command',
    description: 'Send an entity command via WebSocket (note: short cmd_id form)',
    language: 'json',
    category: 'websocket',
    code: `{
  "kind": "req",
  "id": 1,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd",
    "params": { "command": "DPAD_UP" }
  }
}`,
  },
  {
    id: 'ws-response',
    title: 'WebSocket: Response',
    description: 'Response format for WebSocket requests',
    language: 'json',
    category: 'websocket',
    code: `{
  "kind": "resp",
  "req_id": 1,
  "msg": "result",
  "code": 200,
  "msg_data": {}
}`,
  },
  {
    id: 'ws-event',
    title: 'WebSocket: Entity Change Event',
    description: 'Real-time event received when an entity state changes',
    language: 'json',
    category: 'websocket',
    code: `{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "ts": "2025-02-24T14:15:22Z",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "mp-1",
    "attributes": {
      "state": "PLAYING",
      "volume": 42
    }
  }
}`,
  },
  {
    id: 'ws-connect-js',
    title: 'WebSocket: Connect & Subscribe',
    description: 'JavaScript example for connecting and listening to events',
    language: 'javascript',
    category: 'websocket',
    code: `const ws = new WebSocket('ws://<remote-ip>/ws');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    kind: 'req', id: 1, msg: 'auth',
    msg_data: { token: '<api-key>' }
  }));

  // Subscribe to entity events
  ws.send(JSON.stringify({
    kind: 'req', id: 2, msg: 'subscribe_events',
    msg_data: { categories: ['ENTITY'] }
  }));
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.kind === 'event' && msg.msg === 'entity_change') {
    console.log('Entity changed:', msg.msg_data);
  }
};`,
  },

  // === Vite Proxy Config ===
  {
    id: 'vite-proxy',
    title: 'Vite Dev Proxy Configuration',
    description: 'vite.config.ts proxy setup to bypass CORS',
    language: 'typescript',
    category: 'cors',
    code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.100', // Remote IP or localhost:8080
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://192.168.1.100',
        ws: true,
      }
    }
  }
});`,
  },

  // === Docker Simulator ===
  {
    id: 'docker-compose',
    title: 'Docker Compose — Core Simulator',
    description: 'Run the UC core simulator locally for development',
    language: 'yaml',
    category: 'simulator',
    code: `# docker-compose.yml
services:
  core-simulator:
    image: unfoldedcircle/core-simulator:latest
    ports:
      - "8080:8080"   # HTTP
      - "8443:8443"   # HTTPS
    environment:
      - UC_MODEL=UCR3`,
  },
];
