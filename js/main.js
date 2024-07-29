// main.js
import { fetchData } from './get-data.js';
import { similarPictures } from './render-thumbnail.js';
import { renderBigPicture } from './big-picture.js';
import { openAndCloseForm } from './form.js';
import { getEditImg } from './edit-picture.js';

// Асинхронная функция для инициализации приложения
async function init() {
    try {
        const data = await fetchData(); // Получаем данные с сервера

        similarPictures(data); // Передаем данные в similarPictures
        renderBigPicture(data); // Передаем данные в renderBigPicture
    } catch (error) {
        console.error('Error initializing application:', error);
    }

    openAndCloseForm();
    getEditImg();
}

// Запускаем инициализацию приложения
init();
