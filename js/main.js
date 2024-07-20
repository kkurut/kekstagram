import { createPictures } from './data-generate';
import { similarPictures } from './render-thumbnail';
import './big-picture.js'
similarPictures(createPictures(25));
