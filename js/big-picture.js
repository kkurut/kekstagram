import { getRandom, isEnterKey, isEscapeKey } from "./util";
import { createPictures} from "./data-generate";
const bodyElement = document.querySelector('body');
const modalOpenElement = document.querySelector('.modal-open');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const picturesElement = document.querySelector('.pictures');
const commentLoaderElement = document.querySelector('.comments-loader');

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
const getBigPictureData = (photoId) => {
  bigPictureElement.querySelector('img').src = createPictures[photoId - 1].url;
}

//* Функция открытия бигфото
const kek = (evt) => {
  const currentPhotoId = evt.target.dataset.photoId;
  getBigPictureData(currentPhotoId);
  bigPictureElement.classList.remove('hidden')
  document.addEventListener('keydown', onEscKeydown)
}

//* Функция закрытия бигфото
const kekCancel = () => {
  bigPictureElement.classList.add('hidden')
  document.removeEventListener('keydown', onEscKeydown)
}

//* обработчик событий для миниатюр
picturesElement.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture  ')) {
    evt.preventDefault();
    kek()
  };
})

//* обработчик события для крестика
bigPictureCancelElement.addEventListener('click', (evt) => {
    kekCancel()
})


export { kek, kekCancel };
