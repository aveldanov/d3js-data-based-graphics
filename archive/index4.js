const data = [
  { width: 600, height: 100, fill: 'yellow' },
  { width: 400, height: 60, fill: 'red' },
  { width: 50, height: 30, fill: 'pink' }

];





const svg = d3.select('svg');

const rect = svg.selectAll('rect')
  .data(data)
  .attr('width', (d, i, n) => { return d.width })
  .attr('height', (d) => { return d.height; })
  .attr('fill', (d) => { return d.fill; });


console.log(rect);


