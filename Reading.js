import {
  abookContent
} from './content.js';

import {
  mainBooks
} from './Books.js';

console.log(mainBooks);

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



const gemini_API = 'Key_goes_here';
const simplifyBtn = document.querySelector('.simplifyBtn');
const finalSimp = document.querySelector('.simplifyAIBtn');
const ageLevel = document.querySelector('.age');
const selct = document.querySelector('.hidden-select');
const showTBar = document.querySelector('.show-translate-bar');
const tbar = document.querySelector('.js-translate-bar');
showTBar.addEventListener('click', () => {
  showTBar.classList.toggle('on-blue');
  tbar.classList.toggle('translate-bar-up');
});


const languages = [{
  name: 'Afrikaanse',
  region: 'South Africa'
},{
  name: 'English',
  region: 'England'
},{
  name: 'French',
  region: 'France'
}];



simplifyBtn.addEventListener('click', () => {
  simplifyBtn.classList.toggle('on-blue');
  selct.classList.toggle('open-select');
  
});

const aiToolsBtn = document.querySelector('.js-ai-tools-btn');
const aiToolsMenu = document.querySelector('.js-ai-tools-menu');
const infoBtn = document.querySelector('.js-info-btn');
const hiddenInfo = document.querySelector('.js-hidden-info');
const noteInput = document.querySelector('.js-note-input');
const addNoteBtn = document.querySelector('.js-add-note-btn');
const removeBtn = document.querySelector('.js-remove-btn');
const showKeyTableBtn = document.querySelector('.js-add-key-btn');
const keyTable = document.querySelector('.js-key-table');

aiToolsBtn.addEventListener('click', () => {
  aiToolsBtn.classList.toggle('btn-active');
  aiToolsMenu.classList.toggle('menu-open');
});

infoBtn.addEventListener('click', () => {
  infoBtn.classList.toggle('btn-active');
   hiddenInfo.classList.toggle('visible');
});

const nextPgBtn = document.querySelector('.js-next-pg-btn');
const content = document.querySelector('.page-content');

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');
const currentBook = mainBooks.find(book => book.id === bookId);


let sourceText = "";

if(currentBook && currentBook.isAvailableToRead && currentBook.content) {
  document.getElementById('book-title').textContent = currentBook.title;

abookContent.forEach(book => {
 document.getElementById('outPut').innerText = book.pageOne;
  
});

 sourceText = abookContent.find(book => book.pageOne);

sourceText = sourceText.pageOne;

console.log(sourceText);

}


let noteList = [{
  note: "secret holes in the hills",
  date: "26 July, 5 minutes ago"
},{
  note: "It was red, puffy, shiny and swollen. Like some obscene overripe fruit from Jamaica, her eye bulged in its socket, useless, sealed shut, and glinting with a hint of pus.",
  date: "26 July, 4 minutes ago"
}];

function saveToStorage() {
  let noteListSaved = JSON.stringify(noteList);
  
  localStorage.setItem('noteList', noteListSaved);
}

saveToStorage();



addNoteBtn.addEventListener('click', () => {
  let note = noteInput.value;

  noteList.push({
    note
  });

  updateNoteHTML();
  let noteListSaved = JSON.stringify(noteList);
  
  localStorage.setItem('noteList', noteListSaved);
});



function updateNoteHTML() {
  let notesHTML = '';
  let notes = JSON.parse(localStorage.getItem('noteList'));
  
notes.forEach(note => {
  notesHTML += `
<div class="fullNote">
<div class="note-set">
            <p class="note-text">
            
              ${note.note}
            
          </p>
          
          <button class="js-remove-btn remove-btn">
          Remove
          </button>
            </div>
            <p class="date">
          ${note.date}
          </p></div>
  `;

  
  document.querySelector('.js-notes').innerHTML = notesHTML;
  
});

  
}

updateNoteHTML();



showKeyTableBtn.addEventListener('click', () => {
  showKeyTableBtn.classList.toggle('on-blue');
  keyTable.classList.toggle('active');
});


/*FIX HERE*/
async function getBooks() {

  try {
   const booksResponse = await fetch('https://gutendex.com/books/');

   const bookData = await booksResponse.json();

  const  textUrl = bookData.results[0].formats["text/plain; charset=utf-8"];

    const urlResponse = await  fetch(textUrl);

    const realText = await urlResponse.text();
    
    console.log(realText);
    

    document.querySelector('.js-page-html').innerHTML = realText;
    
  } catch (error) {
    console.log(error);
  }
}



getBooks();


finalSimp.addEventListener('click', async () => {
  const age = ageLevel.value;
  console.log(age);

  
const promptSimplify = `Simplify this text so a ${age}-year-old can understand it. Keep the exact meaning of every sentence, but change how it is phrased so it is simple. Do not lose any details.

CRITICAL INSTRUCTION: Output ONLY the final simplified text. Do not include any introductory text, polite greetings, or conversational filler like "Here is the simplified text:". Start directly with the story. Text to simplify:"${sourceText}"`;

  try {
  
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${gemini_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: promptSimplify }]
        }]
      })
      
    });

    const api = await response.json();
  
  console.log("Full API Response:", api);
  
    const simplifiedText = api.candidates[0].content.parts[0].text;
    console.log(simplifiedText);
    document.getElementById('outPut').innerText = simplifiedText;

  } catch (error) {
    console.log('Sorry, an error occurred: ' + error);
  }
  
});


let LanguageHTML = '';
languages.forEach((language) => {
  LanguageHTML += `
    <div class="language-row">
    <p>
      ${language.name} 
    </p>

    <button class="js-translate-btn translate-btn" value="${language.name}">
      Translate
    </button>
  </div>
  `;

  document.querySelector('.js-languages').innerHTML = LanguageHTML;

});

const translateBtns = document.querySelectorAll('.js-translate-btn');

translateBtns.forEach(btn => {
  
btn.addEventListener('click', async () => {
    
    let selectedLanguage = btn.value;
    console.log(selectedLanguage);
  console.log(sourceText);
    
    let languagePrompt = `You are a professional translator. Translate the text provided below into ${selectedLanguage}. 

CRITICAL INSTRUCTION: Output ONLY the direct translation. Do not include any introductory remarks, explanations, greeting notes, or conversational filler. Start directly with the translated text.

Text to translate:
"""
${sourceText}
"""`;
  

  //Translation Logic here

try {
  
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${gemini_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: languagePrompt }]
        }]
      })
    });

    const api = await response.json();
  
  console.log("Full API Response:", api);
  
    const translatedText = api.candidates[0].content.parts[0].text;
    
    document.getElementById('outPut').innerText = translatedText;

  } catch (error) {
    console.log('Sorry, an error occurred: ' + error);
}
  
    
  });
  
});


const pageSumBtn = document.querySelector('.summerize-page');

pageSumBtn.addEventListener('click', async  ()=> {
  
  const summarizePrompt = `summerize this text: ${sourceText}. ONLY give the results, dont waste time on anything else.`;

  try {
  
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${gemini_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: summarizePrompt }]
        }]
      })
    });

    const api = await response.json();
  
  console.log("Full API Response:", api);
  
    const summerizedPage = api.candidates[0].content.parts[0].text;
    
    document.getElementById('outPut').innerText = summerizedPage;

  } catch (error) {
    console.log('Sorry, an error occurred: ' + error);
}
  
});



const searchLangInput = document.querySelector('.translate-search-input');


searchLangInput.addEventListener('input', () => {

  const searchLangInputValue = searchLangInput.value.trim().toLowerCase();

  let languageSearchResult = '';
  
  languages.forEach((language) => {
    if(language.name.trim().toLowerCase().includes(searchLangInputValue)) {
      languageSearchResult += `
      <div class="language-row">
    <p>
      ${language.name} 
    </p>

    <button class="js-translate-btn translate-btn" value="${language.name}">
      Translate
    </button>
  </div>
      `;
    } else {
      languageSearchResult = '';
    }
    document.querySelector('.js-languages').innerHTML = languageSearchResult;
  });

});

const toggleFullScreenBtn = document.querySelector('.js-fullScreenBtn');
const fullScreenEl = document.querySelector('.js-page-html');

toggleFullScreenBtn.addEventListener('click', () => {

  if(!document.FullscreenElement) {
    fullScreenEl.requestFullscreen();
  } else if(document.exitFullscreen) {
    document.exitFullscreen();
  }
  
});





