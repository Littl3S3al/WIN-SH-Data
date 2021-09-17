// temp variables
const labelSize = 15
const labelFont = 'Alegreya Sans'
const valueSize = 20
const valueFont = 'Bebas Neue'
const fontColor = 'white'
const transDown = 20
const transUp = 30


let centered;
let isZoom = false;

const svg = d3.select('.canvas')
        .append('svg')
        .attr('transform-origin', '0 0')
        .attr('viewBox', `0 0 ${width} ${height}`)

const graph = svg.append('g')

var defs = svg.append("defs");

//Create a radial Sun-like gradient
defs.append("radialGradient")
    .attr("id", "teal-gradient")
    .attr("cx", "50%")	//not really needed, since 50% is the default
    .attr("cy", "50%")	//not really needed, since 50% is the default
    .attr("r", "50%")	//not really needed, since 50% is the default
    .selectAll("stop")
    .data([
            {offset: "0%", color: "rgba(0, 0, 0, 0)"},
            {offset: "80%", color: "rgba(46, 180, 195, 0.1)"},
            {offset: "100%", color: "rgba(46, 180, 195, 0.5)"}
        ])
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })
    .attr("stop-color", function(d) { return d.color; });



    let myCountry = null;

function bubbles (finalData, perCountryData) {

    
    setUpTip(myCountry, perCountryData, 'not-clicked')

    const stratify = d3.stratify()
    .id(d => d.name)
    .parentId(d => d.parent)


    const rootNode = stratify(finalData)
        .sum(d => d.value)

    const pack = d3.pack()
        .size([width - 50, height])
        
        

    let bubbleData = pack(rootNode).descendants()

    if(!action){
        bubbleData.forEach((d, i) => {
            if(d.height === 0){bubbleData[i].r = 0}
        })
    }
    if(!reported){
        bubbleData.forEach((d, i) => {
            if(d.height === 1){bubbleData[i].r = 0}
            if(d.height === 0){bubbleData[i].r = 0}
        })
    }
 
    
    // bubbleData.forEach(bubble => {if(bubble.height === 3) {console.log(bubble.id, bubble.value, bubble.data.participants)}})
    // *adding circles
    const nodes = graph.selectAll('circle')
        .data(bubbleData)

        nodes
        .enter()
        .append('circle')
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
        .attr('class', d => d.data.trueName)
        .attr('fill', d => {
            if(d.height === 4){ return "rgba(0, 0, 0, 0)"}
            if(d.height === 3) {
                if(reported || action){return 'rgba(46, 180, 195, 0.3)'}
                else{return '#2eb5c3'}
            }
            if(d.height === 1) {{
                if(action){return 'rgba(255, 174, 0, 0.3)'}
                else{return '#ffb000'}
            }}
            if(d.height === 0) {return '#ff4700'}
            else{return 'none'}
        })
        .attr('stroke-width', 1)
        .attr('stroke', d => {
            if(d.height !== 4){
                return '#fff'
            }
        })
        .on('mouseover',function(d) {mouseover(d3.select(this), d3.select(this).attr('class'))})
        .on('mouseout',function() {mouseout(d3.select(this), d3.select(this).attr('class'))})
        .on('click', function(d, i){clicked(i, d3.select(this), d3.select(this).attr('class'))})
        .transition()
        .duration(1000)
        .attrTween('r', bubTweenEnter);

        nodes
        .exit()
        .transition()
        .duration(1000)
        .attrTween('r', bubTweenExit)
        .remove();

        nodes
        .transition()
        .duration(1000)
        .attr('fill', d => {
            if(d.height === 4){ return "rgba(0, 0, 0, 0)"}
            if(d.height === 3) {
                if(reported){return 'rgba(46, 180, 195, 0.3)'}
                else{return '#2eb5c3'}
            }
            if(d.height === 1) {{
                if(action){return 'rgba(255, 174, 0, 0.3)'}
                else{return '#ffb000'}
            }}
            if(d.height === 0) {return '#ff4700'}
            else{return 'none'}
        })
        .attr('r', (d) => d.value ? d.r : 0)
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`);
        

        // *adding country names
        const labels = graph.selectAll('.label')
            .data(bubbleData)


        labels
        .enter()
        .append('text')
        .on('mouseover',function(d) {console.log(d3.select(this))})
        .attr('class', 'label')
        .attr('font-family', labelFont)
        .attr('font-size', labelSize )
        .attr('fill', fontColor)
        .attr('font-weight', 500)
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
        .attr('text-anchor', 'middle')
        .text(d => {if(d.height === 3){return d.data.trueName.toUpperCase()}})

        
        labels
        .transition()
        .duration(1000)
        .attr('transform', (d) => {
            if(!reported){ return `translate(${d.x}, ${d.y})`}
            else{ return `translate(${d.x}, ${d.y - transUp})`}
        })
        .text(d => {if(d.height === 3  && d.value){return d.data.trueName.toUpperCase()}})

        // *adding country values
        const values = graph.selectAll('.value')
            .data(bubbleData)

            
        values
        .enter()
        .append('text')
        .attr('class', 'value')
        .attr('font-family', valueFont)
        .attr('font-size', valueSize )
        .attr('fill', fontColor)
        .attr('transform', (d) => `translate(${d.x}, ${d.y + transUp*0.7})`)
        .attr('text-anchor', 'middle')
        .text(d => {if(d.height === 3){return Math.round(d.value * 100) + '%'}})

        
        values
        .transition()
        .duration(1000)
        .text(d => {if(d.height === 3  && d.value){
            if(action){return getValue(d.data.trueName, 'action') + '%'}
            else if (reported && !action){return getValue(d.data.trueName, 'reported') + '%'}
            else{return getValue(d.data.trueName, '') + '%'}
        }})
        .attr('transform', (d) => {
            if(!reported){return `translate(${d.x}, ${d.y + transUp*0.7})`}
            else {return `translate(${d.x}, ${d.y - transUp/3})`}
        })


        const cover = graph.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'red')
        .attr('opacity', 0)

        setTimeout(() =>{
            cover.remove()
        }, 1000)


}

// tween for entry of bubbles
const bubTweenEnter = (d) => {
    let i;
    if(d.height === 4){i = d3.interpolate(0, width/1.5)}
    else{i = d3.interpolate(0, d.r)}
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


//   when the node is clicked
  function clicked (i, node, className) {
    let x, y, k;

    if(i && !centered && !isZoom && className){
        setUpTip(className, perCountryData, 'clicked')
        myCountry = className;
        let scaleH = 2;
        x = i.x;
        y = i.y - i.r;
        k = scaleH;
        centered = true;
        isZoom = true;
        window.localStorage.setItem('country', className);
    } else {
        setUpTip(null, perCountryData, null)
        x = width/2;
        y = height/2;
        k = 1;
        centered = false;
        isZoom = false
        const circles = d3.selectAll('circle')
        mouseout(circles)
        window.localStorage.setItem('country', 'africa');
    }

    graph.transition()
    .duration(750)
    .attr('transform', `translate(${width/2}, ${height/2}) scale(${k}) translate(${+-x}, ${+-y})`)
}

// when node is mouseover
function mouseover(node, className){
    if(!isZoom  && className){
        node
        .transition()
        .duration(300)
        .attr('stroke-width', '4')
        .attr('cursor', 'pointer')
        setTimeout(() => {
            node
            .transition()
            .duration(300)
            .attr('stroke-width', '1')
        }, 3000)
    }
}

// when node is mouseout
function mouseout(node, className){
    if(!isZoom && className){
        node
        .transition()
        .duration(300)
        .attr('stroke-width', '1')
        .attr('cursor', 'default')
    }

}


function getValue(location, type){
    let index = perCountryData.findIndex(x => x.location === location)
    if(type === 'action'){
        let newValue =  Math.round(perCountryData[index].action)
        return newValue ? newValue : 0
    }
    else if(type === 'reported'){
        let newValue =  Math.round(perCountryData[index].reported)
        return newValue ? newValue : 0
    }
    else{
        let newValue = Math.round(perCountryData[index].experienced)
        return newValue ? newValue : 0
    }
}