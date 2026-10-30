/* load data function */

d3.csv("data/Ex6_TVdata.csv", d => {
  return {
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
  };
}).then(data => {
  console.log("loaded data:", data);
  drawHistogram(data);
  populateFilters(data);
}).catch(error => {
  console.error("error loading csv file:", error);
});