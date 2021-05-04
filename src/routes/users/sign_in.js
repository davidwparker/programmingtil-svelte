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

//
// POST /users/sign_in
//
export const post = async (request) => {
  let body = request.body;
  if (body.entries instanceof Function) {
    body = getFormBody(request.body);
  }
  let login = body?.user?.login || body['user[login]'];
  let password = body?.user?.password || body['user[password]'];
  const cookies = cookie.parse(request.headers.cookie || '');
  const cookiesArray = [];
  const { response, json } = await api.post(
    request.context.API_ENDPOINT,
    'users/sign_in',
    {
      user: { login, password },
      browser: request.body?.browser,
      ip: request.body?.ip,
      os: request.body?.os,
    },
    { aud: request.headers.jwt_aud || 'UNKNOWN' }
  );
  let headers = response.headers;
  if (response.status === 200) {
    if (!cookies.jwt) {
      cookiesArray.push(
        `jwt=${json.jwt};path=/;HttpOnly;Secure;expires=Fri, 31 Dec 9999 23:59:59 GMT`
      );
      // `jwt=${json.jwt};path=/;Secure;expires=Fri, 31 Dec 9999 23:59:59 GMT`
    }
    delete json.jwt;
  } else if (response.status === 401) {
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

  if (cookiesArray.length > 0) {
    headers = {
      ...response.headers,
      'set-cookie': cookiesArray,
    };
  }

  // See SvelteKit Demo App for redirect
  if (response.status === 200 && request.headers['content-type'] !== 'application/json') {
    headers.location = '/';
    console.log(headers)
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
