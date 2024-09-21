
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav__link');
  links.forEach(link => {
    link.href === document.location.href
      ? link.classList.add('active')
      : link.classList.remove('active');
  });
});