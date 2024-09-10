const api = 'https://jsonplaceholder.typicode.com/comments';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

document.addEventListener('DOMContentLoaded', async () => {
  const commentsContainer = document.getElementById('comments-grid');
  const preloader = document.getElementById('preloader');
  const errorMessage = document.getElementById('error-message');

  const postFilter = `?postId=${getRandomInt(1, 100)}`;

  const hidePreloader = () => {
    preloader.classList.add('none');
  }

  const showErrorMessage = (value) => {
    errorMessage.innerHTML = value;
  }

  const renderComments = (comments) => {
    comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';

      const commentName = document.createElement('p');
      commentName.className = 'comment__name';
      commentName.textContent = comment.name;
      commentDiv.appendChild(commentName);

      const commentEmail = document.createElement('p');
      commentEmail.innerHTML = `<strong>${comment.email}</strong>`;
      commentEmail.className = 'comment__email';
      commentDiv.appendChild(commentEmail);

      const commentBody = document.createElement('p');
      commentBody.className = 'comment__body';
      commentBody.textContent = comment.body;
      commentDiv.appendChild(commentBody);

      commentsContainer.appendChild(commentDiv);
    });
  }

  await fetch(api + postFilter)
  .then((response) => {
    if (!response.ok) {
      throw new Error('⚠ Что-то пошло не так');
    }

    return response.json();
  })
  .then((data) => {
    hidePreloader();
    renderComments(data);
  })
  .catch((error) => {
    hidePreloader();
    showErrorMessage(error.message);
  });
});
