// !--------------------------------------------------------------data content below

// unversal switches
let invisibleGender = []; //"m"
let invisibleType = []; //"physical"

// data
let full;
let filtered;
let inputs;

let key = [
  'Afraid of losing job',
  'Afraid of negative impact',
  "Afraid I wouldn't be believed",
  'No reporting mechanisms',
  "Didn't know how to report",
  "No evidence",
  'Afraid perp would retaliate',
  "Didn't want to be labeled",
  "Not a big deal",
  'Offered something by perp',
  'Other',
];

let switches = allSwitches[4].querySelectorAll(
  '.form-check-input'
);
// document.querySelector("#reasons-not > dv:nth-child(2) > label > input[type=checkbox]")

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
d3.csv('data/reason-not-reported.csv')
  .then((data) => {
    full = data;
  })
  .then((d) => {
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

  inputs = finalFilter(filtered, key, '#reasons-not-reported-div');
  const sample = samples[4]
  sample.innerText = inputs.sumTotal
  update(inputs.newData, inputs.sumTotal);
};

// !----------------------------------------------------------graph content below

const canvas = document.querySelector('.canvas_v');

let divider;
if(!md && !lg){
  divider = 3;
} else if (md || lg){
  divider = 5;
}
const dims = {
  height: canvas.offsetHeight,
  width: canvas.offsetWidth,
  radius: canvas.offsetWidth / divider,
  fontFamily: 'Alegreya Sans'
};
const cent = { x: dims.width / 2, y: dims.radius + 20 };

const svg = d3
  .select('.canvas_v')
  .append('svg')
  .attr('width', dims.width + 150)
  .attr('height', dims.height + 150);

const graph = svg
  .append('g')
  .attr('transform', `translate(${cent.x}, ${cent.y})`);

const pie = d3
  .pie()
  .sort(null)
  .value((d) => d.value);

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 3);

const color = d3.scaleOrdinal([
  '#ffffd9',
  '#edf8b1',
  '#c7e9b4',
  '#7fcdbb',
  '#41b6c4',
  '#1d91c0',
  '#225ea8',
  '#253494',
  '#081d58',
  '#00183e',
  '#00122e',
]);

// legend setup
const legendGroup = svg
  .append('g')
  .attr(
    'transform',
    (d) => `translate(${50}, ${dims.radius * 2 + 60})`
  );

  let padding;
  if (!lg){
    padding = 5
  } else {
    padding = 10;
  }
const legend = d3.legendColor().shape('circle').shapePadding(padding).scale(color);

const tip = d3
  .tip()
  .attr('class', 'd3-tip card center-align')
  .html((event, d) => {
    let content = `<dv><h3>${d.data.value.toFixed(1)}%</h3></dv>`;
    return content;
  });

graph.call(tip);

const update = (data, sumTotal) => {
  // update the number of samples
  // d3.select('#total-sample').html(sumTotal);

  // update color scale domain
  color.domain(data.map((d) => d.key)); //create an array of keys from the data

  // update and call the legend
  legendGroup.call(legend);

  legendGroup
    .selectAll('text')
    .data(pie(data))
    .attr('fill', 'white')
    .attr('font-size', keyFS*0.7 + 'em')
    .each(function (d) {
      assignClass(d.data.key, this);
    });

  legendGroup
    .selectAll('rect')
    .data(pie(data))
    .attr('stroke', '#0C3280')
    .attr('stroke-width', '2px')
    .each(function (d) {
      assignClass(d.data.key, this);
    });

  // join enhanced (pie) data to path elements
  const paths = graph.selectAll('path').data(pie(data));

  // make a smooth exit
  paths.exit().transition().duration(750).attrTween('d', arcTweenExit).remove();

  // update the current shapes
  paths
    .attr('d', arcPath)
    .transition()
    .duration(750)
    .style('opacity', 1)
    .attrTween('d', arcTweenUpdate);

  // add new shapes
  paths
    .enter()
    .append('path')
    .attr('class', 'arc')
    .attr('stroke', '#0C3280')
    .attr('stroke-width', '2px')
    .attr('fill', (d) => color(d.data.key))
    .each(function (d) {
      this._current = d;
    })
    .each(function (d) {
      assignClass(d.data.key, this);
    })
    .transition()
    .duration(1000)
    .attrTween('d', archTweenEnter);

  // add events
  graph
    .selectAll('path')
    .on('mouseover', (e, d) => {
      tip.show(e, d);
      handleMouseOver(e.target, d);
    })
    .on('mouseout', (e, d) => {
      tip.hide();
      handleMouseOut(e.target, d);
    });

  legendGroup
    .selectAll('text')
    .on('mouseover', (e, d) => {
      handleMouseOverLeg(e.target, d);
    })
    .on('mouseout', (e, d) => {
      handleMouseOutLeg(e.target, d);
    });
};

// tween exit
const arcTweenExit = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);
  return (t) => {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

// tween update
function arcTweenUpdate(d) {
  let i = d3.interpolate(this._current, d);
  this._current = d;
  return (t) => arcPath(i(t));
}

// tween enter
const archTweenEnter = (d) => {
  let i = d3.interpolate(d.endAngle, d.startAngle);
  return (t) => {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

// event handlers
const handleMouseOver = (target, d) => {
  d3.selectAll('.arc').style('opacity', 0.3);

  d3.select(target)
    .transition('changeSliceFill')
    .duration(300)
    .attr('fill', '#FFB000')
    .style('opacity', 1);

  target.classList.forEach((name) => {
    if (name.includes('item')) {
      d3.selectAll(`text.${name}`).attr('fill', '#FFB000');
      d3.selectAll(`rect.${name}`)
        .style('fill', '#FFB000')
        .attr('stroke', '#FFB000');
    }
  });
};

const handleMouseOverLeg = (target, d) => {
  d3.select(target).attr('fill', '#FFB000');

  target.classList.forEach((name) => {
    if (name.includes('item')) {
      d3.selectAll(`path.${name}`).attr('fill', '#FFB000');
      d3.selectAll(`rect.${name}`)
        .style('fill', '#FFB000')
        .attr('stroke', '#FFB000');
    }
  });
};

const handleMouseOut = (target, d) => {
  d3.select(target)
    .transition('changeSliceFill')
    .duration(300)
    .attr('fill', color(d.data.key));

  target.classList.forEach((name) => {
    if (name.includes('item')) {
      d3.selectAll(`text.${name}`).attr('fill', 'white');
      d3.selectAll(`rect.${name}`)
        .style('fill', color(d.data.key))
        .attr('stroke', '#0C3280');
    }
  });

  d3.selectAll('.arc').style('opacity', 1);
};

const handleMouseOutLeg = (target, d) => {
  d3.select(target).attr('fill', '#FFFFFF');

  target.classList.forEach((name) => {
    if (name.includes('item')) {
      d3.selectAll(`path.${name}`).attr('fill', color(d.data.key));
      d3.selectAll(`rect.${name}`)
        .style('fill', color(d.data.key))
        .attr('stroke', '#0C3280');
    }
  });
};

const assignClass = (name, item) => {
  let index;
  for (let i = 0; i < inputs.newData.length; i++) {
    if (inputs.newData[i].key === name) {
      index = inputs.newData.indexOf(inputs.newData[i]);
    }
  }
  // console.log('item', index)
  item.classList.add(`item-${index}`);
};
