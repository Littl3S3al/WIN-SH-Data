// bubble colours
const color = d3.scaleOrdinal(['#2EB5C3', '#2EB5C3', '#FFB000', '#FF4700'])

// doc variables
let switches = document.querySelectorAll('input.form-check-input')

// set viewable data
let perspective = 'africa'

// set base data variable
let baseData

// track gender and type that is on
let gender = ['f', 'm', 'n']
let type = ['v', 'p']
let reported = true
let action = true

//   spans inside of the homepage to be updated
const locationSpan = document.querySelector('#location-value')
const participantsSpan = document.querySelector('#participants-value')
const prevalenceSpan = document.querySelector('#prevalence-value')
const reportedSpan = document.querySelector('#reported-value')
const actionSpan = document.querySelector('#action-value')

// key for each region
let globalKey = ['africa', 'sea', 'russia']
let africaKey = ['botswana', 'kenya', 'malawi', 'rwanda', 'tanzania', 'uganda', 'zambia', 'zimbabwe']
let seaKey = ['tanzania', 'uganda', 'zambia', 'zimbabwe']


// get container
const container = document.querySelector('.canvas')
const width = container.clientWidth - 30
const height = container.offsetHeight
