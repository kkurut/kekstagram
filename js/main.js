import { arrayPictures } from './data-generate.js';
import { similarPictures } from './render-thumbnail.js';
import { renderBigPicture } from './big-picture.js';
import { openAndCloseForm } from './form.js';
import { getEditImg } from './edit-picture.js';

similarPictures(arrayPictures);
renderBigPicture(arrayPictures);
openAndCloseForm();
getEditImg();
