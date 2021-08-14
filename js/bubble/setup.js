let labelSize, valueSize, labelTrans, small;

if(window.innerWidth >= 768){
  labelTrans = 20;
  labelSize = '1em';
  valueSize = '2em';
  small = false;
} else {
  labelSize = '0.5em';
  valueSize = '1em';
  labelTrans = 13;
  small = true;
}


const countryNamesSmall = (label) => {
  label
    .transition()
        .duration(1000)
        .attr('opacity', 0)
        .attr('transform', (d) => `translate(${d.x - d.r / 2}, ${d.y - labelTrans})`)
        .attr('font-size', labelSize);
}

const countryValueSmall = (value) => {
  value
    .text((d) => {
        if (d.value > 0) {
          return d.value.toFixed() + '%';
        }
      })
      .transition()
      .duration(1000)
      .attr('transform', (d) => `translate(${d.x - d.r / 2}, ${d.y})`)
      .attr('font-size', valueSize * 0.8)
}

const reportedToSize = value => {
  value
    .text((d) => {
      if (d.value > 0) {
        return d.value.toFixed() + '%';
      }
    })
    .transition()
    .duration(1000)
    .attr('transform', (d) => `translate(${d.x}, ${d.y + labelTrans/2})`)
    .attr('font-size', valueSize)
    .attr('font-family', 'Bebas Neue');
}

const reportedToSmall = (value) => {
  value 
    .text((d) => {
      if (d.value > 0) {
        return d.value.toFixed() + '%';
      }
    })
    .transition()
    .duration(1000)
    .attr('transform', (d) => `translate(${d.x - d.r/4}, ${d.y - d.r/2})`)
    .attr('font-size', labelSize)
    .attr('font-family', 'Bebas Neue');
}