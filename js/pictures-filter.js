import { generateUniqueId } from './util';
import { similarPictures } from './render-thumbnail';
import { renderBigPicture } from './big-picture';
import { debounce } from './util';

const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersFormElement = document.querySelector('.img-filters__form');
const filters = {
  default: imgFiltersFormElement.querySelector('#filter-default'),
  random: imgFiltersFormElement.querySelector('#filter-random'),
  discussed: imgFiltersFormElement.querySelector('#filter-discussed')
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

const setActiveButton = (clickedButton) => {
  const activeButton = imgFiltersFormElement.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
};

const debouncedApplyFilter = debounce((filterType, pictures) => {
  applyFilter(filterType, pictures);
}, 500);

const onFilterButtonClick = (evt, pictures) => {
  const clickedButton = evt.target;
  const isButton = clickedButton.classList.contains('img-filters__button');

  if (isButton) {
    setActiveButton(clickedButton);
    const filterType = Object.keys(filters).find((key) => filters[key] === clickedButton);
    debouncedApplyFilter(filterType, pictures);
  }
};

const setupPictureFilters = (pictures) => {
  imgFiltersFormElement.addEventListener('click', (evt) => onFilterButtonClick(evt, pictures));
  imgFiltersElement.classList.remove('img-filters--inactive');
};

export { setupPictureFilters };
