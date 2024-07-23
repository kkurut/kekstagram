const socialCommentsElement = document.querySelector('.social__comments');

//* создание коментария
const createComment = ({ avatar, name, message }) => {
  const socialCommentElement = document.querySelector('.social__comment').cloneNode(true);
  const socialPicture = socialCommentElement.querySelector('.social__picture');

  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

//* создание списка коментариев текущей мииатюры
const displayComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.appendChild(commentElement);
  });

  socialCommentsElement.innerHTML = '';
  socialCommentsElement.appendChild(fragment);
};

export { displayComments }
