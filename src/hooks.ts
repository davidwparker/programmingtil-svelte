import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const getSession: GetSession = (request) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  const loggedIn = cookies.jwt !== undefined || false;
  const userId = cookies.userId || 0;
  const username = cookies.username || '';
  const displayName = cookies.displayName || '';
  return {
    API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    BASE_ENDPOINT: import.meta.env.VITE_BASE_ENDPOINT,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
    loggedIn,
    userId,
    user: {
      id: userId,
      displayName,
      username,
    },
  };
};

export const handle: Handle = async ({ request, render }) => {
  request.locals.API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  request.locals.BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;
  request.locals.DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE;

  // TODO https://github.com/sveltejs/kit/issues/1046
  const response = await render({
    ...request,
    method: (request.query.get('_method') || request.method).toUpperCase(),
  });
  const headers = response.headers;
  return {
    ...response,
    headers,
  };
};
