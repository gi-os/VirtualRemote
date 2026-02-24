import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type {
  ConnectionState,
  ConnectionConfig,
  Entity,
  Activity,
  Page,
} from './types';
import * as api from './api';

const STORAGE_KEY = 'uc-remote-config';

function loadConfig(): ConnectionConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.username && parsed.password) return parsed as ConnectionConfig;
  } catch { /* ignore */ }
  return null;
}

function saveConfig(config: ConnectionConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function clearConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// --- Context definition ---

interface ConnectionContextValue {
  state: ConnectionState;
  connect: (host: string, username: string, password: string) => Promise<void>;
  disconnect: () => void;
  forgetCredentials: () => void;
  sendButton: (command: string) => Promise<void>;
  sendEntityCmd: (entityId: string, cmdId: string, params?: Record<string, unknown>) => Promise<void>;
  refreshEntities: () => Promise<void>;
}

const ConnectionContext = createContext<ConnectionContextValue | null>(null);

export function useConnection(): ConnectionContextValue {
  const ctx = useContext(ConnectionContext);
  if (!ctx) throw new Error('useConnection must be used within ConnectionProvider');
  return ctx;
}

// --- Provider ---

const INITIAL_STATE: ConnectionState = {
  status: 'disconnected',
  entityId: null,
  remotes: [],
  deviceInfo: null,
  entities: [],
  activities: [],
  pages: [],
  error: null,
};

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConnectionState>(INITIAL_STATE);

  const doConnect = useCallback(async (host: string, username: string, password: string) => {
    setState(prev => ({ ...prev, status: 'connecting', error: null }));

    // Set API base URL and Basic Auth credentials for all subsequent calls
    api.setBaseUrl(host);
    api.setCredentials(username, password);

    try {
      // Verify credentials by hitting a protected endpoint
      const deviceInfo = await api.verifyAuth();
      const remotes = await api.getRemotes();
      const entityId = remotes.length > 0 ? remotes[0].entity_id : null;

      let entities: Entity[] = [];
      let activities: Activity[] = [];
      let pages: Page[] = [];

      try { entities = await api.getEntities(); } catch { /* non-fatal */ }
      try { activities = await api.getActivities(); } catch { /* non-fatal */ }

      try {
        const profiles = await api.getProfiles();
        if (profiles.length > 0) {
          pages = await api.getProfilePages(profiles[0].profile_id);
        }
      } catch { /* non-fatal */ }

      saveConfig({ host, username, password });

      setState({
        status: 'connected',
        entityId,
        remotes,
        deviceInfo,
        entities,
        activities,
        pages,
        error: null,
      });
    } catch (err) {
      api.clearCredentials();
      setState(prev => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Connection failed',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    api.clearCredentials();
    setState(INITIAL_STATE);
  }, []);

  const forgetCredentials = useCallback(() => {
    clearConfig();
    disconnect();
  }, [disconnect]);

  const sendButton = useCallback(async (command: string) => {
    if (!state.entityId) return;
    await api.sendCommand(state.entityId, command);
  }, [state.entityId]);

  const sendEntityCmd = useCallback(async (
    entityId: string,
    cmdId: string,
    params?: Record<string, unknown>,
  ) => {
    await api.sendEntityCommand(entityId, cmdId, params);
  }, []);

  const refreshEntities = useCallback(async () => {
    try {
      const entities = await api.getEntities();
      const activities = await api.getActivities();
      setState(prev => ({ ...prev, entities, activities }));
    } catch { /* ignore */ }
  }, []);

  // Auto-reconnect from localStorage on mount
  useEffect(() => {
    const config = loadConfig();
    if (config) {
      doConnect(config.host || '', config.username, config.password);
    }
  }, [doConnect]);

  return (
    <ConnectionContext.Provider value={{
      state,
      connect: doConnect,
      disconnect,
      forgetCredentials,
      sendButton,
      sendEntityCmd,
      refreshEntities,
    }}>
      {children}
    </ConnectionContext.Provider>
  );
}
