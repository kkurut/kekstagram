import { isEscapeKey } from "./util";

const bodyElement = document.querySelector('body')
const formUploadElement = document.querySelector('.img-upload__form');
const inputUploadElement = formUploadElement.querySelector('.img-upload__input');
const overlayUploadElement = formUploadElement.querySelector('.img-upload__overlay');
const cancelUploadElement = formUploadElement.querySelector('.img-upload__cancel')
const hashtagsInputElement = formUploadElement.querySelector('.text__hashtags');
const descriptionInputElement = formUploadElement.querySelector('.text__description');

const HASHTAG_STROKE = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_QNTY = 5;
const Error = {
  INVALID_COUNT: `превышено количество хэштегов, более: ${MAX_HASHTAG_QNTY}`,
  NOT_UNIQUE: 'хэштеги повторяются',
  INVALID_PATTERN: 'введён невалидный хэштег',
};

const pristine = new Pristine(formUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isFocused = () =>  document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement;

const onEscapeKey = (evt) => {
  if (isEscapeKey(evt) && !isFocused()) {
    // eslint-disable-next-line
    onCloseForm()
  }
};

const onOpenForm = () => {
  overlayUploadElement.classList.remove('hidden')
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKey);
}

const onCloseForm = () => {
  overlayUploadElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKey);
  formUploadElement.reset();
  pristine.reset();
}

inputUploadElement.addEventListener('change', onOpenForm)

cancelUploadElement.addEventListener('click', onCloseForm)
