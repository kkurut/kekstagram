import { isEscapeKey } from './util';

const bodyElement = document.querySelector('body');
const formUploadElement = document.querySelector('.img-upload__form');
const inputFormElement = formUploadElement.querySelector('.img-upload__input');
const overlayFormElement = formUploadElement.querySelector('.img-upload__overlay');
const cancelFormElement = formUploadElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formUploadElement.querySelector('.text__hashtags');
const descriptionInputElement = formUploadElement.querySelector('.text__description');

const HASHTAG_STROKE = /^#[A-ZА-ЯЁa-zа-яё0-9]{1,19}$/;
const Error = {
  INVALID_UNIQUE: 'хэштеги повторяются',
  INVALID_TAG_LENGTH: 'превышена допустимая длина хештега',
  INVALID_COUNT: 'превышено количество хэштегов',
  INCORECT_TAG: 'введён невалидный хэштег',
};

const pristine = new Pristine(formUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getNormalizeStr = (str) => str.trim().split(/\s+/);

const checkValid = (words) => getNormalizeStr(words).every((word) => HASHTAG_STROKE.test(word));

const checkMaxLengthTag = (words) => {
  const nomalizeStr = getNormalizeStr(words);
  nomalizeStr.map((word) => word.length);
  return nomalizeStr.every((word) => word.length <= 19);
};

const checkWordQnty = (words) => getNormalizeStr(words).length <= 5;

function normalizeAndCheckUniqueness(words) {
  const wordsArray = getNormalizeStr(words.toLowerCase());
  const uniqueWords = new Set();

  for (const word of wordsArray) {
    if (uniqueWords.has(word)) {
      return false;
    }
    uniqueWords.add(word);
  }
  return true;
}

pristine.addValidator(hashtagsInputElement, checkValid, Error.INCORECT_TAG);
pristine.addValidator(hashtagsInputElement, checkWordQnty, Error.INVALID_COUNT);
pristine.addValidator(hashtagsInputElement, checkMaxLengthTag, Error.INVALID_TAG_LENGTH);
pristine.addValidator(hashtagsInputElement, normalizeAndCheckUniqueness, Error.INVALID_UNIQUE);

formUploadElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const isFocused = () => document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement;

const onEscapeKey = (evt) => {
  if (isEscapeKey(evt) && !isFocused()) {
    // eslint-disable-next-line
    onCloseForm();
  }
};

const onOpenForm = () => {
  overlayFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKey);
};

const onCloseForm = () => {
  overlayFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKey);
  formUploadElement.reset();
  pristine.reset();
};

const openAndCloseForm = () => {
  inputFormElement.addEventListener('change', onOpenForm);
  cancelFormElement.addEventListener('click', onCloseForm);
};

export { openAndCloseForm };
