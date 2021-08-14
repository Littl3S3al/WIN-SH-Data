let bubbleData;
let positionData;

// data visualisation function
const updateVis = (data) => {

  pack = d3
    .pack()
    .size([width - 50, height - 50])
    .padding(15);

  positionData = pack(data).descendants();

  bubbleData = positionData.filter(
    (d) => d.data.name !== 'not_reported' && d.data.name !== 'no action-taken'
  );

  if (!switches[5].checked) {
    bubbleData = bubbleData.filter((d) => d.data.name !== 'action-taken');
    bubbleData = bubbleData.filter((d) => d.data.name !== 'reported');
  } else if (!switches[6].checked) {
    bubbleData = bubbleData.filter((d) => d.data.name !== 'action-taken');
  }

  function getAfrica() {
    let Countries = bubbleData.filter(data => data.depth === 1)
    let Africa = bubbleData[0].value/Countries.length
    africaSpan.innerText = Africa.toFixed(0);
  }
  getAfrica()

  let nodes = graph.selectAll('circle').data(bubbleData);

  let names = graph.selectAll('.names').data(bubbleData);

  let values = graph.selectAll('.values').data(bubbleData);

  nodes
    .exit()
    .transition()
    .duration(1000)
    .attrTween('r', bubTweenExit)
    .remove();

  nodes
    .transition()
    .duration(1000)
    .attr('r', (d) => d.r)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

  nodes
    .enter()
    .append('circle')
    .each(function (d) {
      this._current = d;
    })
    .attr('id', (d) => d.name)
    .attr('class', 'circle')
    .attr('fill', (d) => {
      if (d.depth === 0 || d.value === 0) {
        return 'none';
      } else {
        return color(d.depth);
      }
    })
    .attr('stroke', (d) => {
      if (d.depth === 0) {
        return color(d.depth);
      }
    })
    .attr('stroke-width', 2)
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
    .transition()
    .duration(1000)
    .attrTween('r', bubTweenEnter);

    d3.selectAll('circle')
    .attr("pointer-events", d => d.height !== 2 ? "none" : null)
    .on("mouseover", function() { d3.select(this).attr("stroke", "#fff"); d3.select(this).attr("cursor", "pointer")})
    .on("mouseout", function() { d3.select(this).attr("stroke", null); })

  names.exit().remove();
  values.exit().remove();

  

  // adjust current values text to animate
  if (reported && action) {

    let country_names = d3.selectAll('.country-name');
    countryNamesSmall(country_names)  

    let country_values = d3.selectAll('.country');
    countryValueSmall(country_values)
      
    let reported_values = d3.selectAll('.reported');
    reportedToSmall(reported_values)
      
    
  } else if (reported && !action) {
    let country_names = d3.selectAll('.country-name');
    countryNamesSmall(country_names);

    let country_values = d3.selectAll('.country');
    countryValueSmall(country_values);

    let reported_values = d3.selectAll('.reported');
    reportedToSize(reported_values)
      
  } else {
    names
      .transition()
      .duration(1000)
      .attr('font-size', labelSize)
      .attr('transform', (d) => `translate(${d.x}, ${d.y - labelTrans})`);
    values
      .text((d) => {
        if (d.value > 0) {
          return d.value.toFixed() + '%';
        }
      })
      .transition()
      .duration(700)
      .attr('font-size', valueSize)
      .attr('transform', (d) => `translate(${d.x}, ${d.y + labelTrans/2})`)
      .attr('font-family', 'Bebas Neue');
  }

  if (!reported) {
    names
      .enter()
      .append('text')
      .attr('class', (d) => {
        if (d.depth === 1) {
          return 'names country-name';
        } else {
          return 'names';
        }
      })
      .attr('text-anchor', 'middle')
      .attr('id', (d) => d.data.name)
      .attr('font-size', labelSize)
      .attr('fill', '#fff')
      .style('opacity', 0)
      .attr('transform', (d) => `translate(${d.x}, ${d.y - labelTrans})`)
      .text((d) => {
        let name = d.data.name;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
      })
      .transition()
      .duration(1500)
      .styleTween('opacity', () => {
        let i = d3.interpolate(0, 1);
        return (t) => i(t);
      });
  }

  values
    .enter()
    .append('text')
    .attr('class', (d) => {
      if (d.depth === 1) {
        return `values ${d.data.name} country`;
      } else {
        return `values ${d.data.name}`;
      }
    })
    .attr('text-anchor', 'middle')
    .attr('id', (d) => `value-${d.data.name}`)
    .attr('transform', (d) => {
        return `translate(${d.x}, ${d.y + labelTrans/2})`;
    })
    .attr('fill', '#fff')
    .attr('font-size', (d) => {
      if (d.data.name === 'reported' && action) {
        return labelSize;
      } else if (d.data.name === 'action-taken') {
        return labelSize;
      } else {
        return valueSize;
      }
    })
    .attr('font-family', 'Bebas Neue')
    .text((d) => {
      if (d.value > 0) {
        return d.value.toFixed() + '%';
      }
    })
    .style('opacity', 0)
    .transition()
    .duration(1700)
    .styleTween('opacity', () => {
      let i = d3.interpolate(0, 1);
      return (t) => i(t);
    });
    
};

// tweens

// tween for entry of bubbles
const bubTweenEnter = (d) => {
  let i = d3.interpolate(0, d.r);
  return (t) => {
    d.r = i(t);
    return d.r;
  };
};

// tween for exit of bubbles
const bubTweenExit = (d) => {
  let i = d3.interpolate(d.r, 0);
  return (t) => {
    d.r = i(t);
    return d.r;
  };
};

// tween for moving
function translateTween(d) {
  let startPos = `translate(${this._current.data.x}, ${this._current.data.y})`;
  let endPos = `translate(${d.x}, ${d.y})`;

  let i = d3.interpolate(startPos, endPos);
  // update the _current prop with new updated data
  this._current = d;
  return (t) => i(t);
}

// function for zooming

svg.call(
  d3
    .zoom()
    .extent([
      [0, 0],
      [width, height],
    ])
    .scaleExtent([1, 5])
    .on('zoom', zoomed)
);

function zoomed({ transform }) {
  svg.attr('transform', transform);
}

let zoomSettings = {
  duration: 1000,
  ease: d3.easeCubicOut,
  zoomLevel: 5
}
