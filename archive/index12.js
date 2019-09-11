const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);


//create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 }
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left},${margin.top})`)





// Axis by group
const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0,${graphHeight})`);
const yAxisGroup = graph.append('g');



//scales

const y = d3.scaleLinear()
  .range([graphHeight, 0])

const x = d3.scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

// create the axis
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y)
  .ticks(3)
  .tickFormat(d => d + ' orders');


// transform axis text

xAxisGroup.selectAll('text')
  .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end')
  .attr('fill', 'red')

//define transition
const t = d3.transition().duration(5000)


// update function -> whatever depends on new data
const update = (data) => {
  // 1. update scales domains
  y.domain([0, d3.max(data, d => d.orders)]);
  x.domain(data.map(item => item.name));

  // 2. join data
  const rects = graph.selectAll('rect')
    .data(data);

  // 3. remove exit selection - elements that in dom but not needed
  rects.exit().remove();

  // 4. update current shapes in DOM

  //existing
  rects
    .attr('width', x.bandwidth)
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
  // .transition(t)
  // .attr('y', d => y(d.orders))
  // .attr('height', d => graphHeight - y(d.orders))

  //5. append
  //append 
  rects
    .enter()
    .append('rect')
    .attr('height', 0)
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
    .attr('y', graphHeight)
    .merge(rects) //mergine all similar attr for  'rects'
    .transition(t)
    .attrTween('width', widthTween)
    .attr('y', d => y(d.orders))
    .attr('height', d => graphHeight - y(d.orders))



  // call axis
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

};


var data = [];

// Get data from firestore
db
  .collection('dishes')
  .onSnapshot(res => {
    res.docChanges().forEach(change => {

      const doc = { ...change.doc.data(), id: change.doc.id }
      // console.log(doc);
      // console.log(change);

      switch (change.type) {
        case 'added':
          data.push(doc);
          break;
        case 'modified':
          const index = data.findIndex(item => item.id == doc.id);
          data[index] = doc;
          break;
        case 'removed':
          data = data.filter(item => item.id !== doc.id);
          break;
        default:
          break;
      }



    });
    update(data);

  })


const widthTween = (d) => {
  let i = d3.interpolate(0, x.bandwidth())
  return t => {
    return i(t);
  }


}