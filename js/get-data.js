const bodyElement = document.querySelector('body');
const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

const promise = new Promise((resolve, reject) => {
  return fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      resolve(data)
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
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
