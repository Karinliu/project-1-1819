// LAST CHANGES

import { API } from '../../modules/OBA-wrapper-master/js/index.js';
console.log(API);


(async(value) => {
    // localStorage.clear();
    if (localStorage.getItem('books')) {
    	let storage = localStorage.getItem('books');
     	storage = JSON.parse(storage);
     	console.log(storage)
    	boxChecked(storage)
    	console.log("localstorage has data")
    } else {
        const api = new API({
            key: "1e19898c87464e239192c8bfe422f280"
        }); 
        const stream = await api.createStream(`search/classification:prentenboek/`);
        stream.pipe(storeLocal)
        stream.pipe(boxChecked)
        console.log("API is doing a request for data")
    }
})();


function storeLocal(data){
	const saveLocalData = [];
	data.forEach((book) => {
        // console.log(book.subjects);
        const localElements = {
            // title: book.titles.title._text,
            // genre: book.genres ? book.genres.genre._text : undefined,
            subjects: checkProperty(book),
            // summary: book.summaries.summary._text,
            // img1: book.coverimages.coverimage[0],
            // img2: book.coverimages.coverimage[1],
        }
        saveLocalData.push(localElements);
        // console.log(saveData)

    })
	window.localStorage.setItem('books', JSON.stringify(saveLocalData));
}

// function createElements(data) {
//     const template = document.getElementById('main');
//     const saveData = [];
//     data.forEach((book) => {
//         // console.log(book.subjects);
//         const bookElements = {
//             // title: book.titles.title._text,
//             // genre: book.genres ? book.genres.genre._text : undefined,
//             subjects: checkProperty(book),
//             // summary: book.summaries.summary._text,
//             // img1: book.coverimages.coverimage[0],
//             // img2: book.coverimages.coverimage[1],
//         }
//         saveData.push(bookElements);
//         // console.log(saveData)

//     })
//     var count = saveData.filter(function(book) {
//         return book.subjects !== undefined
//     }).length;
//     // console.log(count);
//     Transparency.render(template, saveData);

//     const directives = { // Directives are plain javascript functions defined in a two-dimensional object literal, i.e.,
//         title: {
//             text() {
//                 return `${this.titles.title._text}`;
//             }
//         }
//     }
//     Transparency.render(template, data, directives);
//     // console.log(saveData);
// }

function checkProperty(value) {
    if (value.subjects) {
        if (value.subjects["topical-subject"]) {
            // if (value.subjects["topical-subject"]._attributes) {
                if (value.subjects["topical-subject"]._text) {
                    return value;
                } else {
                    return undefined;
                }
            // } else {
                // return undefined;
            // }
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

//Select all checkboxes and add a click event.
const inputs = document.querySelectorAll('input[type=checkbox]')
// console.log(inputs)
inputs.forEach(input => input.addEventListener('click', boxChecked))

function boxChecked(data) {
	// console.log(this.value)
	console.log(this.value)
	const value = this.value
    // data.forEach(book => {
    JSON.parse(localStorage.getItem('books')).forEach(book => {
    	// console.log(book)
        const object = book.subjects["topical-subject"];
        if(object.length === undefined){
        	// console.log(object._text)
        	if(object._text === value){
        		console.log("same")
        	}else{
        		console.log("is not")
        	}
        	// console.log("het is wel object")
        }else{
        	object.forEach(book =>{
        		if(book._text === value){
        			console.log("same")
        		}else{
        			console.log("is not same")
        		}
        	})
        }
    })
}