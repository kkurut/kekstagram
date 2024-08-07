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
    removeErrorMessage();
    document.removeEventListener('keydown', onEscapeKeydown);
  }
}

const windowTapRemove = (evt) => {
  if (errorUploadElement === (evt.target)) {
    errorUploadElement.remove();
    window.removeEventListener('click', windowTapRemove);
  }

  if (successUploadElement === (evt.target)) {
    successUploadElement.remove();
    window.removeEventListener('click', windowTapRemove);
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
  window.addEventListener('click', windowTapRemove);
};

const openErrorMessage = () => {
  bodyElement.append(errorUploadElement);
  closeErrorBtnElement.addEventListener('click', onMessageCloseClick);
  document.addEventListener('keydown', onEscapeKeydown);
  window.addEventListener('click', windowTapRemove);
};

const openErrorGallery = () => {
  bodyElement.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

export { openErrorMessage, openSuccessMessage, openErrorGallery };
