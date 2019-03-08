import {
    API
} from '../../modules/OBA-wrapper-master/js/index.js';
console.log(API);

const router = {
    init: function() {
        apiData.handleData();
    },
    routes: function(data) {
        routie({
            '': function() {
                sections.toggle(sections.showMain); //End loader + Show main
                render.createElements(data); //Render createElements
                console.log('Page is home');
            },
            'detail/:id': function() {
                sections.toggle(sections.showDetail);
                render.createDetailElements(data);
                console.log('Page is detail');
            }
        });
    }
};

const sections = {
    showMain: document.getElementById('home'), // Get sections element Home and return.
    showDetail: document.getElementById('detail'), // Get sections element Detail and return.
    showLoader: document.getElementById('loader'), // Get sections element Loader and return.
    showError: document.getElementById('error'), // Get sections element Error and return.
    toggle: function(element) {
        sections.showMain.classList.add('hidden'); // Set hidden
        sections.showLoader.classList.add('hidden'); // Set hidden
        sections.showDetail.classList.add('hidden'); // Set hidden
        sections.showError.classList.add('hidden'); // Set hidden

        element.classList.toggle('hidden'); //When one of the sections is clicked, take off the class hidden.
    }
};

(async(value) => {
    // localStorage.clear();
    if (localStorage.getItem('books')) {
        let storage = localStorage.getItem('books');
        storage = JSON.parse(storage);
        apiData.localstorageData(storage)
        createElements(storage)
        console.log("localstorage has data")
    } else {
        const api = new API({
            key: "1e19898c87464e239192c8bfe422f280"
        });

        const stream = await api.createStream(`search/classification:prentenboek/`);
        stream.pipe(storeLocal)
        stream.pipe(createElements)
        console.log("API is doing a request for data")
    }
})();


const apiData = {
    localstorageData: function(data) {
        const saveLocalData = [];

        data.forEach(films => { // Map is used to get only an array that contains the title and descriptions of the data from each film.
            const bookLocalElements = {
                title: book.titles.title._text,
                // genre: book.genres ? book.genres.genre._text : undefined,
                subjects: checkProperty(book),
                summary: book.summaries.summary._text,
                // img1: book.coverimages.coverimage[0],
                // img2: book.coverimages.coverimage[1],
            }
            saveLocalData.push(localElements);
        })

        window.localStorage.setItem('books', JSON.stringify(saveLocalData)); //Set title and description in localStorage.
    }
};

const render = {
    createElements: function(data) {
        const template = document.getElementById('main');
        const saveData = [];

        data.map(films => { // Map is used to get only an array that contains the title and descriptions of the data from each film.
            const templateElements = {
                titles: book.titles.title._text,
                // genre: book.genres ? book.genres.genre._text : undefined,
                // subjects: checkProperty(book),
                summary: book.summaries.summary._text,
                // img1: book.coverimages.coverimage[0],
                // img2: book.coverimages.coverimage[1],
            }
            saveData.push(templateElements);
        })

        // const directives = { // Directives are plain javascript functions defined in a two-dimensional object literal, i.e.,
        //     link: {
        //         href() {
        //             return `#detail/${this.id}`;
        //         }
        //     }
        // }
        Transparency.render(template, saveData);
    }
}
router.init();

// Reference filter, map and reduce: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
// Reference routie: https://github.com/jgallen23/routie/blob/master/test/routie.test.js
// Reference transparency template: https://github.com/leonidas/transparency/
// Reference promise: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Reference templates: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
// Reference adjacentHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML