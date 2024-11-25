import {dictionary} from "./words.js";
const txtArea = document.getElementById('words')
const result = document.getElementById('result')
const select = document.getElementById('select-idiom')
const diccio = document.querySelector('.popup-window')
const diccionaryResult = document.querySelector('.dictionary-results')


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
                if (txtArea.value == element.spanish) {
                    result.innerHTML = element.english;
                } else {
                    result.innerHTML = "Escriba la palabra en el idioma indicado";
                }
            } else if (select.value == "Ingles-Español") {
                if (txtArea.value == element.english) {
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
            if (idiom === "palabra") {
                fWord.forEach(WordSpanish);
            } else if (idiom === "traduccion") {
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

document.getElementById('traducciones').addEventListener('click', Traduction)
const btnDiccionary=document.getElementById('btn-diccionary').addEventListener('click',styleDictionary)
const closeDiccionary= document.getElementById('close').addEventListener('click',displayNoneDictionary)

