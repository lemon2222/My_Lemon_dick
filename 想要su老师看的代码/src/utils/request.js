import axios from "axios";
import { _time } from "./utils.js";

axios.defaults.headers.post["Content-Type"] = "application/json";

const instance = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/1905a172ca277c66937e8002c3192aac/school",
  timeout: 15000,
});

instance.interceptors.request.use(
  function(config) {
    let url = config.url.split("?");
    url.length > 1
      ? (config.url = `${url[0]}?${_time(url[1])}`)
      : (config.url = `${url[0]}${_time(url[1])}`);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(res) {
    let { data } = res;
    if (Number(data.code) === 0) {
      //做点啥
    }
    return res;
  },
  function(err) {
    return Promise.reject(err);
  }
);

function get(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}


function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response.data.data);
      },
      (err) => {
        reject(err.data);
      }
    );
  });
}

function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.patch(url, data).then(
      (response) => {
        resolve(response.data.data);
      },
      (err) => {
        reject(err.data);
      }
    );
  });
}

function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.put(url, data).then(
      (response) => {
        resolve(response.data.data);
      },
      (err) => {
        reject(err.data);
      }
    );
  });
}

export { get, post, patch, put };
