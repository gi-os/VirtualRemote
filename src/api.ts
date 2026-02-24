import type { DeviceInfo, RemoteEntity, Entity, Activity, Page } from './types';

// Auth via HTTP Basic Auth header on every request (most reliable through proxies).
// The credentials are set once via setCredentials() and used for all subsequent calls.

let _authHeader: string | null = null;
let _baseUrl = ''; // empty = use Vite proxy (relative /api paths)

export function setCredentials(username: string, password: string): void {
  _authHeader = 'Basic ' + btoa(`${username}:${password}`);
}

export function setBaseUrl(host: string): void {
  // Empty or localhost-like → use relative paths (Vite proxy)
  _baseUrl = host ? `http://${host}` : '';
}

export function clearCredentials(): void {
  _authHeader = null;
  _baseUrl = '';
}

function url(path: string): string {
  return `${_baseUrl}${path}`;
}

function headers(extra?: HeadersInit): HeadersInit {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (_authHeader) h['Authorization'] = _authHeader;
  if (extra) Object.assign(h, extra);
  return h;
}

async function assertOk(res: Response, label: string): Promise<void> {
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${label}: ${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`);
  }
}

// --- Verify credentials by fetching a protected endpoint ---

export async function verifyAuth(): Promise<DeviceInfo> {
  const res = await fetch(url('/api/pub/version'), { headers: headers() });
  await assertOk(res, 'Authentication failed');
  return res.json();
}

// --- Remotes ---

export async function getRemotes(): Promise<RemoteEntity[]> {
  const res = await fetch(url('/api/remotes'), { headers: headers() });
  await assertOk(res, 'Failed to list remotes');
  return res.json();
}

// --- Button commands (physical remote) ---

export async function sendCommand(entityId: string, command: string): Promise<void> {
  const res = await fetch(url(`/api/entities/${encodeURIComponent(entityId)}/command`), {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      cmd_id: 'remote.send_cmd',
      params: { command },
    }),
  });
  await assertOk(res, `Command "${command}" failed`);
}

export async function sendPower(entityId: string, action: 'on' | 'off' | 'toggle'): Promise<void> {
  const res = await fetch(url(`/api/entities/${encodeURIComponent(entityId)}/command`), {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ cmd_id: `remote.${action}` }),
  });
  await assertOk(res, `Power ${action} failed`);
}

// --- Entities ---

export async function getEntities(): Promise<Entity[]> {
  const res = await fetch(url('/api/entities'), { headers: headers() });
  await assertOk(res, 'Failed to list entities');
  return res.json();
}

export async function sendEntityCommand(
  entityId: string,
  cmdId: string,
  params?: Record<string, unknown>,
): Promise<void> {
  const body: Record<string, unknown> = { cmd_id: cmdId };
  if (params) body.params = params;

  const res = await fetch(url(`/api/entities/${encodeURIComponent(entityId)}/command`), {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  await assertOk(res, `Entity command "${cmdId}" failed`);
}

// --- Activities ---

export async function getActivities(): Promise<Activity[]> {
  const res = await fetch(url('/api/activities'), { headers: headers() });
  await assertOk(res, 'Failed to list activities');
  return res.json();
}

export async function sendActivityCommand(
  activityId: string,
  action: 'on' | 'off' | 'toggle',
): Promise<void> {
  const res = await fetch(url(`/api/activities/${encodeURIComponent(activityId)}/command`), {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ cmd_id: `activity.${action}` }),
  });
  await assertOk(res, `Activity ${action} failed`);
}

// --- Profiles & pages ---

export async function getProfiles(): Promise<{ profile_id: string; name: string }[]> {
  const res = await fetch(url('/api/profiles'), { headers: headers() });
  await assertOk(res, 'Failed to list profiles');
  return res.json();
}

export async function getProfilePages(profileId: string): Promise<Page[]> {
  const res = await fetch(url(`/api/profiles/${encodeURIComponent(profileId)}/pages`), { headers: headers() });
  await assertOk(res, 'Failed to get pages');
  return res.json();
}
