import { arrayPictures } from './data-generate.js';
import { similarPictures } from './render-thumbnail.js';
import { renderBigPicture } from './big-picture.js';
import { openAndCloseForm } from './form.js';

similarPictures(arrayPictures);
renderBigPicture(arrayPictures);
openAndCloseForm();
import './edit-picture.js'

const foo = () => {
  let str = '1kddkfklkf';
  return parseInt(str, 10) / 10
}

console.log(foo());
