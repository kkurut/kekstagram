import {promise } from './get-data.js';
import { similarPictures } from './render-thumbnail.js';
import { renderBigPicture } from './big-picture.js';
import { openAndCloseForm } from './form.js';
import { getEditImg } from './edit-picture.js';

promise.then((data) => {
  similarPictures(data);
  renderBigPicture(data);
  openAndCloseForm();
  getEditImg();
});
