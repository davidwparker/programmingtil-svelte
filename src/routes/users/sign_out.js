import cookie from 'cookie';
import * as api from '$lib/shared/apis.js';

// DELETE /users/sign_out
export const del = async (request) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  const cookiesArray = [];

  const { response, json } = await api.del(
    request.context.API_ENDPOINT,
    'users/sign_out',
    {},
    { jwt: cookies.jwt }
  );
  if (response.status === 200) {
    if (cookies.jwt) {
      cookiesArray.push(`jwt=;path=/;HttpOnly;Secure;expires=Thu, 01 Jan 1970 00:00:00 GMT`);
      cookiesArray.push(`userId=;path=/;HttpOnly;Secure;expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    }
  }

  headers = {
    ...response.headers,
    'set-cookie': cookiesArray,
  };

  if (request.headers['content-type'] !== 'application/json') {
    if ([200].includes(response.status)) {
      headers.location = '/?success=t';
    } else if ([401, 500].includes(response.status)) {
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
