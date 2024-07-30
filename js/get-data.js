const bodyElement = document.querySelector('body');
const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

const GET_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';

const promise = new Promise((resolve, reject) => {
  return fetch(GET_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      resolve(data)
    })
    .catch((error) => {
      console.error(error);
      const errorCreate = () => {
        const errorElement = errorTemplateElement.cloneNode(true);
        bodyElement.append(errorElement);
        setTimeout(() => {
          errorElement.remove()
        }, 5000)
      }
      errorCreate()
      reject(error)
    });
});

export { promise };
