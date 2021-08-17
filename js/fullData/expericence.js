// universal switches
let invisibleGender = []; //"m"
let invisibleType = []; //"physical"

// data
let full;
let filtered;

let switches = allSwitches[0].querySelectorAll(
  '.form-check-input'
);


// this is where our local storage event listener is going to go

let key = ['Never', 'Once', '2-4 Times', '5 or more', 'unsure'];

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
d3.csv('data/experience.csv')
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

  let inputs = finalFilter(filtered, key, '#experience-div');
  const sample = samples[0];
  sample.innerText = inputs.sumTotal
  update(inputs.newData, inputs.sumTotal);
};

// !-------------------------------graph

const canvas = document.querySelector('.canvas_i');

const dims = {
  height: canvas.offsetHeight,
  width: canvas.offsetWidth,
  marginLeft: 40,
  marginTop: 50,
  fontFamily1: 'Bebas Neue',
  fontFamily2: 'Alegreya Sans'
};

const color = d3.scaleOrdinal([
  '#ffffcc',
  '#a1dab4',
  '#41b6c4',
  '#2c7fb8',
  '#253494',
]);

const graphWidth = dims.width - dims.marginLeft * 2;
const graphHeight = dims.height - dims.marginTop * 2;

const svg = d3
  .select('.canvas_i')
  .append('svg')
  .attr('width', dims.width)
  .attr('height', dims.height);

const graph = svg
  .append('g')
  .attr('transform', `translate(${dims.marginLeft *1.3}, ${dims.marginTop/2})`);

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

// scales
const y = d3.scaleLinear().range([graphHeight, 0]);

const x = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

// create the axes
const xAxis = d3.axisBottom(x).ticks(null);
const yAxis = d3
  .axisLeft(y)
  .ticks(yTicks)
  .tickFormat((d) => d + '%');

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

  // updating scale domains
  y.domain([0, d3.max(data, (d) => d.value + yPad)]);
  x.domain(data.map((item) => item.key));

  // join data to rects
  const rects = graph.selectAll('rect').data(data);

  // remove exit selection
  rects.exit().remove();

  // update the current shapes
  rects
    .attr('width', x.bandwidth)
    .attr('fill', (d) => color(d.key))
    .attr('x', (d) => x(d.key))
    .transition()
    .duration(500)
    .attr('x', (d) => x(d.key));

  // append the enter selection to the dom
  rects
    .enter()
    .append('rect')
    .attr('fill', (d) => color(d.key))

    .attr('y', graphHeight)
    .merge(rects)
    .attr('width', x.bandwidth())
    .attr('x', (d) => x(d.key))
    .transition()

    .duration(1500)

    .attr('y', (d) => y(d.value))
    .attr('height', (d) => graphHeight - y(d.value));

  // call the axes
  xAxisGroup.transition().duration(1000).call(xAxis);
  yAxisGroup.transition().duration(1000).call(yAxis);

  xAxisGroup
    .selectAll('text')
    .attr('fill', 'white')
    .attr('font-family', dims.fontFamily2)
    .attr('font-size', labelFS);

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
    .attr('font-family', dims.fontFamily1)
    .attr('font-size', valueFS);

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