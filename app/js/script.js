// Гамбургер меню
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


// Слайдер ассортимент
slider();

function slider() { 
  const sliderLeftButton = document.querySelector('.assortment__control--left');
  const sliderRightButton = document.querySelector('.assortment__control--right');
  const slider = document.querySelector('#slider');
  const slides = document.querySelectorAll('.assortment__item');
  const slide = document.querySelector('.assortment__item');

  let minRight = 0;
  let currentRight = 0;

  slider.style.right = currentRight;

  function leftMove() {
    let step = slide.offsetWidth;
    let maxRight = (slides.length - 1) * step;
    if (currentRight > minRight) {
      currentRight -= step;
      slider.style.right = currentRight + 'px';
    } else {
      currentRight = maxRight;
      slider.style.right = maxRight + 'px';
    }
  }

  function rightMove() {
    let step = slide.offsetWidth;
    let maxRight = (slides.length - 1) * step;
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

};


// Поппап
popup();

function popup() { 
  const popupButton = document.querySelector('.assortment__popup-button');
  
  popupButton.addEventListener('click', e => {
    e.preventDefault();

    if (popupButton.classList.contains('active')) {
      popupButton.classList.remove('active');
    } else {
      popupButton.classList.add('active');
    }
    
  });
};


// Акардеон
accardeon();

function accardeon() { 
  const menuLink = document.querySelectorAll('.menu__link');
  
  for (let i = 0; i < menuLink.length; i++) {
    menuLink[i].addEventListener('click', e => {
      e.preventDefault();
      const menuItem = menuLink[i].parentNode;
      if (menuItem.classList.contains('menu__items--active')) {
        menuItem.classList.remove('menu__items--active');
      } else {
        hide();
        menuItem.classList.add('menu__items--active');
      }
    });
  }

  function hide() { 
    for (let i = 0; i < menuLink.length; i++) {
      const menuItem = menuLink[i].parentNode;
      menuItem.classList.remove('menu__items--active');
    }
  };
};

// Модальное окно
const template = document.querySelector('#overlayTemplate').innerHTML;
const overlay = createOverlay(template);

function createOverlay(template) { 
  let fragment = document.createElement('div');
  fragment.innerHTML = template;

  const overlayElement = fragment.querySelector('.overlay');
  const contentElement = fragment.querySelector('.overlay__content');
  const buttonElement = fragment.querySelector('.overlay__btn');

  fragment = null;

  overlayElement.addEventListener('click', e => {
    if (e.target === overlayElement) {
      buttonElement.click();
    }
  });

  buttonElement.addEventListener('click', e => {
    e.preventDefault();
    document.body.removeChild(overlayElement);
    document.body.classList.remove('body-fix');
  });

  return {
    open() {
      document.body.appendChild(overlayElement);
      document.body.classList.add('body-fix');
    },
    close() {
      buttonElement.click();
    },
    setContent(content) {
      contentElement.innerHTML = content;
    }
  }
};

// Обработка формы
const myForm = document.querySelector('#myForm');
let sendFormButton = document.querySelector('#sendForm');

sendFormButton.addEventListener('click', e => {
  e.preventDefault();

  let formData = new FormData();

  formData.append('name', myForm.elements.name.value);
  formData.append('phone', myForm.elements.phone.value);
  formData.append('comment', myForm.elements.comment.value);
  formData.append('to', 'to@mail.com');

  const xhr = new XMLHttpRequest();

  xhr.responseType = 'json';
  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(formData);

  xhr.addEventListener('load', function() {
    if (xhr.status >= 400) {
      overlay.open();
      overlay.setContent('Что-то пошло не так!');
    } else {
      overlay.open();
      overlay.setContent('Сообщение отправлено');
    }
  });
});