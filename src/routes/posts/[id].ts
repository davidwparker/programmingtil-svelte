import type { Response, Request } from '@sveltejs/kit';
import cookie from 'cookie';
import * as api from '$lib/shared/apis';

// POST /posts/:id
export const post = async (request: Request): Promise<Response> => {
  const body = api.getFormBody(request.body);
  const cookies = cookie.parse(request.headers.cookie || '');
  const cookiesArray = [];
  const { response, json } = await api.put(
    request.locals.API_ENDPOINT,
    `api/v1/posts/${request.params.id}`,
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
  // TODO: check for bad JWT/delete.
  const headers = {
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

// DELETE /posts/:id
export const del = async (request: Request): Promise<Response> => {
  const cookies = cookie.parse(request.headers.cookie || '');
  const cookiesArray = [];
  const { response, json } = await api.del(
    request.locals.API_ENDPOINT,
    `api/v1/posts/${request.params.id}`,
    {},
    {
      aud: request.headers.jwt_aud || 'UNKNOWN',
      jwt: cookies.jwt,
    }
  );
  // TODO: check for bad JWT/delete cookie.
  const headers = {
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
