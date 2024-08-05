import { openAndCloseForm, onFormSubmit, onCloseForm } from './form.js';
import { setupPictureFilters } from './pictures-filter.js';
import { openErrorMessage, openSuccessMessage, openErrorGallery } from './succes-error.js';
import { getEditImg } from './edit-picture.js'; import { getData, sendData } from './requests.js';
import { similarPictures } from './render-thumbnail.js';
import { renderBigPicture } from './big-picture.js';

openAndCloseForm();
getEditImg();

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    openSuccessMessage();
    onCloseForm();
  } catch {
    openErrorMessage();
  }
});

getData()
  .then((data) => {
    similarPictures(data);
    renderBigPicture(data);
    setupPictureFilters(data);
  })
  .catch(() => {
    openErrorGallery();
  });
