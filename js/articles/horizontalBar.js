if(window.innerWidth >= 992){
  trans = 1;
  labelSize = '2em';
  valueSize = '2em';
  small = false;
} else if (window.innerWidth >= 768){
  labelSize = '1.5em';
  valueSize = '1em';
  trans = 0.6;
  small = true;
} else {
  labelSize = '1.5em';
  valueSize = '1em';
  trans = 0.6;
  small = true;
}


let horizontalBar = (data, selector, dataCat,  colour1, colour2, key, left) => {
const canvas = document.querySelector(selector)
// set the dimensions and margins of the graph
var margin = {top: 20, right: 70 *trans, bottom: 40, left: left * trans},
    width = canvas.offsetWidth - margin.left - margin.right,
    height = canvas.offsetHeight - margin.top - margin.bottom;


// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);
          
var svg = d3.select(canvas).append("svg")
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", `gradient-${dataCat}`)
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("spreadMethod", "pad");

let myGradientId = `url(#gradient-${dataCat})`
    gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", () => colour1)

    gradient.append("svg:stop")
    .attr("offset", "70%")
    .attr("stop-color", () => colour2)


  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d[dataCat]; })])
  y.domain(data.map(function(d) { return d[key] }));
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  svg.selectAll("rect")
      .data(data)
    .enter().append("rect")
    .attr("y", function(d) { return y(d[key]); })
      .attr("height", y.bandwidth())
      .attr('fill', myGradientId)
      .attr('stroke', 'white')
      .attr('stroke-width', '3px')
    .transition()
    .duration(1000)
      .attr("width", function(d) {return x(d[dataCat]); } )
      

  // add the x Axis
  const xAxisGroup = 
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      
      const xAxis = d3
      .axisBottom(x)
      .ticks(6)
      .tickFormat((d) => d + '%');

    xAxisGroup.transition().duration(1000).call(xAxis);

    xAxisGroup
    .selectAll('text')
    .attr('font-family', 'Bebas Neue')
    .attr('font-size', valueSize);

    xAxisGroup.selectAll('.tick')
    .append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', -height - 10)
    .attr('stroke', 'black')
    .attr('stroke-dasharray', '2, 10');

  // add the y Axis
  const yAxisGroup = svg.append('g');

  const yAxis = d3
  .axisLeft(y)
  .ticks(4)
  .tickFormat((d) => d);

  yAxisGroup.transition().duration(1000).call(yAxis);

  yAxisGroup
    .selectAll('text')
    .attr('font-family', 'Bebas Neue')
    .attr('font-size', labelSize)
    .attr('fill', colour1);
    d3
    .selectAll('path.domain').attr('stroke', 'none');
}

let clearCanvas = (selector) => {
  
    d3.select(selector).select('svg').remove();
}