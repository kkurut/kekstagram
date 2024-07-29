const bodyElement = document.querySelector('body');
const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

export async function fetchData() {
  try {
    const response = await fetch('https://32.jaavascript.htmlacademy.pro/kekstagram/data'); // Замените URL на ваш
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json(); // Преобразуем ответ в формат JSON
    return data; // Возвращаем данные
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    const errorCreate = () => {
      const errorElement = errorTemplateElement.cloneNode(true);
      bodyElement.append(errorElement);
      setTimeout(() => {
        errorElement.remove()
      }, 5000)
    }
    errorCreate();
    throw error;
  }
}
