const hamburgerMenu = document.querySelector('#hamburgerMenu');
const hamburgerButton = document.querySelector('#hamburgerButton');

function showMenu() {
  hamburgerMenu.classList.add('active');
  hamburgerButton.classList.add('is-active');
  document.body.classList.add('body-fix');
};

function hideMenu() {
  hamburgerMenu.classList.remove('active');
  hamburgerButton.classList.remove('is-active');
  document.body.classList.remove('body-fix');
};

function timeOut() {
  hamburgerMenu.classList.add('fadeOut');
  setTimeout(() => {
    hideMenu();
    hamburgerMenu.classList.remove('fadeOut');
  }, 400);
};

hamburgerButton.addEventListener('click', function (e) { 
  e.preventDefault();

  if (hamburgerButton.classList.contains('is-active')) {
    timeOut();
  } else {
    showMenu();
  }
 });

 hamburgerMenu.addEventListener('click', function (e) { 
   e.preventDefault();

   if (e.target.classList.contains('nav__link')) {
    hideMenu();
   }
  });

  slider();

  function slider() { 
    const sliderLeftButton = document.querySelector('.assortment__control--left');
    const sliderRightButton = document.querySelector('.assortment__control--right');
    const slider = document.querySelector('#slider');
    const slides = document.querySelectorAll('.assortment__item');
    const slide = document.querySelector('.assortment__item');

    let minRight = 0;
    let step = slide.offsetWidth;
    let maxRight = (slides.length - 1) * step;
    let currentRight = 0;

    slider.style.right = currentRight;

    function leftMove() {
      if (currentRight > minRight) {
        currentRight -= step;
        slider.style.right = currentRight + 'px';
      } else {
        currentRight = maxRight;
        slider.style.right = maxRight + 'px';
      }
    }

    function rightMove() {
      if (currentRight < maxRight) {
        currentRight += step;
        slider.style.right = currentRight + 'px';
      } else {
        currentRight = minRight;
        slider.style.right = minRight + 'px';
      }
    }

    sliderLeftButton.addEventListener('click', e => {
      e.preventDefault();
      leftMove();
    });

    sliderRightButton.addEventListener('click', e => {
      e.preventDefault();
      rightMove();
    });

   }