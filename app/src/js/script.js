import {API} from '../../modules/OBA-wrapper-master/js/index.js';
console.log(API);


(async(value) => {
    if (localStorage.getItem('books')) {
        let storage = localStorage.getItem('books');
        storage = JSON.parse(storage);
        console.log("localstorage has data")
    } else {
        // localStorage.clear();
        const api = new API({
            key: "1e19898c87464e239192c8bfe422f280"
        });

        const stream = await api.createStream(`search/classification:prentenboek/`);
        stream
            .pipe(checkProperty)
            .pipe(storeLocal)
    }

    function storeLocal(data) {
        const saveLocalData = data.map(book => {
            return {
                title: book.titles.title._text,
                subjects: book.subjects["topical-subject"]._text,
                summary: book.summaries.summary._text,
                img1: book.coverimages.coverimage[0]._text,
                img2: book.coverimages.coverimage[1]._text,
            }
        });
        localStorage.setItem('books', JSON.stringify(saveLocalData))

    }

    function checkProperty(value) {
        // consoe.log(value)
        const booksSubjectCorrect = value.filter(topicalSubject)
        console.log(booksSubjectCorrect)
        return booksSubjectCorrect
    }

    // Look if subject element has text, if yes, return!
    function topicalSubject(value) {
        if (value.subjects) {
            if (value.subjects["topical-subject"]) {
                if (value.subjects["topical-subject"]._attributes) {
                    if (value.subjects["topical-subject"]._text) {
                        return value;
                    } else {
                        return undefined;
                    }
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    // //Select all checkboxes and add a click event.
    const inputs = document.querySelectorAll('form input[type=checkbox]')
    console.log(inputs)
    inputs.forEach(input => input.addEventListener('click', boxChecked))

    function clearContainer() {
        document.getElementById('listbooks').innerHTML = '';
    }

    function boxChecked() {
        if (this.checked === true) {
            let section = document.getElementById('todo');
            section.classList.add('hidden');
            let storage = localStorage.getItem('books');
            storage = JSON.parse(storage);
            console.log(storage, "localstorage")

            const rightValue = filterGenres(storage, this.value)
            console.log(rightValue)
            createElements(rightValue)
            const sectionResults = document.getElementById('listbooks');
            sectionResults.classList.remove('hidden');
        } else {
            let section = document.getElementById('todo');
            section.classList.add('hidden');
            clearContainer();
        }
    }

    // Filter the genre
    function filterGenres(data, genre) {

        const array = []
        data.forEach(book => {
            if (book.subjects === genre) {
                book.genre = genre
                array.push(book)
            }
        })
        console.log(array)
        return array
    }

    function createElements(data) {
        const container = document.getElementById("listbooks")
        const saveData = [];

        data.forEach(book => {
            console.log(book.genre)
            const bookElements = {
                title: book.title,
                summary: book.summary,
                img2: book.img2,
            }
            saveData.push(bookElements);
            const element =
        `
        <article class="book ${book.genre}">
            <img class="img" src="${book.img2}" alt="img" />
            <p class="summary">${book.summary}</p>
        </article>
        `
            container.insertAdjacentHTML('beforeend', element)
        })

        console.log(saveData);
    }

    let listbooks = document.getElementById('listbooks');
    listbooks.addEventListener('click', toggleSection)

    function toggleSection() {
        let section = document.getElementById('todo');
        section.classList.remove('hidden');
    };

})();