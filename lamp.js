const LAMP = {
    selectors: {
        // SELECTORS - Used to select content on the webpage.
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

    },
    // START - Used to store all the functions
    start: {
        // Function - Used to grab webpage text and store them as objects.
        update: () => {
            LAMP.selectors.meta.forEach((element, index) => {
                if (LAMP.selectors.meta[index].attributes[0].value === 'description') {
                    LAMP.content.description = LAMP.selectors.meta[index].attributes[1].value;
                }
            })
        }
    }
}