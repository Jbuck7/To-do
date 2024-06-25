const menuButton = document.querySelector('.main-menu-button');
const hiddenButtons = document.querySelectorAll('.menu-hidden-buttons .hidden-button');

menuButton.addEventListener('click', () => {
    hiddenButtons.forEach(button => {
        console.log(button);
        button.classList.toggle('visible'); // For example, toggle the 'visible' class
      });
});