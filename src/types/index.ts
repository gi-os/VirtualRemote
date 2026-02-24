export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export interface ApiEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  description: string;
  category: EndpointCategory;
  authRequired: boolean;
  requestBody?: string;
}

export type EndpointCategory =
  | 'public'
  | 'auth'
  | 'entities'
  | 'activities'
  | 'macros'
  | 'remotes'
  | 'ir'
  | 'profiles'
  | 'integrations'
  | 'configuration'
  | 'system'
  | 'resources'
  | 'dock';

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

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
}

export interface WsMessageExample {
  id: string;
  title: string;
  kind: 'req' | 'resp' | 'event';
  description: string;
  payload: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface CommunityProject {
  name: string;
  url: string;
  description: string;
  language: string;
  official: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;
