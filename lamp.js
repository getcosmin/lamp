const countTotalWords = [];
let getTotalLinks = 0;
let getTotalImages = 0;
const LAMP = {};

LAMP.select = {
// 00 - SELECT - Used to select webpage content

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
// 01 - DATA - Placeholders to store the webpage data

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
// 02 - FUNCTIONS - Used for grabbing and storing data from webpage
        
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
        // If META Description was not found, add a value for ploceholder.
        if (LAMP.data.description == undefined) {
            LAMP.data.description = {
                chars: 0
            }
        }

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
// ALERTS - Points out SEO issues and gives suggestions to fix.

LAMP.alert = {

    success: (meta, chars, position, bar) => {
        position.innerHTML = `<div class="sp20">
                                <span class="text">Well done! </br> 
                                Your ${meta} has ${chars} characters.</span>
                              </div>`
        bar.classList.add('alert__success');
    },

    warning: (meta, chars, position, bar, minLength, maxLength) => {
        position.innerHTML =  `<div class="sp20">
                                <span class="text">Optimization can be improved! </br> 
                                Keep ${meta} between ${minLength} - ${maxLength} characters.</span>
                              </div>`

        bar.classList.add('alert__warning');
    },

    severe: (meta, chars, position, bar, minLength, maxLength) => {
        position.innerHTML =  `<div class="sp20">
                                <span class="text">Urgent issue needs fixing! </br>
                                Keep ${meta} between ${minLength} - ${maxLength} characters.</span>
                              </div>`
        bar.classList.add('alert__severe');
    }

}

// ----------------------------------------
// AUDIT - Checks the data returns SEO suggestions.

LAMP.audit = {

    check: (meta, chars, position, bar, minLength, maxLength) => {

        if (chars === 0) {
            LAMP.alert.severe(meta, chars, position, bar, minLength, maxLength);
            
        } else if (chars >= minLength && chars <= maxLength) {
            LAMP.alert.success(meta, chars, position, bar, minLength, maxLength);

        } else if (chars < minLength || chars > maxLength) {
            LAMP.alert.warning(meta, chars, position, bar, minLength, maxLength);
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
    LAMP.create.divs(selector, 'div', 3)

    const selectDiv = document.querySelectorAll('.lamp__nav > div');

    // 03 - LAMP logo - create image with link
    const createImage = document.createElement('img');

    selectDiv[0].appendChild(createImage).classList.add('logo');

    getImage = document.querySelector('.logo');
    getImage.src = "https://getcosmin.dev/assets/misc/lamp/lamp.svg";

    

    
    // 03 - Add inner DIVs with KPI
    selectDiv[1].innerHTML = `<span class="text" id="seo-box">GRADE</span>  
                              <span class="text" id="seo-score">96</span>`

    selectDiv[2].classList.add('flex-end');
    selectDiv[2].innerHTML = `<div class="text button__primary" id="open-dashboard">
                                <img class="lamp-icon" src="https://getcosmin.dev/assets/misc/lamp/lamp-menu.svg">
                                View Dashboard
                              </div>`

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
// 04 - DASHBOARD - Build the dashboard user interface
    create: () => {
        const selectSection = document.querySelectorAll('section');
        selectSection[2].innerHTML = `<div class="dashboard__body width" id="inner-dashboard"></div>`

        const selector = document.querySelector('#inner-dashboard');
        LAMP.create.divs(selector, 'div', 5)

        const selectDiv = document.querySelectorAll('.dashboard__body > div');

        // LOOP over divs and add classes to them
        for (i = 0; i < selectDiv.length; i++) {
            selectDiv[i].classList.add(`dashboard__card`, `col${[i + 1]}`)
        }

        selectDiv[0].innerHTML = `<div class="sp20"> 
                                  <p class="dashboard__kpi_title">Word Count</p>  
                                  <p class="dashboard__kpi_value">${getTotalWords}</p> 
                                </div>
                                <div id="bar-col1"></div>`

        selectDiv[1].innerHTML = `<div class="sp20"> 
                                    <p class="dashboard__kpi_title">Links</p>  
                                    <p class="dashboard__kpi_value">${getTotalLinks}</p> 
                                  </div>
                                  <div id="bar-col2"></div>`
        
        selectDiv[2].innerHTML =`<div class="sp20"> 
                                  <p class="dashboard__kpi_title">Images</p>  
                                  <p class="dashboard__kpi_value">${getTotalImages}</p> 
                                </div>
                                <div id="bar-col3"></div>`

        selectDiv[3].innerHTML = `<div class="sp20"> 
                                    <p class="dashboard__kpi_title">Page Title</p>  
                                    <p class="dashboard__kpi_value">${LAMP.data.title.chars}
                                    <span class="xs"> characters</span></p>
                                  </div>
                                  <span class="text" id="lamp-title"></span>
                                  <div id="bar-col4"></div>`
        
        selectDiv[4].innerHTML = `<div class="sp20"> 
                                    <p class="dashboard__kpi_title">Description</p>  
                                    <p class="dashboard__kpi_value">${LAMP.data.description.chars}
                                    <span class="xs"> characters</span></p> 
                                 </div>
                                 <div><span class="note" id="lamp-description"></span></div>
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

// Perform SEO Audit on title description
LAMP.audit.check(
    meta = "title",
    chars = LAMP.data.title.chars, 
    position = document.querySelector('#lamp-title'),
    bar = document.querySelector('#bar-col4'), 
    minLength = 40, 
    maxLength = 60
);

// Function checks if meta description was found.
// #TODO: Restructure function in the future.
function checkDES() {
    if (LAMP.data.description === undefined) {
        LAMP.data.description = {
            chars: 0
        }
    } 
}

checkDES();

// Perform SEO Audit on meta description
LAMP.audit.check(
    meta = "description",
    chars = LAMP.data.description.chars, 
    position = document.querySelector('#lamp-description'),
    bar = document.querySelector('#bar-col5'), 
    minLength = 140, 
    maxLength = 160
);

//runCheck();

LAMP.dashboard.select.menu.addEventListener('click', LAMP.dashboard.view);