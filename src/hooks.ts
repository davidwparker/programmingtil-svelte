import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const getSession: GetSession = (request) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  const loggedIn = cookies.jwt !== undefined || false;
  const userId = cookies.userId || 0;
  const username = cookies.username || '';
  const displayName = cookies.displayName || '';
  const theme = cookies.theme || 'dark';
  return {
    API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    BASE_ENDPOINT: import.meta.env.VITE_BASE_ENDPOINT,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
    loggedIn,
    theme,
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
  const cookies = cookie.parse(request.headers.cookie || '');
  let headers = response.headers;
  const cookiesArray = [];
  if (!cookies.theme) {
    const theme = request.query.get('theme') || 'dark';
    cookiesArray.push(`theme=${theme};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`);
  }
  if (cookiesArray.length > 0) {
    headers = {
      ...response.headers,
      'set-cookie': cookiesArray,
    };
  }

  return {
    ...response,
    headers,
  };
};
