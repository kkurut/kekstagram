import { getRandom, isEnterKey, isEscapeKey } from "./util";
import { arrayPic } from './data-generate.js'
const bodyElement = document.querySelector('body');
const modalOpenElement = document.querySelector('.modal-open');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureAvatarElement = bigPictureElement.querySelector('.social__picture');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const picturesElement = document.querySelector('.pictures');
const commentLoaderElement = document.querySelector('.comments-loader');
const bigPictureDescription = bigPictureElement.querySelector('.social__caption');
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

//* Функция открытия бигфото
const kek = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open')
  document.addEventListener('keydown', onEscKeydown)
}

//* Функция закрытия бигфото
const kekCancel = () => {
  bigPictureElement.classList.add('hidden')
  bodyElement.classList.remove('modal-open')
  document.removeEventListener('keydown', onEscKeydown)
}

//*получаем данные бигфото
const getBigPhoto = (photoId) => {
  const picData = arrayPic[photoId - 1];

  bigPictureElement.querySelector('.big-picture__img img').src = picData.url;
  bigPictureElement.querySelector('.likes-count').textContent = picData.likes;
  bigPictureElement.querySelector('.social__caption').textContent = picData.description;
};


//* функция при клике на миниатюру
const ClickPhoto = (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    const currentPic = parseInt(thumbnail.querySelector('.picture__img').dataset.photoId, 10);
    getBigPhoto(currentPic)
    kek()
  }
}





//* обработчик событий для миниатюр
picturesElement.addEventListener('click', ClickPhoto);
//* обработчик события для крестика
bigPictureCancelElement.addEventListener('click', kekCancel)


export { kekCancel };
