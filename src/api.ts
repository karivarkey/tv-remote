import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Trigger a global event to instantly fetch TV stats after any successful command
api.interceptors.response.use((response) => {
  // We strictly trigger side-effects only on actioning methods (POST/PUT/DELETE)
  // This prevents infinite GET polling loops
  if (response.config.method && ['post', 'put', 'delete'].includes(response.config.method.toLowerCase())) {
    window.dispatchEvent(new CustomEvent('tv-remote-action'));
  }
  return response;
});
