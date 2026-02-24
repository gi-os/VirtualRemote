import type { DeviceInfo, RemoteEntity, Entity, Activity, Page } from './types';

const JSON_HEADERS: HeadersInit = { 'Content-Type': 'application/json' };
const FETCH_OPTS: RequestInit = { credentials: 'include' };

function opts(extra?: RequestInit): RequestInit {
  return { ...FETCH_OPTS, ...extra };
}

async function assertOk(res: Response, label: string): Promise<void> {
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${label}: ${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`);
  }
}

// --- Auth ---

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch('/api/pub/login', opts({
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ username, password }),
  }));
  await assertOk(res, 'Login failed');
}

export async function logout(): Promise<void> {
  await fetch('/api/pub/logout', opts({ method: 'POST' })).catch(() => {});
}

// --- Device info ---

export async function getVersion(): Promise<DeviceInfo> {
  const res = await fetch('/api/pub/version', opts());
  await assertOk(res, 'Failed to get version');
  return res.json();
}

// --- Remotes ---

export async function getRemotes(): Promise<RemoteEntity[]> {
  const res = await fetch('/api/remotes', opts());
  await assertOk(res, 'Failed to list remotes');
  return res.json();
}

// --- Button commands (physical remote) ---

export async function sendCommand(entityId: string, command: string): Promise<void> {
  const res = await fetch(`/api/entities/${encodeURIComponent(entityId)}/command`, opts({
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify({
      cmd_id: 'remote.send_cmd',
      params: { command },
    }),
  }));
  await assertOk(res, `Command "${command}" failed`);
}

export async function sendPower(entityId: string, action: 'on' | 'off' | 'toggle'): Promise<void> {
  const res = await fetch(`/api/entities/${encodeURIComponent(entityId)}/command`, opts({
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify({ cmd_id: `remote.${action}` }),
  }));
  await assertOk(res, `Power ${action} failed`);
}

// --- Entities ---

export async function getEntities(): Promise<Entity[]> {
  const res = await fetch('/api/entities', opts());
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

  const res = await fetch(`/api/entities/${encodeURIComponent(entityId)}/command`, opts({
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  }));
  await assertOk(res, `Entity command "${cmdId}" failed`);
}

// --- Activities ---

export async function getActivities(): Promise<Activity[]> {
  const res = await fetch('/api/activities', opts());
  await assertOk(res, 'Failed to list activities');
  return res.json();
}

export async function sendActivityCommand(
  activityId: string,
  action: 'on' | 'off' | 'toggle',
): Promise<void> {
  const res = await fetch(`/api/activities/${encodeURIComponent(activityId)}/command`, opts({
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify({ cmd_id: `activity.${action}` }),
  }));
  await assertOk(res, `Activity ${action} failed`);
}

// --- Profiles & pages ---

export async function getProfiles(): Promise<{ profile_id: string; name: string }[]> {
  const res = await fetch('/api/profiles', opts());
  await assertOk(res, 'Failed to list profiles');
  return res.json();
}

export async function getProfilePages(profileId: string): Promise<Page[]> {
  const res = await fetch(`/api/profiles/${encodeURIComponent(profileId)}/pages`, opts());
  await assertOk(res, 'Failed to get pages');
  return res.json();
}
