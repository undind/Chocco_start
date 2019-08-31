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