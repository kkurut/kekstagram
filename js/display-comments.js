const socialCommentsElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const socialCommentElement = document.querySelector('.social__comment');

const NEXT_NUMBERS_QTY = 5;

let currentComments = [];
let startIndex = 0;

const createComment = ({ avatar, name, message }) => {
  const clonedSocialCommentElement = socialCommentElement.cloneNode(true);
  const socialPicture = clonedSocialCommentElement.querySelector('.social__picture');

  socialPicture.src = avatar;
  socialPicture.alt = name;
  clonedSocialCommentElement.querySelector('.social__text').textContent = message;
  return clonedSocialCommentElement;
};

const displayMoreComments = () => {
  const fragment = document.createDocumentFragment();
  const endIndex = Math.min(startIndex + NEXT_NUMBERS_QTY, currentComments.length);

  currentComments.slice(startIndex, endIndex).forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  socialCommentsElement.appendChild(fragment);
  startIndex += NEXT_NUMBERS_QTY;

  if (startIndex >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const displayComments = (comments) => {
  startIndex = 0;
  currentComments = comments;
  socialCommentsElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  displayMoreComments();
};

export { displayComments, displayMoreComments, commentsLoaderElement };
