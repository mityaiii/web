const api = 'https://jsonplaceholder.typicode.com/comments';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

$(document).ready(async function () {
  const sliderContainer = $('.comment__slider');
  const preloader = $('#preloader');
  const errorMessage = $('#error-message');

  const postFilter = `?postId=${getRandomInt(1, 100)}`;

  const hidePreloader = () => {
    preloader.addClass('none');
  }

  const showErrorMessage = (value) => {
    errorMessage.html(value);
  }

  const renderComments = (comments) => {
    comments.forEach(comment => {
      const commentDiv = $(`
        <div class="comment">
          <div class="comment__wrapper">
            <p class="comment__name">${comment.name}</p>
            <p class="comment__email"><strong>${comment.email}</strong></p>
            <p class="comment__body">${comment.body}</p>
          </div>
        </div>
      `);

      sliderContainer.append(commentDiv);
    });

    sliderContainer.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true, 
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  try {
    const response = await fetch(api + postFilter);
    if (!response.ok) {
      throw new Error('⚠ Что-то пошло не так');
    }
    const data = await response.json();
    hidePreloader();
    renderComments(data);
  } catch (error) {
    hidePreloader();
    showErrorMessage(error.message);
  }
});
