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



graph.append('rect');
graph.append('rect');
graph.append('rect');
graph.append('rect');
graph.append('rect');
graph.append('rect');

// Axis by group
const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0,${graphHeight})`);
const yAxisGroup = graph.append('g');


db
  .collection('dishes')
  .get()
  .then(res => {

    // console.log(res);
    var data = [];
    res.docs.forEach(doc => data.push(doc.data()));
    console.log(data);



    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.orders)])
      .range([graphHeight, 0])

    // const min = d3.min(data, d => d.orders)
    // const max = d3.max(data, d => d.orders)
    // const extent = d3.extent(data, d => d.orders);

    // console.log(min);
    // console.log(max);
    // console.log(extent);



    // console.log(y(400));
    // console.log(y(900));
    const x = d3.scaleBand()
      .domain(data.map(item => item.name))
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);


    // console.log(x("veg surprise"));
    // console.log(x("veg pasta"));
    console.log(x.bandwidth());



    // Join the data to react
    const rects = graph.selectAll('rect')
      .data(data);

    console.log(rects);



    // rects
    //   .attr('width', x.bandwidth)
    //   .attr('height', d => graphHeight - y(d.orders))
    //   .attr('fill', 'orange')
    //   .attr('x', (d) => x(d.name))
    //   .attr('y', d => y(d.orders))


    // //append 
    // rects
    //   .enter()
    //   .append('rect')
    //   .attr('width', x.bandwidth)
    //   .attr('height', d => graphHeight - y(d.orders))
    //   .attr('fill', 'orange')
    //   .attr('x', (d) => x(d.name))
    //   .attr('y', d => y(d.orders));


    // // create a call axis

    // const xAxis = d3.axisBottom(x);
    // const yAxis = d3.axisLeft(y)
    //   .ticks(3)
    //   .tickFormat(d => d + ' orders');

    // xAxisGroup.call(xAxis);
    // yAxisGroup.call(yAxis);

    // xAxisGroup.selectAll('text')
    //   .attr('transform', 'rotate(-40)')
    //   .attr('text-anchor', 'end')
    //   .attr('fill', 'red')
  });