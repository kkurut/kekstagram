import { isEscapeKey } from './util';
import { arrayPictures } from './data-generate.js';
import { displayComments } from './display-comments.js';
const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const picturesElement = document.querySelector('.pictures');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const onEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line
    closeBigPicture();
  }
};

//* Функция открытия бигфото
const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onEscapeKey);
};

//* Функция закрытия бигфото
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKey);
};

//*получаем данные бигфото
const getBigPhoto = (photoId) => {
  const pictureData = arrayPictures[photoId];

  bigPictureElement.dataset.photoId = photoId; // Устанавливаем data-photo-id
  bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
  bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;
  displayComments(pictureData.comments);
};


//* функция при клике на миниатюру
const onClickPhoto = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const currentPicture = thumbnail.querySelector('.picture__img').dataset.photoId;
    getBigPhoto(currentPicture);
    openBigPicture();
  }
};

//* обработчик событий для миниатюр
picturesElement.addEventListener('click', onClickPhoto);
//* обработчик события для крестика
bigPictureCancelElement.addEventListener('click', closeBigPicture);
