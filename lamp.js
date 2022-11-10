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

        LAMP.select.meta.description.forEach((element, index) => {
            if (LAMP.select.meta.description[index].attributes[0].value === 'description') {
                LAMP.data.description = {
                    text: element.attributes[1].value,
                    chars: element.attributes[1].value.length,
                    words: element.attributes[1].value.split(' ').length
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
            if (element.attributes.href.value.includes('https://')) {
                LAMP.data.HREF[index] = {
                    link: element.attributes.href.value,
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

LAMP.start = () => {
// Execute LAMP Functions

    LAMP.run.getTitle();
    LAMP.run.getDescription();
    LAMP.run.getText();
    LAMP.run.getTotalWords();
    LAMP.run.getLinks();
    LAMP.run.getImages();
}


// Create DIV
const lampFrame = document.createElement('div');

LAMP.start();

function createLAMP() {

    // 01 - CREATE Lamp App
    document.body.prepend(lampFrame);
    lampFrame.classList.add('lamp');
    document.body.style.marginTop = "64px";

    // 02 - CREATE 4 <div> inside LAMP App
    for (i = 0; i < 4; i++) {
        const newFrame = document.createElement('div');
        document.querySelector('.lamp').appendChild(newFrame);
    }

    const selectDiv = document.querySelectorAll('.lamp > div');

    // 03 - CREATE logo for the App
    const createImage = document.createElement('img');

    selectDiv[0].appendChild(createImage).classList.add('logo');

    getImage = document.querySelector('.logo');
    getImage.src = "https://getcosmin.dev/assets/misc/lamp/lamp.svg";

    
    // 03 - Add inner DIVs with KPI
    selectDiv[1].innerHTML = `<span class="text" id="seo-box">GRADE</span>  
                              <span class="text" id="seo-score">96</span>`

    selectDiv[2].innerHTML = `<div class="sp20"> 
                                <p class="text">WORD COUNT</p>  
                                <p class="text note">${getTotalWords}</p> 
                              </div>
                            <div class="sp20"> 
                                <p class="text">LINKS </p>  
                                <p class="text note">${getTotalLinks}</p> 
                            </div>
                                <div class="sp20"> 
                                <p class="text">IMAGES</p>  
                                <p class="text note">${getTotalImages}</p> 
                            </div>`

    selectDiv[2].classList.add('flex');

}

createLAMP();