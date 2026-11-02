window.addEventListener('load', async e => {
  if('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('sw.js');
      console.log('service Worker registered')
    } catch (error) {
      console.log('serviceWorker failed to register')
    }
  }
});



window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');

  if(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }
});

window.addEventListener('DOMContentLoaded', () => {
    const savedFont = localStorage.getItem('savedFont');

    if(savedFont) {
      document.body.style.fontFamily= savedFont;
    }
  });



const closeBtn = document.querySelector('.js-close-menu-btn');

const menu = document.querySelector('.js-hidden-menu');

const hamburger = document.querySelector('.js-hamburger');


 const mainBooks = [{
  id: 'book-1',
  cover: '0013805873-M.jpg',
  title: 'Alices adventures in wonderland',
  price: 'Free',
  author: 'Lewis Carroll',
  isAvailableToRead: true,
  readLink: 'Reading.html?id=book-1',
  genres: ['Fantasy', 'Kids'],
  plot: 'A young girl named Alice who falls down a rabbit hole into a surreal, logic-defying dream world',
  age: 'Family',
  size: '1.4MB',
  category: 'Kids',
},{
  id: 'book-2',
  cover: 'Frankenstein.png',
  title: 'Frankenstein',
  price: 'Free',
  author: 'Mary Shelley',
  isAvailableToRead: true,
  readLink: 'Reading.html?id=book-2',
  genres: ['Fantasy', 'Adventure'],
  plot: 'Victor Frankenstein, a young scientist, builds a sapient creature out of dead body parts and rejects it out of horror, starting a tragic cycle of revenge.',
  age: '15+',
  size: '1MB',
  category: 'Fantasy'
},{
  id: 'book-3',
  cover: 'Dracula.png',
  title: 'Dracula',
  price: 'Free',
  author: 'Bram Stoker',
  isAvailableToRead: true,
  readLink: 'Reading.html?id=book-3',
  genres: ['Horror', 'Action'],
  plot: 'English solicitor Jonathan Harker visits the Transylvanian castle of Count Dracula, who then moves to England to terrorize Whitby and London. A group led by Professor Abraham Van Helsing hunts and destroys him.',
  age: '13+',
  size: '2MB',
  category: 'Fantasy',
},{
  id: 'book-4',
  cover: '0008884619-M.jpg',
  title: 'The Wonderful Wizard of Oz',
  price: 'Free',
  author: 'Frank Baum',
  isAvailableToRead: true,
  readLink: 'Reading.html?id=book-4',
  genres: ['Kids','Fantasy'],
  plot: 'Dorothy Gale, a young girl living on a dreary Kansas farm, is swept away alongside her dog Toto by a powerful cyclone. They land in the magical country of Oz, where Dorothys farmhouse accidentally crushes and kills the Wicked Witch of the East. To find a way back home to her family, Dorothy is gifted the witchs magical Silver Shoes and instructed to follow the Yellow Brick Road to the Emerald City to seek the aid of the Great Wizard.',
  age: 'Family',
  size: '12kb',
  category: 'Kids'
},{
   id: 'book-5',
   cover: 'AILD.png',
   title: 'As I lay Dying',
   price: 'Free',
   author: '',
   isAvailableToRead: true,
   readLink: 'Reading.html?id=book-5',
   genres: ['Drama','Romance'],
   plot: '',
   age: '16',
   size: '',
   category: 'Romance'
},{
   id: 'book-6',
   cover: 'Pride_and_prejudice.png',
   title: 'Pride and Prejudice',
   price: 'Free',
   author: '',
   isAvailableToRead: true,
   readLink: 'Reading.html?id=book-6',
   genres: ['Drama','Romance'],
   plot: '',
   age: '16',
   size: '',
   category: 'Romance'
},{
   id: 'book-7',
   cover: 'Triplanitary.png',
   title: 'Triplanitary',
   price: 'Free',
   author: '',
   isAvailableToRead: true,
   readLink: 'Reading.html?id=book-7',
   genres: ['Space Opera','Sci-fi'],
   plot: '',
   age: '16',
   size: '',
   category: 'Science Fiction'
},{
   id: 'book-8',
   cover: '0012512392-L.jpg',
   title: 'Planet of the Damned',
   price: 'Free',
   author: '',
   isAvailableToRead: true,
   readLink: 'Reading.html?id=book-8',
   genres: ['Space Opera','Sci-fi'],
   plot: '',
   age: '16',
   size: '',
   category: 'Science Fiction'
}];



const booksByCategory = {};

mainBooks.forEach(book => {
  if (!booksByCategory[book.category]) {
    booksByCategory[book.category] = [];
  }
  booksByCategory[book.category].push(book);
});


let bookHtml = '';

for (const category in booksByCategory) {

  bookHtml += `<h2 class="heading heading-container">
        ${category}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-right-icon lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </h2>`;
  
  
  bookHtml += `<div class="category-row">`;
  
  booksByCategory[category].forEach(book => {
    bookHtml += `
      <div class="full-book-card">
        <div class="book-card js-book-card" data-id="${book.id}" data-cover="${book.cover}" data-book-id="${book.id}" data-category="${book.category}">
          <img src="covers/${book.cover}" class="book-cover" alt="${book.cover}">
        </div>
      </div>
    `;
  });
  
  bookHtml += `</div>`;
}

document.querySelector('.js-render-books').innerHTML = bookHtml;



hamburger.addEventListener('click', ()=> {
  menu.classList.toggle('open');
});


closeBtn.addEventListener('click', ()=> {
  menu.classList.remove('open');
});

// --SEARCH FEATURE-- //

const searchInput = document.querySelector('.js-search-input');

const searchBtn = document.querySelector('.js-search-btn');

const searchCenter = document.querySelector('.search-results-center');

let searchResults = document.querySelector('.js-search-results');

// --SEARCH LOGIC-- //

searchInput.addEventListener('input', () => {
  let searchText = searchInput.value.trim().toLowerCase();
  
  if(searchText !== "") {
    searchCenter.style.display="flex";
  } 

  let searchHtml = '';

  mainBooks.forEach(book => {

    if(book.title.trim().toLowerCase().includes(searchText)) {
      searchHtml += ` 
    <a href="${book.readLink}" class="search-result-link">
      <div class="search-result">
        <div class="search-result-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          <div>
          <p>
          ${book.title}
          </p>
          <p class="author-name-search">
          ${book.author}
          </p>
          </div>
          
        </div>

        <img src="covers/${book.cover}" class="search-result-img">
      </div>
      </a>
    `;
    }

else  if(book.author.trim().toLowerCase().includes(searchText)) {
  document.querySelector('.js-searching-for-text').innerHTML = `<p>Searching for ${searchText}...</p>`
      searchHtml += `
      <a href="#" class="search-result-link">
      <div class="search-result">
        <div class="search-result-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          <div>
          <p>
          ${book.title}
          </p>
          <p class="author-name-search">
          ${book.author}
          </p>
        </div>
        </div>

        <img src="covers/${book.cover}" class="search-result-img">
      </div>
      </a>
      `;
    }
  });

  if(searchHtml !== "") {
    searchResults.innerHTML = searchHtml;
  } 
  else {
    searchResults.innerHTML = `<p>
    No results for <strong>'${searchText}'</strong>
    </p>
    <a href="#" style="color: var(--blue); text-decoration: underline;">
    Check Troubleshooting guide
    </a> `
  }

   if(searchText === "") {
    searchResults.innerHTML = `
    <button class="close-search-btn js-close-search">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    
    <a href="#">Search for more</a>`;

     const closeSearchBtn = document.querySelector('.js-close-search');

closeSearchBtn.addEventListener('click', () => {
  searchCenter.style.display="none";
});
     
  }

  const searchHistory = localStorage.setItem('searchHistory', searchText);
  
});

searchInput.addEventListener( 'keydown' ,(event) => {
  if(event.key === 'Enter') {
    searchBtn.click();
  }
});


const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

document.getElementById('mic-btn').onclick = () => recognition.start();

recognition.onresult = (event) => {
  document.getElementById('js-search-input').value = event.results[0][0].transcript;
};


const filterPopularityBtn = document.querySelector('.js-filter-popularity');

const filterFormatBtn = document.querySelector('.js-filter-format');
const main = document.querySelector('.main-element');

const booksContainer = document.querySelector('.js-books-container');





const savedBookData = localStorage.getItem('bookDataObject');

const recentBooks = savedBookData ? JSON.parse(savedBookData) : [];


let recentBookHtml = '';
recentBooks.forEach((recentBook) => {
  recentBookHtml += `
  <div class="js-book">
          <img src="covers/${recentBook.cover}" class="recent-book-cover" data-id="${recentBook.id}">
        </div>
  `;
});

document.querySelector('.js-recent-books').innerHTML = recentBookHtml;


const continueReadingHeading = document.querySelector('.reading-heading');
const rcntContainer = document.querySelector('.recent-scroll');

if(recentBooks.length === 0) {
  continueReadingHeading.style.display="none";
rcntContainer.style.display="none";
} else {
  continueReadingHeading.style.display="block";
rcntContainer.style.display="flex";
}
booksContainer.innerHTML = bookHtml;


let hiddenBMenuHtml = '';

mainBooks.forEach((book) => {
  let actionButtonHtml = '';

  if(book.isAvailableToRead) {
    actionButtonHtml = `
  
    <button class="readBtn js-read-button" onclick="window.open('${book.readLink}', '_blank')">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"></path>
</svg>   Read
    </button>
  
    `;
    
  } else {
    actionButtonHtml = `
    <button class="buyBtn" onclick="window.open('${book.googlePlayLink}', '_blank')">
      <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" stroke-width="2" viewBox="0 0 32 32"><path d="M27 25.15 25.28 10.5a2.93 2.93 0 0 0-3-2.5h-1.35c0-.19 0-.38-.06-.57-.22-1.54-.41-2.87-1.59-4a4.51 4.51 0 0 0-6.56 0c-1.18 1.14-1.37 2.47-1.59 4 0 .19 0 .38-.06.57H9.69a2.93 2.93 0 0 0-3 2.5L5 25.15a4.13 4.13 0 0 0 1 3.26A4.87 4.87 0 0 0 9.72 30h12.56a4.87 4.87 0 0 0 3.64-1.59A4.13 4.13 0 0 0 27 25.15zM13.11 7.71c.22-1.52.34-2.21 1-2.85A2.78 2.78 0 0 1 16 4a2.78 2.78 0 0 1 1.89.86c.66.64.78 1.33 1 2.85V8h-5.8c.01-.1.01-.19.02-.29zm11.31 19.37a2.83 2.83 0 0 1-2.14.92H9.72a2.83 2.83 0 0 1-2.14-.92 2.14 2.14 0 0 1-.58-1.7l1.7-14.65a.94.94 0 0 1 1-.73H11c0 .38.05.76.1 1.14a1 1 0 1 0 2-.28c0-.29 0-.57-.06-.86H19c0 .29 0 .57-.06.86a1 1 0 0 0 .8 1.14h.14a1 1 0 0 0 1-.86c.05-.38.08-.76.1-1.14h1.34a.94.94 0 0 1 1 .73L25 25.38a2.14 2.14 0 0 1-.58 1.7z" style="fill: white;" data-name="shopping bag" class="shopping-bag"></path></svg>
    Buy on Google play 
    </button>
    `;
  }

  const genreTags = book.genres.map(genre => `<div class="genre-label">${genre}</div>`).join('');

  
  hiddenBMenuHtml += `
  <div class="js-book-panel" data-book-id="${book.id}" style="display: none;">
    
    <div class="hidden-line-center">
    <div class="book-menu-hidden-line"></div>
    </div>
<div class="top-book-info">


    <button class="closeBtn js-close-btn">
    Cancel 
  </button>
  <div class="hidden-menu-book-cover-container">
    <img src="covers/${book.cover}" class="hidden-menu-book-cover" alt="book cover">
  </div>

  <h3>
    ${book.title}
  </h3>

  <p class="hidden-menu-book-author">
    ${book.author}
  </p>
</div>

  <div class="book-details">
    <p>
      ${book.age}
    </p>
    <div class="border"></div>
    <p class="hidden-book-price">
      ${book.price}
    </p>

    <div class="border"></div>
    <p>
      ${book.size}
    </p>
  </div>

  <div class="hidden-menu-book-btns">
    ${actionButtonHtml}
    
    <button class="add-to-wishlist-btn js-add-to-wishlist-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  stroke="currentColor" stroke-width="2"  fill="none" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart wishlist-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
      Add to Wishlist 
    </button>
    
  </div>


  <div class="genre-labels">
    ${genreTags}
  </div>


  <p class="plot">
  ${book.plot}
  </p>
  </div>
  `;

  
});


document.querySelector('.js-hidden-book-info').innerHTML = hiddenBMenuHtml;


const hiddenBookMenu = document.querySelector('.js-hidden-book-info');



const bookCards = document.querySelectorAll('.js-book-card');

bookCards.forEach((card) => {
  card.addEventListener('click', () => {
    const targetBookId = card.dataset.bookId;

    document.querySelectorAll('.js-book-panel').forEach(panel => panel.style.display="none");

    const targetPanel = hiddenBookMenu.querySelector(`.js-book-panel[data-book-id="${targetBookId}"]`);

    if(targetPanel) {
      targetPanel.style.display="block";
      hiddenBookMenu.classList.add('book-info-on');
    }
  });

  
});

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('js-close-btn')) {
    hiddenBookMenu.classList.remove('book-info-on');
  }
});


const readBtns = document.querySelectorAll('.js-read-button');

readBtns.forEach((readBtn) => {
  readBtn.addEventListener('click', (e) => {
    const panel = e.target.closest('.js-book-panel');
    if (!panel) return;

    const bookId = panel.dataset.bookId;
    const book = mainBooks.find(b => b.id === bookId);
    if (!book) return;

    const recentBooksList = JSON.parse(localStorage.getItem('bookDataObject')) || [];


    const filtered = recentBooksList.filter(b => b.id !== book.id);
    filtered.unshift({
      id: book.id,
      title: book.title,
      cover: book.cover
    });

    localStorage.setItem('bookDataObject', JSON.stringify(filtered));
  });
});




const wishlistBtns = document.querySelectorAll('.js-add-to-wishlist-btn');

wishlistBtns.forEach(btn => {

  
  btn.addEventListener('click', (e)=> {
    
  const panel = e.target.closest('.js-book-panel');
    if(!panel) return;

    const bookId = panel.dataset.bookId;
    const book = mainBooks.find(b => b.id === bookId);

    if(!book) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist'))  || [];


    const isAlreadyInWishlist = wishlist.filter(b => b.id === book.id); 

    if(isAlreadyInWishlist) {
      wishlist.unshift({
      id: book.id,
      title: book.title,
      cover: book.cover,
      author: book.author,
    });

  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  
    }

    

    const heart = document.querySelectorAll('.wishlist-heart');
    
    heart.forEach(heart => {
      if(isAlreadyInWishlist) {
      heart.style="fill: red; color: red";
    } else {
      heart.style="fill: none; color: currentColor;"
      }
      
  });


    
  });
});


 document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const gridCards = document.querySelectorAll(".book-card");
const mainContainer = document.querySelector(".main-element");
   
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      
      filterButtons.forEach(btn => btn.classList.remove("filter-on"));
      button.classList.add("filter-on");

    
      const selection = button.getAttribute("data-filter");

      
      gridCards.forEach(card => {
        const itemCategory = card.getAttribute("data-category");

        if (selection === "all" || itemCategory === selection) {
          card.style.display = "block"; 
      mainContainer.appendChild(card);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});



let lastScrollY = window.scrollY;
let ticking = false;

const header = document.querySelector('header');
const navigationBar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if(!ticking) {
    window.requestAnimationFrame(() => {
    if(window.scrollY > lastScrollY && window.scrollY > 50 ) {
      header.style.transform="translateY(-100%)";
      navigationBar.style.transform="translateY(100%)"
    } else {
      header.style.transform="translateY(0)";
      navigationBar.style.transform="translateY(-1)"
    }
      lastScrollY = window.scrollY;
      ticking = false;
    });
    ticking = true;
  }
});

