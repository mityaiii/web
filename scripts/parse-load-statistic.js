(function() {
  window.addEventListener('load', function() {
      var loadTime = performance.now();
      const statsContainer = document.querySelector('.footer__stats');

      statsContainer.innerHTML = `
Время полной загрузки страницы: ${loadTime.toFixed(2)} мс
      `;
  });

  window.addEventListener('DOMContentLoaded', function() {
      var domContentLoadedTime = performance.now();

      console.log('DOMContentLoaded сработал через: ' + domContentLoadedTime.toFixed(2) + ' мс');
  });
})();
