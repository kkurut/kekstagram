import { isEscapeKey } from './util';
import { displayComments } from './display-comments.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const picturesElement = document.querySelector('.pictures');

const onEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKey);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKey);
};

const renderBigPicture = (array) => {
  const getBigPhoto = (photoId) => {
    const pictureData = array[photoId];

    bigPictureElement.dataset.photoId = photoId;
    bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;
    displayComments(pictureData.comments);
  };

  const onClickPhoto = (evt) => {
    const thumbnail = evt.target.closest('.picture');

    if (thumbnail) {
      const currentPicture = thumbnail.querySelector('.picture__img').dataset.photoId;
      getBigPhoto(currentPicture);
      openBigPicture();
    }
  };

  picturesElement.addEventListener('click', onClickPhoto);
  bigPictureCancelElement.addEventListener('click', closeBigPicture);
};

export { renderBigPicture };
