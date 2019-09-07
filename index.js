const svg = d3.select('svg');

d3.json('menu.json')
  .then(data => {
    // Join the data to react
    const rects = svg.selectAll('rect')
      .data(data);

    rects
      .attr('width', 50)
      .attr('height', d => d.orders)
      .attr('fill', 'orange')
      .attr('x', (d, i) => i * 70)
  })