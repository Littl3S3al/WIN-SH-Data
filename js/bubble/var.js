let container, width, height, svg, graph, pack, africaSpan;

const resizeEvent = () => {
  container = document.querySelector('#data-container');

  width = container.offsetWidth;
  height = container.offsetHeight;

  svg = d3
    .select('.canvas')
    .append('svg')
    .attr('transform-origin', '0 0')
    .attr('viewBox', `0 0 ${width} ${height}`);

  graph = svg.append('g').attr('transform', 'translate(25, 25)');

};

resizeEvent();

// bubble variables
const color = d3.scaleOrdinal(['#2EB5C3', '#2EB5C3', '#FFB000', '#FF4700']);

//  data variables
let compiledData, rootData;

// doc variables
let switches = document.querySelectorAll('input.form-check-input');

// track gender and type that is on
let gender = ['f', 'm', 'n'];
let type = ['v', 'p'];
let reported,
  action;

  africaSpan = document.querySelector('#Africa-Value')