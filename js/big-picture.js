import { getRandom, isEnterKey, isEscapeKey } from "./util";
import { arrayPic, getPicture } from "./data-generate";
const bodyElement = document.querySelector('body');
const modalOpenElement = document.querySelector('.modal-open');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img')
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureAvatarElement = bigPictureElement.querySelector('.social__picture');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const picturesElement = document.querySelector('.pictures');
const commentLoaderElement = document.querySelector('.comments-loader');
const bigPictureDescription = bigPictureElement.querySelector('.social__caption');
const bigPictureLikes = bigPictureElement.querySelector('.likes-count');
const bigPictureComments = bigPictureElement.querySelector('.social__comment-count');

//! не работает уёба

//* пока хз как работает
const onEscKeydown = (evt) => {
  //* проверка нажатия ескейпа
  if (isEscapeKey(evt)) {
    //* ссылка отключается и вызывается функция
    evt.preventDefault();
    kekCancel()
  }
}


//*получаем данные бигфото
const showBigPicture = ({ url, description, avatar, likes }) => {
  bigPictureImgElement.src = url;
  bigPictureDescriptionElement.textContent = description;
  bigPictureAvatarElement.src = avatar;
  bigPictureLikes.textContent = likes;
  bigPictureElement.classList.remove('hidden'); // Показываем big-picture
};

const kek = (event) => {
  const thumbnail = event.target.closest('.picture');
  if (!thumbnail) return;

  const url = thumbnail.querySelector('.picture__img').src;
  const avatar = `img/avatar-${getRandom(1, 6)}.svg`;
  const description = thumbnail.querySelector('.picture__img').alt;
  const likes = thumbnail.querySelector('.picture__likes').textContent;
  const comments = thumbnail.querySelector('.picture__comments').textContent;

  showBigPicture({ url, description, avatar, likes});

  document.addEventListener('keydown', onEscKeydown)
}

//* Функция закрытия бигфото
const kekCancel = () => {
  bigPictureElement.classList.add('hidden')
  document.removeEventListener('keydown', onEscKeydown)
}

//* обработчик событий для миниатюр
picturesElement.addEventListener('click', kek);
//* обработчик события для крестика
bigPictureCancelElement.addEventListener('click', kekCancel)


export { kekCancel };
