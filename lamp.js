const countTotalWords = [];

const LAMP = {

    select: {

        // SELECT webpage text for later use.
        title: document.querySelector('title'),
        meta: document.querySelectorAll('meta'),
        text: document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li')
    },
    
    data: {

        // SECTIONS to store text based on type.
        H1: {

        },

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
        P: {

        },
        LI: {

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

        getText: () => {

            // 03 - SCAN the webpage and get all the text.
            LAMP.select.text.forEach((element, index) => {
                
                const isText = element.tagName;

                const storeText = () => {
                    LAMP.data[element.tagName][index] = {
                        text: element.innerText,
                        chars: element.innerText.length,
                        words: element.innerText.split(' ').length
                     }
                }

                // CHECK <tags> and store text per based on type.
                if (isText === 'H1') {
                    storeText();

                } else if (isText === 'H2') {
                    storeText();
                    
                } else if (isText === 'H3') {
                    storeText();
                    
                } else if (isText === 'H4') {
                    storeText();
                    
                } else if (isText === 'H5') {
                    storeText();
                    
                } else if (isText === 'H6') {
                    storeText();
                    
                } else if (isText === 'P') {
                    storeText();

                } else if (isText === 'LI') {
                    storeText();
                    
                }
                countTotalWords.push(element.innerText.split(' ').length);     
           })
       },
   },

   start: () => {
       // Execute LAMP App
       LAMP.run.title();
       LAMP.run.description();
       LAMP.run.getText();
   }
}

// Create DIV
const lampFrame = document.createElement('div');

LAMP.start();

// 01 - Build LAMP App
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