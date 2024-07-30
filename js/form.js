import { isEscapeKey } from './util';

const bodyElement = document.querySelector('body');
const formUploadElement = bodyElement.querySelector('.img-upload__form');
const previewImgElement = formUploadElement.querySelector('.img-upload__preview img');
const inputFormElement = formUploadElement.querySelector('.img-upload__input');
const overlayFormElement = formUploadElement.querySelector('.img-upload__overlay');
const cancelFormElement = formUploadElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formUploadElement.querySelector('.text__hashtags');
const descriptionInputElement = formUploadElement.querySelector('.text__description');
const previewEffectElements = formUploadElement.querySelectorAll('.effects__preview');
const errorUploadTemplateElement = bodyElement.querySelector('#error').content.querySelector('.error');

const POST_URL = 'https://32.javascript.htmlacademy.pro/kekstagramm';

const HASHTAG_STROKE = /^(#[a-zа-яё0-9]{2,19})?$/i;
const Error = {
  INVALID_UNIQUE: 'хэштеги повторяются',
  INVALID_COUNT: 'превышено количество хэштегов',
  INCORECT_TAG: 'введён невалидный хэштег',
  INVALID_COMMENT: 'длина комментария больше 140 символов.'
};

const pristine = new Pristine(formUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getNormalizeStr = (str) => str.trim().split(/\s+/);

const checkValid = (words) => getNormalizeStr(words).every((word) => HASHTAG_STROKE.test(word));

const checkWordQnty = (words) => getNormalizeStr(words).length <= 5;

const checkCommentLenght = (str) => str.length <= 140;

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



const errorUploadElement = errorUploadTemplateElement.cloneNode(true);
const closeErrorBtnElement = errorUploadElement.querySelector('.error__button')
const kek = (evt) => {
  if (isEscapeKey(evt)) {
    errorUploadElement.remove()
    document.removeEventListener('keydown', kek)
  }
}

const openErrorMessage = () => {
  bodyElement.append(errorUploadElement);
  document.addEventListener('keydown', kek)
  closeErrorBtnElement.addEventListener('click', () => {
    errorUploadElement.remove()
  })
}

formUploadElement.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const formData = new FormData(evt.target);

  const isValid = pristine.validate();
  if (isValid) {
    fetch(POST_URL,
      {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      })
      .then((response) => {
        if (response.ok) {
          onCloseForm();
        } else {
          openErrorMessage()
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

const isFocused = () => document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement;

const hasMessage = () => bodyElement.contains(errorUploadElement);

function onEscKeyCloseForm(evt) {
  if (isEscapeKey(evt) && !isFocused() && !hasMessage()) {
    onCloseForm();
  }
};

const onOpenForm = () => {
  overlayFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyCloseForm);
};

function onCloseForm() {
  overlayFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyCloseForm);
  formUploadElement.reset();
  pristine.reset();
}

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

export { openAndCloseForm };
