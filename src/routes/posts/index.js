import cookie from 'cookie';
import * as api from '$lib/shared/apis.js';

//
// Via Dana Woodman
// https://dev.to/danawoodman/getting-form-body-data-in-your-sveltekit-endpoints-4a85
//
function getFormBody(body) {
  return [...body.entries()].reduce((data, [k, v]) => {
    let value = v;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    if (k in data) data[k] = Array.isArray(data[k]) ? [...data[k], value] : [data[k], value];
    else data[k] = value;
    return data;
  }, {});
}

// POST /posts
export const post = async (request) => {
  let body = request.body;
  if (body.entries instanceof Function) {
    body = getFormBody(request.body);
  }
  let title = body?.post?.title || body['title'];
  let content = body?.post?.content || body['content'];
  const cookies = cookie.parse(request.headers.cookie || '');
  const cookiesArray = [];
  const { response, json } = await api.post(
    request.context.API_ENDPOINT,
    `api/v1/posts/`,
    {
      post: {
        title,
        content,
      },
    },
    {
      aud: request.headers.jwt_aud || 'UNKNOWN',
      jwt: cookies.jwt,
    }
  );
  if (response.status === 200) {
    // Nada
  } else if (response.status === 401 || response.status === 404 || response.status === 406) {
    return {
      status: 401,
      body: 'bad',
    };
  } else if (response.status === 500) {
    return {
      status: 500,
      body: 'bad',
    };
  }
  // TODO: check for bad JWT/delete.
  let headers = {
    ...response.headers,
    'set-cookie': cookiesArray,
  };

  // See SvelteKit Demo App for redirect
  if (response.status === 200 && request.headers['content-type'] !== 'application/json') {
    headers.location = '/';
    return {
      status: 303,
      headers,
      body: '',
    };
  }

  return {
    status: response.status,
    body: json,
    headers,
  };
};
