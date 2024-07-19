import { createPictures } from './data-generate';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createPictures(25);

// eslint-disable-next-line
console.log(similarPictures);

const similarListFragmtnt = document.createDocumentFragment();

similarPictures.forEach(({ id, url, description, likes }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').dataset.src = id;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarListFragmtnt.append(pictureElement);
});
pictureContainer.append(similarListFragmtnt);

export { similarPictures };
