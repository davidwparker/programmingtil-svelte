export function getSession({ context }) {
  return {
    API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
  };
}
