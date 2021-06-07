import sha256 from 'crypto-js/sha256.js';

export function audBuilder(bd: any): string {
  const version = parseInt(bd.browser.version);
  const str = `${bd.os.name}||${bd.os.version}||||${bd.browser.name}||${version}`;
  return sha256(str).toString();
}

/*
 * Gets browser information based on native javascript built in functionality
 * https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
 * Usage: const bd = browserDetector(navigator, window).init();
 * bd.os.{name|version}, bd.browser.{name|version}
 */
export function browserDetector(navigator: any, window: any): any {
  const module = {
    options: [],
    header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
    dataOS: [
      { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
      { name: 'Windows', value: 'Win', version: 'NT' },
      { name: 'iPhone', value: 'iPhone', version: 'OS' },
      { name: 'iPad', value: 'iPad', version: 'OS' },
      { name: 'Kindle', value: 'Silk', version: 'Silk' },
      { name: 'Android', value: 'Android', version: 'Android' },
      { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
      { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
      { name: 'Macintosh', value: 'Mac', version: 'OS X' },
      { name: 'Linux', value: 'Linux', version: 'rv' },
      { name: 'Palm', value: 'Palm', version: 'PalmOS' },
    ],
    dataBrowser: [
      { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
      { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
      { name: 'Safari', value: 'Safari', version: 'Version' },
      { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
      { name: 'Opera', value: 'Opera', version: 'Opera' },
      { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
      { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' },
    ],
    init: function () {
      const agent = this.header.join(' '),
        os = this.matchItem(agent, this.dataOS),
        browser = this.matchItem(agent, this.dataBrowser);
      return { os, browser };
    },
    matchItem: function (string, data) {
      let i = 0,
        j = 0,
        regex,
        regexv,
        match,
        matches,
        version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, 'i');
        match = regex.test(string);
        if (match) {
          regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
          matches = string.match(regexv);
          version = '';
          if (matches) { if (matches[1]) { matches = matches[1]; } }
          if (matches) {
            matches = matches.split(/[._]+/);
            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += matches[j] + '.';
              } else {
                version += matches[j];
              }
            }
          } else {
            version = '0';
          }
          return {
            name: data[i].name,
            version: parseFloat(version)
          };
        }
      }
      return { name: 'unknown', version: 0 };
    }
  };
  return module;
}

/*
 * Get a specific cookie by name
 */
export function getCookie(name: string): string {
  return document.cookie.split('; ').find(row => row.startsWith(name));
}

/*
 * Get the value of a specific cookie by name
 */
export function getCookieValue(name: string): string|boolean {
  const cookiesPresent = getCookie(name);
  if (cookiesPresent) {
    return cookiesPresent.split('=')[1];
  }
  return false;
}

/*
 * Given a word and count, pluralize the word.
 * Optionally, include withCount = false to not include the # in the returned string
 */
export function pluralize(word, count, withCount = true) {
  const out = (count > 1 || count === 0) ? `${word}s` : word;
  return withCount ? `${count} ${out}` : out;
}


/*
 * Returns a redirect if needed
 */
export function protectedRedirect(session, base) {
  if (!session.loggedIn) {
    return {
      redirect: '/users/sign-in',
      status: 303,
    };
  }
  return base;
}

