const countTotalWords = [];

const LAMP = {

    select: {

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
            li: document.querySelectorAll('li')
        }
    },
    
    data: {

        H1: {},
        H2: {},
        H3: {},
        H4: {},
        H5: {},
        H6: {},
        P: {},
        LI: {} 
        
    },

    run: {
        
        title: () => {
            // TITLE - store the webpage title
            LAMP.data.title = {
                text: LAMP.select.meta.title.innerText,
                chars: LAMP.select.meta.title.innerText.length,
                words: LAMP.select.meta.title.innerText.split(' ').length
            }
            countTotalWords.push(LAMP.select.meta.title.innerText.split(' ').length);     
        },

        description: () => {
             // 02 - Store Meta Description
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