window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');

  if(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  } 
});

const themeBtnLite = document.querySelector('.js-change-theme-btn');
const galaxyThemeBtn = document.querySelector(".galaxy-theme-btn")


themeBtnLite.addEventListener('click', () => {
  themeBtnLite.classList.toggle('active');
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  
  

  if(currentTheme === 'dark') {
    themeBtnLite.innerText = 'Dark theme';
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  
  } else {
    themeBtnLite.innerText = 'Light theme';
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    
  }

});


galaxyThemeBtn.addEventListener('click', () => {
  galaxyThemeBtn.classList.toggle('active');
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');

if(currentTheme ==='galaxy') {
  themeBtnLite.innerText='Dark theme';
  root.setAttribute('data-theme', 'light')
} else {
  themeBtnLite.innerText='Dark theme';
  root.setAttribute('data-theme', 'galaxy');
  localStorage.setItem('theme', 'galaxy');
}
});

const changesNotif = document.querySelector('.js-changes-notif');
const changes = document.querySelector('.change');


function showNotification() {
 
changesNotif.classList.toggle('notif-on');
  setTimeout(function() {
    changesNotif.classList.toggle('notif-off');
  },3000);
} 


//font logic 
const setFontBtn = document.querySelector('.js-set-font-btn');

const font = document.querySelector('.js-font-selector');

let savedFont = localStorage.getItem('savedFont');

if(savedFont) {
  font.value = savedFont;
  document.body.style.fontFamily = savedFont;
}

setFontBtn.addEventListener('click', () => {
  
  const selectedFont = font.value.trim();
  
  localStorage.setItem('savedFont', selectedFont);
  
let renderFont = document.body.style.fontFamily = selectedFont;


  
  changes.innerText=`New font: ${selectedFont}`;
  
  showNotification();

});

