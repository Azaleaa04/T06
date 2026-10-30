const populateFilters = (data) => {
  // 1. Screen Tech Filters
  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => d.isActive ? "filter active" : "filter")
    .text(d => d.label)
    .on("click", (e, d) => {
      if (!d.isActive) {
        filters_screen.forEach(filter => {
          filter.isActive = filter.id === d.id;
        });
        d3.selectAll("#filters_screen .filter")
          .classed("active", filter => filter.id === d.id);
        
        applyFilters(data);
      }
    });

  // 2. Screen Size Filters
  d3.select("#filters_size")
    .selectAll(".filter")
    .data(filters_size)
    .join("button")
    .attr("class", d => d.isActive ? "filter active" : "filter")
    .text(d => d.label)
    .on("click", (e, d) => {
      if (!d.isActive) {
        filters_size.forEach(filter => {
          filter.isActive = filter.id === d.id;
        });
        d3.selectAll("#filters_size .filter")
          .classed("active", filter => filter.id === d.id);
        
        applyFilters(data);
      }
    });

  // Combined Filtering Logic
  const applyFilters = (data) => {
    const activeTech = filters_screen.find(f => f.isActive).id;
    const activeSize = filters_size.find(f => f.isActive).id;

    let filteredData = data;

    if (activeTech !== "all") {
      filteredData = filteredData.filter(tv => tv.screenTech === activeTech);
    }

    if (activeSize !== "all") {
      filteredData = filteredData.filter(tv => tv.screenSize === +activeSize);
    }

    const updatedBins = binGenerator(filteredData);
    
    d3.selectAll("#histogram rect")
      .data(updatedBins)
      .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));
  };
};