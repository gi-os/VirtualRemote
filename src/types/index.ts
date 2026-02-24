// --- Button types (kept from original) ---

export interface ButtonDefinition {
  id: string;
  label: string;
  description: string;
  zone: ButtonZone;
}

export type ButtonZone =
  | 'navigation'
  | 'dpad'
  | 'color'
  | 'channel'
  | 'media'
  | 'volume'
  | 'power';

// --- Connection & auth ---

export interface ConnectionConfig {
  username: string;
  password: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface ConnectionState {
  status: ConnectionStatus;
  entityId: string | null;
  remotes: RemoteEntity[];
  deviceInfo: DeviceInfo | null;
  entities: Entity[];
  activities: Activity[];
  pages: Page[];
  error: string | null;
}

// --- Device / API response types ---

export interface DeviceInfo {
  model: string;
  version: string;
  name: string;
  serial?: string;
}

export interface RemoteEntity {
  entity_id: string;
  name: Record<string, string>;
}

export interface Entity {
  entity_id: string;
  entity_type: string;
  name: Record<string, string>;
  attributes: Record<string, unknown>;
}

export interface Activity {
  activity_id: string;
  name: Record<string, string>;
  attributes?: Record<string, unknown>;
}

export interface Page {
  page_id: string;
  name: string;
  items: PageItem[];
}

export interface PageItem {
  entity_id: string;
  position: { x: number; y: number; w?: number; h?: number };
}
