const data = [
  { width: 600, height: 100, fill: 'yellow' }
];





const svg = d3.select('svg');

const rect = svg.select('rect')
  .data(data)
  .attr('width', (d, i, n) => {
    console.log(i);
    console.log(n);
    return d.width
  })
  .attr('height', function (d) { return d.height; })
  .attr('fill', function (d) { return d.fill; });


console.log(rect);
