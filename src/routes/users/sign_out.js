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
  } else if (response.status === 401) {
    return {
      status: 401,
      body: 'bad',
    };
  } else if (response.status === 500) {
    return {
      status: 500,
      body: 'bad me',
    };
  }

  if (cookiesArray.length > 0) {
    headers = {
      ...response.headers,
      'set-cookie': cookiesArray,
    };
  }

  return {
    status: response.status,
    body: json,
    headers,
  };
};

// TEMP- until convert sign out to a form
export const get = async (request) => {
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
      cookiesArray.push(`userId=;path=/;HttpOnly;Secure;expires=Fri, 31 Dec 9999 23:59:59 GMT`);
    }
  } else if (response.status === 401) {
    return {
      status: 401,
      body: 'bad',
    };
  } else if (response.status === 500) {
    return {
      status: 500,
      body: 'bad me',
    };
  }

  if (cookiesArray.length > 0) {
    headers = {
      ...response.headers,
      'set-cookie': cookiesArray,
    };
  }

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
