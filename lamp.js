const countTotalWords = [];
let getTotalLinks = 0;
let getTotalImages = 0;
const LAMP = {};

LAMP.select = {
// 00 - SELECT - Used to select the content on the webpage

    meta: {
        title: document.querySelector('title'),
        description: document.querySelectorAll('meta'),

    },

    text: {
        h1: document.querySelectorAll('h1'),
        h2: document.querySelectorAll('h2'),
        h3: document.querySelectorAll('h3'),
        h4: document.querySelectorAll('h4'),
        h5: document.querySelectorAll('h5'),
        h6: document.querySelectorAll('h6'),
        p: document.querySelectorAll('p'),
        li: document.querySelectorAll('li'),        
    },

    links: {
        href: document.querySelectorAll('a')
    },

    images: {
        img: document.querySelectorAll('img')
    }

},
    
LAMP.data = {
// 01 - DATA - Used to store the webpage data

    H1: {},
    H2: {},
    H3: {},
    H4: {},
    H5: {},
    H6: {},
    P: {},
    LI: {},
    HREF: {},
    IMG: {}
        
},

LAMP.run = {
// 02 - FUNCTIONS - Used for processing data from webpage
        
    getTitle: () => {
    // 02.1. - GET TITLE from webpage

        LAMP.data.title = {
            text: LAMP.select.meta.title.innerText,
            chars: LAMP.select.meta.title.innerText.length,
            words: LAMP.select.meta.title.innerText.split(' ').length
        }
            countTotalWords.push(LAMP.select.meta.title.innerText.split(' ').length);     
    },

    getDescription: () => {
    // 02.2. - GET META description from webpage

        LAMP.select.meta.description.forEach((element) => {
            if (element.name === 'description') {
                LAMP.data.description = {
                    text: element.content,
                    chars: element.content.length,
                    words: element.content.split(' ').length   
                }
            
                countTotalWords.push(element.innerText.split(' ').length); 

            }
        })
    },

    getText: () => {
    // 02.3. - GET Text from webpage

        for (text in LAMP.select.text) {
            LAMP.select.text[text].forEach((element, index) => {
                LAMP.data[element.tagName][index] = {
                    text: element.innerText,
                    chars: element.innerText.length,
                    words: element.innerText.split(' ').length
                }

                countTotalWords.push(element.innerText.split(' ').length);  

            })
        }       
    },

    getTotalWords: () => {         
    // 02.4. - SUM the array and calculate total words on webpage

        getTotalWords = countTotalWords.reduce((a, b) => a + b, 0)

    },

    getLinks: () => {
    // 02.5. - GET LINKS from webpage which have https

        LAMP.select.links.href.forEach((element, index) => {
            if (element.href.includes('https://')) {
                LAMP.data.HREF[index] = {
                    link: element.href
                }
                getTotalLinks++;
            } 
        })
    },

    getImages: () => {
    // 02.6. - GET IMAGES from webpage and store information

        LAMP.select.images.img.forEach((element, index) => {
            LAMP.data[element.tagName][index] = {
                alt: element.alt,
                chars: element.alt.length,
                words: element.alt.split(' ').length,
            }
            getTotalImages++;
        }) 
    }
}


// ----------------------------------------
// START - Used to process the webpage information.

LAMP.start = () => {

    LAMP.run.getTitle();
    LAMP.run.getDescription();
    LAMP.run.getText();
    LAMP.run.getTotalWords();
    LAMP.run.getLinks();
    LAMP.run.getImages();
}

// ----------------------------------------
// ALERTS - Used to warn user if there are any SEO issues.

LAMP.alert = {

    success: (meta, chars, position) => {
        position.innerHTML = `<div class="sp20">
                                <p class="text">${meta} tag has a length of ${chars} and is well optimized. Well done!</p>
                              </div>`
    },

    warning: (meta, chars, position, minLength, maxLength) => {
        position.innerHTML =  `<div class="sp20">
                                <p class="text">${meta} tag has a length of ${chars} and can be improved. We recommand using a
                                                       length between ${minLength} and ${maxLength}.</p>
                              </div>`
    },

    severe: (meta, position, minLength, maxLength) => {
        position.innerHTML =  `<div class="sp20">
                                <p class="text">${meta} tag is missing. We recommand using
                                                       one with a length between ${minLength} and ${maxLength}.</p>
                              </div>`
    }

}

// ----------------------------------------
// AUDIT - Scans the data and checks if SEO practices are done well.

LAMP.audit = {

    check: (meta, chars, position, minLength, maxLength) => {

        if (chars === 0) {
            LAMP.alert.severe(meta, position, minLength, maxLength);
            
        } else if (chars >= minLength && chars <= maxLength) {
            LAMP.alert.success(meta, chars, position, minLength, maxLength);

        } else if (chars < minLength || chars > maxLength) {
            LAMP.alert.warning(meta, chars, position, minLength, maxLength);
        }
    }
}


// Create DIV
const lampFrame = document.createElement('section');

LAMP.start();

LAMP.create = {
    divs: (selector, content, size) => {
        for (i = 0; i < size; i++) {
            const newFrame = document.createElement(content);
            selector.appendChild(newFrame);
        }
    },
    frame: () => {
        const lampWrap = document.createElement('section');
        document.body.prepend(lampWrap);
        selectWrap = document.querySelector('section');
        selectWrap.classList.add('lamp');

        // 01 - CREATE Lamp App
        selectWrap.append(lampFrame);
        lampFrame.classList.add('lamp__nav', 'width');
        document.body.style.marginTop = "64px";

    // 02 - CREATE 4 <div> inside LAMP App
    const selector = document.querySelector('.lamp__nav');
    LAMP.create.divs(selector, 'div', 4)

    const selectDiv = document.querySelectorAll('.lamp__nav > div');

    // 03 - CREATE logo for the App
    const createImage = document.createElement('img');

    selectDiv[0].appendChild(createImage).classList.add('logo');

    getImage = document.querySelector('.logo');
    getImage.src = "https://getcosmin.dev/assets/misc/lamp/lamp.svg";

    

    
    // 03 - Add inner DIVs with KPI
    selectDiv[1].innerHTML = `<span class="text" id="seo-box">GRADE</span>  
                              <span class="text" id="seo-score">96</span>`

    selectDiv[2].classList.add('flex');

    selectDiv[3].classList.add('flex-end');
    selectDiv[3].innerHTML = `<button class="text button__primary" id="open-dashboard">
                                View Dashboard
                              </button>`

    buildDashboard(selectWrap);
    }
}

LAMP.create.frame();

function buildDashboard(selectWrap) {
    const createDashboard = document.createElement('section');
    selectWrap.append(createDashboard);
    
    const newSection = document.querySelector('.lamp section:nth-child(2)');
    newSection.classList.add('lamp__dashboard', 'width', 'hide')
   
} 

LAMP.dashboard = {
// 04 - DASHBOARD - Display more detalis about SEO KPIs
    create: () => {
        const selectSection = document.querySelectorAll('section');
        selectSection[2].innerHTML = `<div class="dashboard__body width" id="inner-dashboard"></div>`

        const selector = document.querySelector('#inner-dashboard');
        LAMP.create.divs(selector, 'div', 5)

        const selectDiv = document.querySelectorAll('.dashboard__body > div');

        // Loop over divs and add classes.
        for (i = 0; i < selectDiv.length; i++) {
            selectDiv[i].classList.add(`col${[i + 1]}`, `column__box`)
        }

        selectDiv[0].innerHTML = `<div class="sp20"> 
                                  <p class="title">Word Count</p>  
                                  <p class="text note">${getTotalWords}</p> 
                                </div>
                                <div id="bar-col1"></div>`

        selectDiv[1].innerHTML = `<div class="sp20"> 
                                    <p class="title">Links</p>  
                                    <p class="text note">${getTotalLinks}</p> 
                                  </div>
                                  <div id="bar-col2"></div>`
        
        selectDiv[2].innerHTML =`<div class="sp20"> 
                                  <p class="title">Images</p>  
                                  <p class="text note">${getTotalImages}</p> 
                                </div>
                                <div id="bar-col3"></div>`

        selectDiv[3].innerHTML = `<div class="sp20"> 
                                    <p class="title">Page Title</p>  
                                    <p class="text note">${LAMP.data.description.chars}</p>
                                  </div>
                                  <p class="text note" id="lamp-title"></p>
                                  <div id="bar-col4"></div>`
        
        selectDiv[4].innerHTML = `<div class="sp20"> 
                                    <p class="title">Description</p>  
                                    <p class="text note">${LAMP.data.description.chars}</p> 
                                 </div>
                                 <div><p class="text note" id="lamp-description"></p></div>
                                 <div id="bar-col5"></div>`

    },
    select: {
        menu: document.querySelector('#open-dashboard'),
        body: document.querySelector('.lamp__dashboard')
    },
    view: () => {
        LAMP.dashboard.select.body.classList.toggle('hide');
    }

}
LAMP.dashboard.create();

// PLACEHOLDER FUNCTION will change
/*function runCheck() {
    const meta = LAMP.data.title.chars;
    position = document.querySelector('#h1T');
    minLength = 50;
    maxLength = 60;

    LAMP.audit.check(meta, position, minLength, maxLength);
    
}*/

LAMP.audit.check(
    meta = "Title",
    chars = LAMP.data.title.chars, 
    position = document.querySelector('#lamp-title'), 
    minLength = 50, 
    maxLength = 60
    );

function checkDES() {
    if (LAMP.data.description === undefined) {
        LAMP.data.description = {
            chars: 0
        }
    } 
}
checkDES();

LAMP.audit.check(
    meta = "Description",
    chars = LAMP.data.description.chars, 
    position = document.querySelector('#lamp-description'), 
    minLength = 150, 
    maxLength = 160
    );

//runCheck();

LAMP.dashboard.select.menu.addEventListener('click', LAMP.dashboard.view);