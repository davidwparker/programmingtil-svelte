import cookie from 'cookie';
import * as api from '$lib/shared/apis.js';

// POST /posts
export const post = async (request) => {
  const body = api.getFormBody(request.body);
  const cookies = cookie.parse(request.headers.cookie || '');
  const cookiesArray = [];
  const { response, json } = await api.post(
    request.locals.API_ENDPOINT,
    `api/v1/posts/`,
    {
      post: {
        title: body['title'],
        content: body['content'],
      },
    },
    {
      aud: request.headers.jwt_aud || 'UNKNOWN',
      jwt: cookies.jwt,
    }
  );
  // TODO: check for bad JWT/delete cookie.
  let headers = {
    ...response.headers,
    'set-cookie': cookiesArray,
  };

  if (request.headers['content-type'] !== 'application/json') {
    if ([200].includes(response.status)) {
      headers.location = '/?success=t';
    } else if ([401, 404, 406, 500].includes(response.status)) {
      headers.location = `/?error=${json.error}`;
    }
    return {
      status: 303,
      body: '',
      headers,
    };
  }

  return {
    status: response.status,
    body: json,
    headers,
  };
};
