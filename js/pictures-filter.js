import { generateUniqueId } from './util';
import { similarPictures } from './render-thumbnail';
import { renderBigPicture } from './big-picture';
import { debounce } from './util';

const imgFiltersForm = document.querySelector('.img-filters__form');
const filters = {
  default: imgFiltersForm.querySelector('#filter-default'),
  random: imgFiltersForm.querySelector('#filter-random'),
  discussed: imgFiltersForm.querySelector('#filter-discussed')
};

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
  picturesContainer.querySelectorAll('.picture').forEach((pic) => pic.remove());
};

const applyFilter = (filterType, pictures) => {
  clearPictures();

  let filteredPictures;
  switch (filterType) {
    case 'random':
      filteredPictures = getRandomPictures(pictures);
      break;
    case 'discussed':
      filteredPictures = [...pictures].sort((a, b) => b.comments.length - a.comments.length);
      break;
    case 'default':
    default:
      filteredPictures = pictures;
      break;
  }

  similarPictures(filteredPictures);
  renderBigPicture(filteredPictures);
};

const onFilterButtonClick = (evt, pictures) => {
  const clickedButton = evt.target;
  const isButton = clickedButton.classList.contains('img-filters__button');

  if (isButton) {
    const activeButton = imgFiltersForm.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }
    clickedButton.classList.add('img-filters__button--active');

    const filterType = Object.keys(filters).find((key) => filters[key] === clickedButton);
    applyFilter(filterType, pictures);
  }
};

const debouncedOnFilterButtonClick = debounce(onFilterButtonClick, 500);

const setupPictureFilters = (pictures) => {
  imgFiltersForm.addEventListener('click', (evt) => debouncedOnFilterButtonClick(evt, pictures));
};

export { setupPictureFilters };
