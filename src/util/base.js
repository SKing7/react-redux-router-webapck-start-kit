export const normalizePath = (str) => {
  str = str.replace(/[\\\/]+/g, '/');
  return str;
};
