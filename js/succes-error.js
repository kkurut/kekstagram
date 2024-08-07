import { isEscapeKey } from './util';

const bodyElement = document.querySelector('body');
const errorUploadTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successUploadTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');
const errorElement = errorTemplateElement.cloneNode(true);
const errorUploadElement = errorUploadTemplateElement.cloneNode(true);
const closeErrorBtnElement = errorUploadElement.querySelector('.error__button');

const successUploadElement = successUploadTemplateElement.cloneNode(true);
const closeSuccesBtnElement = successUploadElement.querySelector('.success__button');

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    onMessageCloseClick();
    document.removeEventListener('keydown', onEscapeKeydown);
  }
}

const onWindowClick = (evt) => {
  if (errorUploadElement === (evt.target)) {
    errorUploadElement.remove();
    window.removeEventListener('click', onWindowClick);
  }

  if (successUploadElement === (evt.target)) {
    successUploadElement.remove();
    window.removeEventListener('click', onWindowClick);
  }
};

function onMessageCloseClick() {
  errorUploadElement.remove();
  successUploadElement.remove();

  document.removeEventListener('keydown', onEscapeKeydown);
}

const openSuccessMessage = () => {
  bodyElement.append(successUploadElement);
  closeSuccesBtnElement.addEventListener('click', onMessageCloseClick);
  document.addEventListener('keydown', onEscapeKeydown);
  window.addEventListener('click', onWindowClick);
};

const openErrorMessage = () => {
  bodyElement.append(errorUploadElement);
  closeErrorBtnElement.addEventListener('click', onMessageCloseClick);
  document.addEventListener('keydown', onEscapeKeydown);
  window.addEventListener('click', onWindowClick);
};

const openErrorGallery = () => {
  bodyElement.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

export { openErrorMessage, openSuccessMessage, openErrorGallery };
