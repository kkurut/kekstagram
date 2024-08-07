import { openAndCloseForm, onFormSubmit, onFormCloseClick } from './form.js';
import { setupPictureFilters } from './pictures-filter.js';
import { openErrorMessage, openSuccessMessage, openErrorGallery } from './succes-error.js';
import { getEditImg } from './edit-picture.js'; import { getData, sendData } from './requests.js';
import { displayPictures } from './render-thumbnail.js';
import { renderBigPicture } from './big-picture.js';

openAndCloseForm();
getEditImg();

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    openSuccessMessage();
    onFormCloseClick();
  } catch {
    openErrorMessage();
  }
});

getData()
  .then((data) => {
    displayPictures(data);
    renderBigPicture(data);
    setupPictureFilters(data);
  })
  .catch(() => {
    openErrorGallery();
  });
