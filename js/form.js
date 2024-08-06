import { isEscapeKey } from './util';
import { getOriginalEffect } from './edit-picture';

const SubmitButtonText = {
  CONSTANT: 'Опубликовать',
  SUBMITING: 'Публикую...'
};

const HASHTAG_STROKE = /^(#[a-zа-яё0-9]{1,19})?$/i;
const Error = {
  INVALID_UNIQUE: 'хэштеги повторяются',
  INVALID_COUNT: 'превышено количество хэштегов',
  INCORECT_TAG: 'введён невалидный хэштег',
  INVALID_COMMENT: 'длина комментария больше 140 символов.'
};

const bodyElement = document.querySelector('body');
const formUploadElement = bodyElement.querySelector('.img-upload__form');
const previewImgElement = formUploadElement.querySelector('.img-upload__preview img');
const inputFormElement = formUploadElement.querySelector('.img-upload__input');
const overlayFormElement = formUploadElement.querySelector('.img-upload__overlay');
const cancelFormElement = formUploadElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formUploadElement.querySelector('.text__hashtags');
const descriptionInputElement = formUploadElement.querySelector('.text__description');
const previewEffectElements = formUploadElement.querySelectorAll('.effects__preview');
const btnSubmitFormElement = formUploadElement.querySelector('.img-upload__submit');


const pristine = new Pristine(formUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getNormalizeStr = (string) => string.trim().split(/\s+/);

const checkValid = (words) => getNormalizeStr(words).every((word) => HASHTAG_STROKE.test(word));

const checkWordQnty = (words) => getNormalizeStr(words).length <= 5;

const checkCommentLenght = (string) => string.length <= 140;

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
pristine.addValidator(hashtagsInputElement, normalizeAndCheckUniqueness, Error.INVALID_UNIQUE);
pristine.addValidator(descriptionInputElement, checkCommentLenght, Error.INVALID_COMMENT);

const toggleSubmitButton = (isDisabled) => {
  btnSubmitFormElement.disabled = isDisabled;
  btnSubmitFormElement.textContent = isDisabled
    ? SubmitButtonText.SUBMITING
    : SubmitButtonText.CONSTANT;
};

const onFormSubmit = (callback) => {
  formUploadElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(evt.target));
      toggleSubmitButton(false);
    }
  });
};

const isFocused = () => document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement;

const hasError = () => Boolean(bodyElement.querySelector('.error'));

function onEscKeyCloseForm(evt) {
  if (isEscapeKey(evt) && !isFocused() && !hasError()) {
    onCloseForm();
  }
}

const hideForm = () => {
  overlayFormElement.classList.add('hidden');
};

const showForm = () => {
  overlayFormElement.classList.remove('hidden');
};

function onCloseForm() {
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyCloseForm);
  formUploadElement.reset();
  pristine.reset();
  hideForm();
}

const onOpenForm = () => {
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyCloseForm);
  getOriginalEffect();
  showForm();
};

const onFileInputChange = () => {
  const file = inputFormElement.files[0];
  if (file) {
    const pictureSrc = URL.createObjectURL(file);
    previewImgElement.src = pictureSrc;
    previewEffectElements.forEach((element) => {
      element.style.backgroundImage = `url("${pictureSrc}")`;
    });
  }
  onOpenForm();
};

const openAndCloseForm = () => {
  inputFormElement.addEventListener('change', onFileInputChange);
  cancelFormElement.addEventListener('click', onCloseForm);
};

export { openAndCloseForm, onFormSubmit, onCloseForm };
