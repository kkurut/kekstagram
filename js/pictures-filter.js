import { generateUniqueId } from "./util";
import { similarPictures } from "./render-thumbnail";
import { renderBigPicture } from './big-picture';

const imgFiltersForm = document.querySelector('.img-filters__form');
const defaultFilter = imgFiltersForm.querySelector('#filter-default');
const randomFilter = imgFiltersForm.querySelector('#filter-random');
const discussedFilter = imgFiltersForm.querySelector('#filter-discussed');

const MAX_RANDOM_PICTURES = 10;
const picturesContainer = document.querySelector('.pictures');

const getRandomPictures = (pictures) => {
  const randomPictures = [];
  const usedIds = new Set();

  while (randomPictures.length < MAX_RANDOM_PICTURES) {
    const randomIndex = generateUniqueId(usedIds, 0, pictures.length - 1);
    randomPictures.push(pictures[randomIndex]);
  }

  return randomPictures;
};

const clearPictures = () => {
  const picturesArray = picturesContainer.querySelectorAll('.picture');
  picturesArray.forEach((pic) => pic.remove());
};

const togglePictureFilters = (pictures) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const isButton = evt.target.classList.contains('img-filters__button');

    if (isButton) {
      const activeButton = imgFiltersForm.querySelector('.img-filters__button--active');
      if (activeButton) {
        activeButton.classList.remove('img-filters__button--active');
      }
      evt.target.classList.add('img-filters__button--active');

      clearPictures();

      let filteredPictures;

      if (evt.target === randomFilter) {
        filteredPictures = getRandomPictures(pictures);
      } else if (evt.target === defaultFilter) {
        filteredPictures = pictures;
      } else if (evt.target === discussedFilter) {
        filteredPictures = [...pictures].sort((a, b) => b.comments.length - a.comments.length);
      }

      similarPictures(filteredPictures);
      renderBigPicture(filteredPictures); // Update the big picture view with the filtered pictures
    }
  });
};

export { togglePictureFilters };
