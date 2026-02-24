import type { ApiEndpoint } from '../types';

export const endpoints: ApiEndpoint[] = [
  // === Public (no auth) ===
  { id: 'pub-version', method: 'GET', path: '/api/pub/version', description: 'Get component version information and device name', category: 'public', authRequired: false },
  { id: 'pub-status', method: 'GET', path: '/api/pub/status', description: 'Get system status (memory, CPU load, filesystem)', category: 'public', authRequired: false },
  { id: 'pub-health', method: 'GET', path: '/api/pub/health_check', description: 'Health status of all services', category: 'public', authRequired: false },

  // === Authentication ===
  { id: 'pub-login', method: 'POST', path: '/api/pub/login', description: 'Create authenticated session (returns session cookie)', category: 'auth', authRequired: false, requestBody: 'username & password' },
  { id: 'pub-logout', method: 'POST', path: '/api/pub/logout', description: 'Terminate authenticated session', category: 'auth', authRequired: true },
  { id: 'auth-keys-list', method: 'GET', path: '/api/auth/api_keys', description: 'List all API keys', category: 'auth', authRequired: true },
  { id: 'auth-keys-create', method: 'POST', path: '/api/auth/api_keys', description: 'Create a new API key', category: 'auth', authRequired: true, requestBody: 'name, scopes' },
  { id: 'auth-keys-count', method: 'HEAD', path: '/api/auth/api_keys', description: 'Count available API keys', category: 'auth', authRequired: true },
  { id: 'auth-keys-delete', method: 'DELETE', path: '/api/auth/api_keys', description: 'Delete all API keys', category: 'auth', authRequired: true },
  { id: 'auth-key-get', method: 'GET', path: '/api/auth/api_keys/{apiKeyId}', description: 'Retrieve specific API key details', category: 'auth', authRequired: true },
  { id: 'auth-key-patch', method: 'PATCH', path: '/api/auth/api_keys/{apiKeyId}', description: 'Update API key properties', category: 'auth', authRequired: true },
  { id: 'auth-key-delete', method: 'DELETE', path: '/api/auth/api_keys/{apiKeyId}', description: 'Revoke specific API key', category: 'auth', authRequired: true },
  { id: 'auth-scopes', method: 'GET', path: '/api/auth/scopes', description: 'Get available access scopes', category: 'auth', authRequired: true },

  // === Entities ===
  { id: 'entities-list', method: 'GET', path: '/api/entities', description: 'Search and retrieve all configured entities with state', category: 'entities', authRequired: true },
  { id: 'entities-count', method: 'HEAD', path: '/api/entities', description: 'Count configured entities', category: 'entities', authRequired: true },
  { id: 'entities-delete', method: 'DELETE', path: '/api/entities', description: 'Remove all entities', category: 'entities', authRequired: true },
  { id: 'entity-get', method: 'GET', path: '/api/entities/{entityId}', description: 'Get entity details and current state', category: 'entities', authRequired: true },
  { id: 'entity-patch', method: 'PATCH', path: '/api/entities/{entityId}', description: 'Modify entity properties', category: 'entities', authRequired: true },
  { id: 'entity-command', method: 'PUT', path: '/api/entities/{entityId}/command', description: 'Send command to any entity (button press, power, media, etc.)', category: 'entities', authRequired: true, requestBody: 'cmd_id, params' },

  // === Activities ===
  { id: 'activities-list', method: 'GET', path: '/api/activities', description: 'List all configured activities', category: 'activities', authRequired: true },
  { id: 'activities-count', method: 'HEAD', path: '/api/activities', description: 'Count activities', category: 'activities', authRequired: true },
  { id: 'activity-get', method: 'GET', path: '/api/activities/{activityId}', description: 'Get activity details', category: 'activities', authRequired: true },
  { id: 'activity-patch', method: 'PATCH', path: '/api/activities/{activityId}', description: 'Update activity configuration', category: 'activities', authRequired: true },
  { id: 'activity-delete', method: 'DELETE', path: '/api/activities/{activityId}', description: 'Delete activity', category: 'activities', authRequired: true },
  { id: 'activity-command', method: 'PUT', path: '/api/activities/{activityId}/command', description: 'Execute activity command (on/off/toggle)', category: 'activities', authRequired: true },

  // === Macros ===
  { id: 'macros-list', method: 'GET', path: '/api/macros', description: 'List all configured macros', category: 'macros', authRequired: true },
  { id: 'macro-get', method: 'GET', path: '/api/macros/{macroId}', description: 'Get macro details', category: 'macros', authRequired: true },
  { id: 'macro-command', method: 'PUT', path: '/api/macros/{macroId}/command', description: 'Execute a macro', category: 'macros', authRequired: true },

  // === Remotes ===
  { id: 'remotes-list', method: 'GET', path: '/api/remotes', description: 'List remote entities', category: 'remotes', authRequired: true },
  { id: 'remote-get', method: 'GET', path: '/api/remotes/{remoteId}', description: 'Get remote entity with button mapping and UI pages', category: 'remotes', authRequired: true },
  { id: 'remote-patch', method: 'PATCH', path: '/api/remotes/{remoteId}', description: 'Update remote entity button mapping and UI', category: 'remotes', authRequired: true },

  // === IR ===
  { id: 'ir-codes-list', method: 'GET', path: '/api/ir/codes', description: 'List IR code datasets', category: 'ir', authRequired: true },
  { id: 'ir-codes-get', method: 'GET', path: '/api/ir/codes/{codesetId}', description: 'Get IR codeset details', category: 'ir', authRequired: true },
  { id: 'ir-emit', method: 'PUT', path: '/api/ir/emitters/{emitterId}/send', description: 'Send IR code through emitter', category: 'ir', authRequired: true, requestBody: 'code, format, repeat' },

  // === Profiles ===
  { id: 'profiles-list', method: 'GET', path: '/api/profiles', description: 'List user profiles', category: 'profiles', authRequired: true },
  { id: 'profile-get', method: 'GET', path: '/api/profiles/{profileId}', description: 'Get profile with pages configuration', category: 'profiles', authRequired: true },
  { id: 'profile-pages', method: 'GET', path: '/api/profiles/{profileId}/pages', description: 'List pages in a profile', category: 'profiles', authRequired: true },
  { id: 'profile-patch', method: 'PATCH', path: '/api/profiles/{profileId}', description: 'Update profile settings', category: 'profiles', authRequired: true },

  // === Integrations ===
  { id: 'intg-overview', method: 'GET', path: '/api/intg', description: 'Get integration overview', category: 'integrations', authRequired: true },
  { id: 'intg-discover', method: 'PUT', path: '/api/intg/discover', description: 'Start driver discovery on the network', category: 'integrations', authRequired: true },
  { id: 'intg-install', method: 'POST', path: '/api/intg/install', description: 'Upload and install custom integration driver', category: 'integrations', authRequired: true },
  { id: 'intg-drivers-list', method: 'GET', path: '/api/intg/drivers', description: 'List registered integration drivers', category: 'integrations', authRequired: true },
  { id: 'intg-driver-delete', method: 'DELETE', path: '/api/intg/drivers/{driverId}', description: 'Remove driver and installation files', category: 'integrations', authRequired: true },
  { id: 'intg-instances-list', method: 'GET', path: '/api/intg/instances', description: 'List integration instances', category: 'integrations', authRequired: true },
  { id: 'intg-instance-delete', method: 'DELETE', path: '/api/intg/instances/{intgId}', description: 'Remove integration instance', category: 'integrations', authRequired: true },
  { id: 'intg-instance-entities', method: 'GET', path: '/api/intg/instances/{intgId}/entities', description: 'Get available entities for integration', category: 'integrations', authRequired: true },

  // === Configuration ===
  { id: 'cfg-buttons', method: 'GET', path: '/api/cfg/device/button_layout', description: 'Get physical button layout and mapping', category: 'configuration', authRequired: true },
  { id: 'cfg-screen', method: 'GET', path: '/api/cfg/device/screen_layout', description: 'Get touchscreen grid layout definition', category: 'configuration', authRequired: true },

  // === Docks ===
  { id: 'docks-list', method: 'GET', path: '/api/docks', description: 'List connected docks', category: 'dock', authRequired: true },

  // === System ===
  { id: 'sys-info', method: 'GET', path: '/api/system', description: 'Device info (model, firmware, serial number)', category: 'system', authRequired: true },
  { id: 'sys-logs-services', method: 'GET', path: '/api/system/logs/services', description: 'Get available log services', category: 'system', authRequired: true },
  { id: 'sys-logs-query', method: 'GET', path: '/api/system/logs', description: 'Query system logs with filters', category: 'system', authRequired: true },
  { id: 'sys-logs-web-get', method: 'GET', path: '/api/system/logs/web', description: 'Get log viewer state', category: 'system', authRequired: true },
  { id: 'sys-logs-web-put', method: 'PUT', path: '/api/system/logs/web', description: 'Start/stop/enable the web log viewer', category: 'system', authRequired: true },

  // === Resources ===
  { id: 'resources-types', method: 'GET', path: '/api/resources', description: 'Get supported resource types', category: 'resources', authRequired: true },
  { id: 'resources-upload', method: 'POST', path: '/api/resources/{type}', description: 'Upload resource files (icons, images)', category: 'resources', authRequired: true },
  { id: 'resources-get', method: 'GET', path: '/api/resources/{type}/{id}', description: 'Download a resource file', category: 'resources', authRequired: true },
  { id: 'resources-delete', method: 'DELETE', path: '/api/resources/{type}/{id}', description: 'Delete a resource', category: 'resources', authRequired: true },
];
