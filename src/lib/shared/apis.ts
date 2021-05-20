/*
 * Make requests to some backend
 * Based on https://github.com/sveltejs/realworld/blob/master/src/node_modules/api.js
 */
async function send({
  method,
  path,
  data,
  session,
  base,
}: {
  method: string;
  path: string;
  data?: any;
  session: any;
  base: string;
}): Promise<{
  response: any;
  json: any;
}> {
  const fetch =
    typeof window !== 'undefined'
      ? window.fetch
      : await import('node-fetch').then((mod) => mod.default);
  const opts: any = { method, headers: {} };

  if (data) {
    if (data.creds) {
      opts.credentials = 'include';
      delete data.creds;
    }
    if (!data.type) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(data);
    } else if (data.type === 'formData') {
      // TODO: refactor this to work better for file uploads
      const formData = new FormData();
      formData.append('image', data.image[0]);
      opts.body = formData;
      // NOTE: for `fetch` we don't send Content-Type
      // opts.headers['Content-Type'] = 'multipart/form-data';
    }
  }

  if (session) {
    // Set the JWT_AUD header
    if (session.aud) {
      opts.headers['JWT_AUD'] = session.aud;
    }

    // Set the Authorization header
    if (session.jwt) {
      if (session.jwt.includes('Bearer')) {
        opts.headers['Authorization'] = session.jwt;
      } else {
        opts.headers['Authorization'] = `Bearer ${session.jwt}`;
      }
    }
  }

  const fullPath: string = encodeURI(`${base}/${path}`);
  if (import.meta.env.VITE_DEBUG_MODE) {
    console.log(method, fullPath);
    console.log(opts);
  }
  const response = await fetch(fullPath, opts);
  const json: any = await response.json();
  if (import.meta.env.VITE_DEBUG_MODE) {
    console.log('DEBUG:', json);
  }
  return { response, json };
}

/*
 * Shortcut methods for send
 */
export function get(
  base: string,
  path: string,
  session?: any
): Promise<{
  response: any;
  json: any;
}> {
  return send({ method: 'GET', path, session, base });
}

export function del(
  base: string,
  path: string,
  data: any,
  session?: any
): Promise<{
  response: any;
  json: any;
}> {
  return send({ method: 'DELETE', path, data, session, base });
}

export function post(
  base: string,
  path: string,
  data: any,
  session?: any
): Promise<{
  response: any;
  json: any;
}> {
  return send({ method: 'POST', path, data, session, base });
}

export function put(
  base: string,
  path: string,
  data: any,
  session?: any
): Promise<{
  response: any;
  json: any;
}> {
  return send({ method: 'PUT', path, data, session, base });
}

//
// Via Dana Woodman
// https://dev.to/danawoodman/getting-form-body-data-in-your-sveltekit-endpoints-4a85
//
export function getFormBody(body: any): any {
  if (body.entries instanceof Function) {
    return [...body.entries()].reduce((data, [k, v]) => {
      let value = v;
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (k in data) data[k] = Array.isArray(data[k]) ? [...data[k], value] : [data[k], value];
      else data[k] = value;
      return data;
    }, {});
  }
  return body;
}
