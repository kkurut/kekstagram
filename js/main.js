import { arrayPictures } from './data-generate.js';
import { similarPictures } from './render-thumbnail.js';
import { renderBigPicture } from './big-picture.js';
import './form.js'

similarPictures(arrayPictures);
renderBigPicture(arrayPictures);
