const dropdown = document.querySelector('.dropdown-menu');
const display = document.querySelector('#selected-country');
let selected = 'africa';

let current = window.localStorage.getItem('country')

dropdown.addEventListener('click', e => {
    selected = e.target.innerText.toLowerCase();
    display.innerText = selected;
    window.localStorage.setItem('country', selected)
    console.log(window.localStorage.getItem('country'))
})


if(!current){
    window.localStorage.setItem('country', 'africa')
} if (current){
    display.innerText = current;
}