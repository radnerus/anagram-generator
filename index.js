const inputEle = document.querySelector('#input');
const generateButtonEle = document.querySelector('#generate');
const outputContainerEle = document.querySelector('.output-container');
const noInputContainerEle = document.querySelector('.no-input-container');
const outputEle = document.querySelector('#output');
const countEle = document.querySelector('#anagram-count');
const typedWordEle = document.querySelector('#typed-word');

function getAnagrams() {
    const inputText = inputEle.value;
    console.log(inputText);
    if (inputText) {
        const combinations = getAllCombinations(inputText);
        outputEle.innerHTML = combinations.map(e => `<span class="anagram">${e}</span>`).join('<br />');
        outputContainerEle.style.visibility = 'visible';
        noInputContainerEle.style.visibility = 'hidden';
        typedWordEle.innerHTML = inputText.toUpperCase();
        countEle.innerHTML = combinations.length;
    } else {
        outputEle.innerHTML = '';
        outputContainerEle.style.visibility = 'hidden';
        noInputContainerEle.style.visibility = 'visible';
    }
}

const getAllCombinations = (str) => {
    let letters = str.toUpperCase().split(''),
        results = [
            [letters.shift()]
        ]
    while (letters.length) {
        const currLetter = letters.shift()
        let tmpResults = []
        results.forEach(result => {
            let rIdx = 0
            while (rIdx <= result.length) {
                const tmp = [...result]
                tmp.splice(rIdx, 0, currLetter)
                tmpResults.push(tmp)
                rIdx++
            }
        })
        results = tmpResults
    }
    return results
        .map(letterArray => letterArray.join(''))
        .filter((el, idx, self) => (self.indexOf(el) === idx))
        .sort()
}


getAnagrams();
inputEle.addEventListener('input', getAnagrams);