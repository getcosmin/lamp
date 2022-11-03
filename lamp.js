

const LAMP = {
    selectors: {
        // SELECTORS - Used to select content on the webpage.
        title: document.querySelector('title'),
        meta: document.querySelectorAll('meta'),
        paragraphs: document.querySelectorAll('p'),
        h1: document.querySelectorAll('h1'),
        h2: document.querySelectorAll('h2'),
        h3: document.querySelectorAll('h3'),
        h4: document.querySelectorAll('h4'),
        listItems: document.querySelectorAll('li')
    },
    // CONTENT - Used to store all the webpage as text.
    content: {
        h2: {
    
        }

    },
    words: {

    },

    // START - Used to store all the functions
    run: {
        main: () => {
            LAMP.run.title();
            LAMP.run.description();
            LAMP.run.h2();
        },

        // 01 - Store Page Title

        title: () => {
            LAMP.content.title = {
                text: LAMP.selectors.title.innerText,
                chars: LAMP.selectors.title.innerText.length,
                words: LAMP.selectors.title.innerText.split(' ').length

            }
        },
        
        // 02 - Store Meta Description

        description: () => {
            LAMP.selectors.meta.forEach((element, index) => {
                if (LAMP.selectors.meta[index].attributes[0].value === 'description') {
                    LAMP.content.description = element.attributes[1].value;
                }
            })
        },

        // 03 - Store Headings 

        h2: () => {
            LAMP.selectors.h2.forEach((element, index) => {
                 LAMP.content.h2[index] = {
                    text: element.innerText,
                    chars: element.innerText.length,
                    words: element.innerText.split(' ').length
                 }
                 
            })
        }
        
    }
}