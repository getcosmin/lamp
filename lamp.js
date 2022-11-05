const countTotalWords = [];

const LAMP = {
    select: {
        // select - Used to select data on the webpage
        title: document.querySelector('title'),
        meta: document.querySelectorAll('meta'),
        paragraphs: document.querySelectorAll('p'),
        listItems: document.querySelectorAll('li'),
        headers: document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    },
    
    data: {
        H1: {

        },
        // DATA - used to store website data as objects
        H2: {
    
        },
        H3: {
    
        },
        H4: {
    
        },
        H5: {
    
        },
        H6: {
    
        },
        paragraphs: {

        }
    },

    run: {
        
        title: () => {
            // TITLE - store the webpage title
            LAMP.data.title = {
                text: LAMP.select.title.innerText,
                chars: LAMP.select.title.innerText.length,
                words: LAMP.select.title.innerText.split(' ').length
            }
            countTotalWords.push(LAMP.select.title.innerText.split(' ').length);     
        },

        description: () => {
             // 02 - Store Meta Description
            LAMP.select.meta.forEach((element, index) => {
                if (LAMP.select.meta[index].attributes[0].value === 'description') {
                    LAMP.data.description = {
                        text: element.attributes[1].value,
                        chars: element.attributes[1].value.length,
                        words: element.attributes[1].value.split(' ').length
                    }
                    countTotalWords.push(element.innerText.split(' ').length);     
                }
            })
        },
        updateHead: (element, index) => {
            LAMP.data[element.tagName][index] = {
                text: element.innerText,
                chars: element.innerText.length,
                words: element.innerText.split(' ').length
             }
        },
        headers: () => {
            // 03 - Storing H2 headers
            LAMP.select.headers.forEach((element, index) => {
                const isHeader = element.tagName;

                if (isHeader === 'H1') {

                    LAMP.run.updateHead(element, index);
                    
                } else if (isHeader === 'H2') {

                    LAMP.run.updateHead(element, index);
                    
                } else if (isHeader === 'H3') {

                    LAMP.run.updateHead(element, index);
                    
                } else if (isHeader === 'H4') {

                    LAMP.run.updateHead(element, index);
                    
                } else if (isHeader === 'H5') {

                    LAMP.run.updateHead(element, index);
                    
                } else if (isHeader === 'H6') {

                    LAMP.run.updateHead(element, index);
                    
                }
                countTotalWords.push(element.innerText.split(' ').length);     
           })
       },
       paragraphs: () => {
        // 03 - Storing H2 headers
        LAMP.select.paragraphs.forEach((element, index) => {
            LAMP.data.paragraphs[index] = {
               text: element.innerText,
               chars: element.innerText.length,
               words: element.innerText.split(' ').length
            }
            countTotalWords.push(element.innerText.split(' ').length);     
       })
   },
   },
   start: () => {
       // Execute LAMP App
       LAMP.run.title();
       LAMP.run.description();
       LAMP.run.headers();
       LAMP.run.paragraphs();
   }
}

// Create DIV
const lampFrame = document.createElement('div');

LAMP.start();

// 01 - Create App Frame
function createLAMP() {
    document.body.prepend(lampFrame);
    lampFrame.classList.add('lamp');
    document.body.style.marginTop = "64px";

    // 02 - Create 4 DIVs loop inside App Frame
    for (i = 0; i < 4; i++) {
        const newFrame = document.createElement('div');
        document.querySelector('.lamp').appendChild(newFrame);
    }

    const selectDiv = document.querySelectorAll('.lamp > div');

    const createImage = document.createElement('img');

    selectDiv[0].appendChild(createImage).classList.add('logo');

    getImage = document.querySelector('.logo');
    getImage.src = "https://getcosmin.dev/assets/misc/lamp/lamp.svg";

    
    // 03 - Add inner DIVs with KPI
    selectDiv[1].innerHTML = '<span class="text" id="seo-box">GRADE</span>  <span class="text" id="seo-score">96</span>';
    selectDiv[2].innerHTML = '<div class="sp20"> <p class="text"> WORD COUNT </p>  <p class="text note">1024 </p> </div>'
                           + '<div class="sp20"> <p class="text"> LINKS </p>  <p class="text note">64 </p> </div>'
                           + '<div class="sp20"> <p class="text"> IMAGES </p>  <p class="text note">64 </p> </div>';

    selectDiv[2].classList.add('flex');

}

createLAMP();