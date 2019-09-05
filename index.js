// const a = document.querySelector('div');
// const b = d3.select('div');


// console.log(a, b);

const canvas = d3.select('.canvas');

const svg = canvas
  .append('svg')
  .attr('height', 600)
  .attr('width', 600);


const group = svg.append('g')
  .attr("transform", "translate( 50 ,  100 )");


// svg.attr('height', 600);
// svg.attr('width', 600);


// Append shapes to SVG container

group.append('rect')
  .attr('x', 20)
  .attr('y', 20)
  .attr('width', 200)
  .attr('height', 100)
  .attr('fill', 'blue');

group.append('circle')
  .attr('cx', 300)
  .attr('cy', 70)
  .attr('r', 50)
  .attr('fill', 'pink');



group.append('line')
  .attr('x1', 370)
  .attr('y1', 30)
  .attr('x2', 400)
  .attr('y2', 120)
  .attr('stroke', 'red');


svg.append('text')
  .attr('x', 20)
  .attr('y', 200)
  .attr('fill', 'grey')
  .text('Hello, world')
  .style('font', 'Helvetica');


