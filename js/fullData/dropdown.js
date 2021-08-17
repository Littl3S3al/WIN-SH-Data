const dropdown = document.querySelector('.dropdown-menu');
const display = document.querySelector('#selected-country');
let selected = 'africa';

let current = window.localStorage.getItem('country')

dropdown.addEventListener('click', e => {
    selected = e.target.innerText.toLowerCase();
    display.innerText = selected;
    window.localStorage.setItem('country', selected);
    window.dispatchEvent( new Event('storage') )
})


if(!current){
    window.localStorage.setItem('country', 'africa')
} if (current){
    display.innerText = current;
}


let allSwitches = document.querySelectorAll('.switch-container');
let samples = document.querySelectorAll('.sample')
let allCanvas = document.querySelectorAll('.canvas')

let screenW = window.screen.width;
let valueFS = '1.5em';
let labelFS = '1em';

if(screenW >= 768 && screenW < 1200){
    valueFS = '2em';
    labelFS = '1.5em';
} else if(screenW >= 1200){
    valueFS = '2em';
    labelFS = '2em';
}
