const URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET: '/data',
  POST: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};

const loadRequest = (route, method, body = null) =>
  fetch(`${URL}${route}`, {
    method,
    body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}:${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error.message);
    });

const getData = () => loadRequest(Route.GET, Method.GET);
const sendData = (body) => loadRequest(Route.POST, Method.POST, body);
export { getData, sendData };
