

const LAMP = {
    select: {
        // select - Used to select data on the webpage
        title: document.querySelector('title'),
        meta: document.querySelectorAll('meta'),
        paragraphs: document.querySelectorAll('p'),
        h1: document.querySelectorAll('h1'),
        h2: document.querySelectorAll('h2'),
        h3: document.querySelectorAll('h3'),
        h4: document.querySelectorAll('h4'),
        listItems: document.querySelectorAll('li')
    },
    
    data: {
        // DATA - used to store website data as objects
        h2: {
    
        }

    },
    words: {

    },

    run: {
        
        title: () => {
            // TITLE - store the webpage title
            LAMP.data.title = {
                text: LAMP.select.title.innerText,
                chars: LAMP.select.title.innerText.length,
                words: LAMP.select.title.innerText.split(' ').length
            }
        },

        description: () => {
             // 02 - Store Meta Description
            LAMP.select.meta.forEach((element, index) => {
                if (LAMP.select.meta[index].attributes[0].value === 'description') {
                    LAMP.data.description = element.attributes[1].value;
                }
            })
        },

        headers: () => {
            // 03 - Storing H2 headers
            LAMP.select.h2.forEach((element, index) => {
                LAMP.data.h2[index] = {
                   text: element.innerText,
                   chars: element.innerText.length,
                   words: element.innerText.split(' ').length
                }
                
           })
       },
   },
   start: () => {
       // Execute LAMP App
       LAMP.run.title();
       LAMP.run.description();
       LAMP.run.headers();
   }
}

const lampFrame = document.createElement('div');

LAMP.start();

function lampNavigation() {
    document.body.prepend(lampFrame);
    lampFrame.classList.add('lamp');


    document.body.style.marginTop = "64px";
    lampFrame.innerHTML = LAMP.data.title.text;
}
lampNavigation();