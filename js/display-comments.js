const NEXT_NUMBERS_QTY = 5;

const socialCommentsElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const socialCommentElement = document.querySelector('.social__comment');
const сommentShownCountElement = document.querySelector('.social__comment-shown-count');
const сommentTotalCountElement = document.querySelector('.social__comment-total-count');

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

const onCommentsLoaderClick = () => {
  const endIndex = Math.min(startIndex + NEXT_NUMBERS_QTY, currentComments.length);
  сommentShownCountElement.textContent = endIndex;

  currentComments.slice(startIndex, endIndex).forEach((comment) => {
    const commentElement = createComment(comment);
    socialCommentsElement.appendChild(commentElement);
  });

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
  сommentTotalCountElement.textContent = comments.length;
  onCommentsLoaderClick();

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

export { displayComments };
