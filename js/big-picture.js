import { isEscapeKey } from './util';
import { arrayPic } from './data-generate.js';
const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const picturesElement = document.querySelector('.pictures');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');

const onEscKeydown = (evt) => {
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
  document.addEventListener('keydown', onEscKeydown);
};

//* Функция закрытия бигфото
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

//* создание коментария
const createComment = ({ avatar, name, message }) => {
  const socialCommentElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);
  const socialPicture = socialCommentElement.querySelector('.social__picture');

  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

//* создание списка коментариев текущей мииатюры
const displayComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentEl = createComment(comment);
    fragment.appendChild(commentEl);
  });

  socialCommentsElement.innerHTML = '';
  socialCommentsElement.appendChild(fragment);
};

//*получаем данные бигфото
const getBigPhoto = (photoId) => {
  const picData = arrayPic[photoId];

  bigPictureElement.dataset.photoId = photoId; // Устанавливаем data-photo-id
  bigPictureElement.querySelector('.big-picture__img img').src = picData.url;
  bigPictureElement.querySelector('.likes-count').textContent = picData.likes;
  bigPictureElement.querySelector('.social__caption').textContent = picData.description;
  displayComments(picData.comments);
};


//* функция при клике на миниатюру
const clickPhoto = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const currentPic = thumbnail.querySelector('.picture__img').dataset.photoId;
    getBigPhoto(currentPic);
    openBigPicture();
  }
};

//* обработчик событий для миниатюр
picturesElement.addEventListener('click', clickPhoto);
//* обработчик события для крестика
bigPictureCancelElement.addEventListener('click', closeBigPicture);
