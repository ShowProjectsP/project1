export const setToCookieStorage = (value) => {
  if (_.isArray(value))
    _.each(value, (val) => {
      document.cookie = val;
    });
  else
    document.cookie = value;
};

export const getFromCookieStorage = (key) => {
  let cookie = document.cookie;

  if (cookie.indexOf(key) < 0) return false;

  let value = cookie.substring(cookie.indexOf(key) + `${key}=`.length, cookie.length).split(' ');

  if (value && value[0]) {
    value = value[0].substring(0, value[0].length - 1);
  }

  return value;
};

export const removeFromCookieStorage = (value) => {
  if (_.isArray(value))
    _.each(value, (val) => {
      document.cookie = `${val}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    });
  else
    document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};