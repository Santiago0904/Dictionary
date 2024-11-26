import {dictionary} from "./words.js";
const txtArea = document.getElementById('words')
const result = document.getElementById('result')
const select = document.getElementById('select-idiom')
const diccio = document.querySelector('.popup-window')
const diccionaryResult = document.querySelector('.dictionary-results')
const form = document.querySelector('.popup-window2')
const newWordSpanish = document.getElementById('new-spanish')
const newWordEnglish = document.getElementById('new-english')
const newWordCategory = document.getElementById('Category-form')
const addError = document.querySelector('.error')
const addconfirmation = document.querySelector('.confirmation')



const compressArray = () => {
    return Object.values(dictionary.categories).flat();
};

const Traduction = () => {
    const newArray=compressArray()
    newArray.forEach(element => {
        if (
            txtArea.value.toLowerCase() == element.spanish.toLowerCase() ||
            txtArea.value.toLowerCase() == element.english.toLowerCase()
        ) {
            if (select.value == "Español-Ingles") {
                if (txtArea.value.toLowerCase() == element.spanish.toLowerCase()) {
                    result.innerHTML = element.english;
                } else {
                    result.innerHTML = "Escriba la palabra en el idioma indicado";
                }
            } else if (select.value == "Ingles-Español") {
                if (txtArea.value.toLowerCase() == element.english.toLowerCase()) {
                    result.innerHTML = element.spanish;
                } else {
                    result.innerHTML = "Escriba la palabra en el idioma indicado";
                }
            }
        }
    });
};
let FilterIdiom = document.querySelectorAll('.radious');

const WordSpanish = (element) => {
    const wordSpanish = document.createElement('h2');
    wordSpanish.id = "palabra2";
    wordSpanish.textContent = element.spanish;
    diccionaryResult.appendChild(wordSpanish);
};

const WordEnglish = (element) => {
    const wordEnglish = document.createElement('h2');
    wordEnglish.id = "palabra2";
    wordEnglish.textContent = element.english;
    diccionaryResult.appendChild(wordEnglish);
};

const check = (element2) => {
    FilterIdiom.forEach(element => {
        if (element.checked) {
            diccionaryResult.style.display = 'flex';
            if (element.value === "español") {
                WordSpanish(element2);
            } else if (element.value === "ingles") {
                WordEnglish(element2);
            }
        }
    });
};

const showWords = () => {
    diccionaryResult.innerHTML = '';
    compressArray().forEach(element => {
        check(element);
    });
};



FilterIdiom.forEach(element => {
    element.addEventListener('change', showWords);
});

let FilterCategories = document.querySelectorAll('#radious2')

const filterCategory = () => {
    diccionaryResult.innerHTML = '';
    const category = [...FilterCategories].find(element => element.checked)?.value;
    const idiom = [...FilterIdiom].find(element => element.checked)?.value;

    if (category && idiom) {
        const fWord = dictionary.categories[category];
        if (fWord && fWord.length > 0) {
            if (idiom === "español") {
                fWord.forEach(WordSpanish);
            } else if (idiom === "ingles") {
                fWord.forEach(WordEnglish);
            }
        } else {
            diccionaryResult.innerHTML = "No hay palabras en esta categoría.";
        }
    }
};

FilterCategories.forEach(element => {
    element.addEventListener('change', filterCategory);
});


const displayNoneDictionary = () => {
    diccio.style.display = 'none';
    setTimeout(() => {
        diccio.style.opacity = 0;
    });
};

const styleDictionary = () => {
    diccio.style.display = 'block';
    setTimeout(() => {
        diccio.style.opacity = 1;
    }, 10);
};

const displayNoneForm= () => {
    form.style.display = 'none';
    setTimeout(() => {
        form.style.opacity = 0;
    });
};

const styleForm = () =>{
    form.style.display = 'flex';
    setTimeout(() => {
        form.style.opacity = 1;
    }, 10);
}

const newId = (category) => {
    const onlyCategories = dictionary.categories[category];
    const endWord = onlyCategories[onlyCategories.length - 1];
    return endWord ? endWord.id + 1 : 1;
};

const AddWord = () => {
    if (newWordSpanish.value.trim() === '' || newWordEnglish.value.trim() === '') {
        addError.style.display = 'block';
        setTimeout(() => {
            addError.style.display = 'none';
        }, 2000);
    } else {
        addconfirmation.style.display = 'block';
        setTimeout(() => {
            addconfirmation.style.display = 'none';
        }, 2000);
        
        const newCategory = newWordCategory.value;
        const valueId = newId(newCategory);
        
        const newWord = {
            id: valueId,
            english: newWordEnglish.value.toLowerCase(),
            spanish: newWordSpanish.value.toLowerCase(),
            example: example.value, 
        };

        dictionary.categories[newCategory].push(newWord);
        console.log(dictionary);
    }
};


function OrderList() {
    const order = compressArray().sort((a, b) =>
        a.spanish.localeCompare(b.spanish)
    );
    diccionaryResult.innerHTML = '';
    order.forEach(elemento => {
        const palabraElemento = document.createElement('h2');
        palabraElemento.textContent = `${elemento.spanish} - ${elemento.english} - ${elemento.example}`;
        diccionaryResult.appendChild(palabraElemento);
    });
}

document.getElementById('A-Z').addEventListener('click', OrderList);

document.getElementById('traducciones').addEventListener('click', Traduction)
const btnDiccionary=document.getElementById('btn-diccionary').addEventListener('click',styleDictionary)
const closeDiccionary= document.getElementById('close').addEventListener('click',displayNoneDictionary)
const btnAddWord = document.getElementById('btn-Add-Word').addEventListener('click', styleForm)
const closeform= document.getElementById('close2').addEventListener('click',displayNoneForm)
const addNewWord = document.getElementById('add-word').addEventListener('click', AddWord)

