export const getContext = (request) => {
  console.log('getContext');
  return {
    API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    BASE_ENDPOINT: import.meta.env.VITE_BASE_ENDPOINT,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
  };
};

export const getSession = (context) => {
  console.log('getSession');
  return {
    API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    BASE_ENDPOINT: import.meta.env.VITE_BASE_ENDPOINT,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
  };
};

export const handle = async ({ request, render }) => {
  console.log('handle');
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
