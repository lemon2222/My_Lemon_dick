const _time = (url = "") => {
  let time = new Date().getTime();
  let newUrl = "";
  url ? (newUrl = `${url}&_t=${time}`) : (newUrl = `${url}?_t=${time}`);
  return newUrl;
};

const _random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export {
  _time,
  _random
}