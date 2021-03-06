// universal switches
let invisibleGender = []; //"m"
let invisibleType = []; //"physical"

// data
let full;
let filtered;

let switches = allSwitches[5].querySelectorAll(
  '.form-check-input'
);


let key = [
  'Fellow employee',
  'Direct supervisor',
  'Higher management',
  'News source',
  'Other',
];

// ?dealing with html
switches.forEach((input) => {
  input.addEventListener('click', () => {
    if (input.name === 'type') {
      invisibleType = filterArray(input, invisibleType);
    }
    if (input.name === 'gender') {
      invisibleGender = filterArray(input, invisibleGender);
    }
    switchesCheck(input, switches, invisibleGender, invisibleType)
    filterData(full, invisibleGender, invisibleType);
  });
});

function filterArray(input, array) {
  if (!input.checked) {
    array.push(input.value);
  } else {
    array = array.filter((item) => item !== input.value);
  }
  return array;
}

// *calling data
d3.csv('data/perpetrator.csv')
  .then((data) => {
    full = data;
  })
  .then(() => {
    filterData(full, invisibleGender, invisibleType);
  });

  window.addEventListener('storage', () => {
    filterData(full, invisibleGender, invisibleType)
  })

// function to filter the data
const filterData = (data, gender, type) => {
  // filter full data by country if not region
  // filter full data by country if not region
  if (selected !== 'africa') {
    filtered = data.filter((d) => d.country === selected);
  } else {
    filtered = data;
  }
  // filter out unneeded gender and type
  invisibleGender.forEach((gender) => {
    filtered = filtered.filter((d) => d.gender !== gender);
  });
  invisibleType.forEach((type) => {
    filtered = filtered.filter((d) => d.type !== type);
  });

  let inputs = finalFilter(filtered, key, '#who-perp-div');
  const sample = samples[5]
  sample.innerText = inputs.sumTotal;
  update(inputs.newData, inputs.sumTotal);
};

// !-------------------------------graph

const canvas = document.querySelector('.canvas_vi');

let flexiMarg;
if (!md || lg){
  flexiMarg = canvas.offsetWidth*0.3;
} else if(md){
  flexiMarg = canvas.offsetWidth*0.2;
}  

const dims = {
  height: canvas.offsetHeight,
  width: canvas.offsetWidth,
  marginLeft: flexiMarg,
  marginRight: 30,
  marginTop: 50,
  fontFamily1: 'Bebas Neue',
  fontFamily2: 'Alegreya Sans'
};

const myRatio = Math.round(colourScale.length/key.length)
let myColours = [];
for(let i=0; i < key.length; i++){
  myColours.push(colourScale[i * myRatio])
}

const color = d3.scaleOrdinal(myColours);

const graphWidth = dims.width - dims.marginLeft - dims.marginRight;
const graphHeight = dims.height - dims.marginTop * 2;

const svg = d3
  .select('.canvas_vi')
  .append('svg')
  .attr('width', dims.width)
  .attr('height', dims.height);

const graph = svg
  .append('g')
  .attr('transform', `translate(${dims.marginLeft}, ${dims.marginTop/2})`);

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

// scales
const y = d3
  .scaleBand()
  .range([0, graphHeight])
  .paddingInner(0.2)
  .paddingOuter(0.2);

const x = d3.scaleLinear().range([0, graphWidth]);

// create the axes
const xAxis = d3
  .axisBottom(x)
  .ticks(5)
  .tickFormat((d) => d + '%');
const yAxis = d3
  .axisLeft(y)
  .ticks(4)
  .tickFormat((d) => d);

const tip = d3
  .tip()
  .attr('class', 'd3-tip card center-align')
  .html((event, d) => {
    let content = `<div><h3>${d.value.toFixed(1)}%</h3></div>`;
    return content;
  });

graph.call(tip);

// !update function
const update = (data, sumTotal) => {
  //   data = data.sort((a, b) => d3.descending(a.value, b.value));
  // updating scale domains
  x.domain([0, d3.max(data, (d) => d.value)]);
  y.domain(data.map((item) => item.key));

  // join data to rects
  const rects = graph.selectAll('rect').data(data);

  // remove exit selection
  rects.exit().remove();

  // update the current shapes
  rects
    .attr('x', x(0))
    .attr('y', (d) => y(d.key))
    .attr('height', y.bandwidth())
    .attr('fill', (d) => color(d.key))
    .transition()
    .duration(500)
    .attr('width', (d) => x(d.value));

  // append the enter selection to the dom
  rects
    .enter()
    .append('rect')
    .attr('x', x(0))
    .attr('y', (d) => y(d.key))
    .attr('width', 0)
    .attr('height', y.bandwidth())
    .attr('fill', (d) => color(d.key))
    .transition()
    .duration(500)
    .attr('width', (d) => x(d.value));

  // call the axes
  xAxisGroup.transition().duration(1000).call(xAxis);
  yAxisGroup.transition().duration(1000).call(yAxis);

  xAxisGroup
    .selectAll('text')
    .attr('fill', 'white')
    .attr('font-family', dims.fontFamily1)
    .attr('font-size', valueFS);

  d3.selectAll('path.domain').attr('stroke', 'none');
  d3.selectAll('.tick').attr('color', 'white');
  yAxisGroup
    .selectAll('.tick')
    .attr('color', 'white')
    .append('line')
    .attr('x1', '10')
    .attr('x2', graphWidth)
    .attr('y1', 0)
    .attr('y2', 0)
    .attr('stroke', 'white')
    .attr('stroke-dasharray', '2, 10');
  yAxisGroup
    .selectAll('text')
    .attr('font-family', dims.fontFamily2)
    .attr('font-size', labelFS);

  graph
    .selectAll('rect')
    .on('mouseover', function (e, d) {
      tip.show(e, d);
      graph.selectAll('rect').transition().duration(200).style('opacity', 0.5);
      d3.select(e.target)
        .transition()
        .duration(200)
        .attr('fill', '#ffb000')
        .style('opacity', 1);
    })
    .on('mouseout', function (e, d) {
      tip.hide();
      graph.selectAll('rect').transition().duration(200).style('opacity', 1);
      d3.select(e.target).attr('fill', (d) => color(d.key));
    });
};
