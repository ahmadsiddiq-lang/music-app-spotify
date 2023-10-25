/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CLIENT_ID: string,
  readonly VITE_APP_CLIENT_SECRET: string,
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_AUTH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

type FetchError = {
  message?: string;
  code?: number;
} | null;

type statusFetch = 'success' | 'fetching' | 'error' | 'idl'

type Store<Data> = {
  data: Data,
  set: (e: Data) => void,
  reset: () => void
}