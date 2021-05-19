import cookie from 'cookie';

export const getSession = (request) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  const loggedIn = cookies.jwt !== undefined || false;
  const userId = cookies.userId || 0;
  return {
    API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    BASE_ENDPOINT: import.meta.env.VITE_BASE_ENDPOINT,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
    loggedIn,
    userId,
  };
};

export const handle = async ({ request, render }) => {
  request.locals.API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  request.locals.BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;
  request.locals.DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE;

  // TODO https://github.com/sveltejs/kit/issues/1046
  const response = await render({
    ...request,
    method: (request.query.get('_method') || request.method).toUpperCase(),
  });
  let headers = response.headers;
  return {
    ...response,
    headers,
  };
};
