var data = [
  {country: "France", litres: 12.2},
  {country: "Canada", litres: 10.2},
  {country: "Pakistan", litres: 0.1},
  {country: "United States", litres: 9.2},
  {country: "Russia", litres: 15.1},
  {country: "Malaysia", litres: 1.3},
  {country: "India", litres: 4.3},
  {country: "South Korea", litres: 12.3},
  {country: "Mexico", litres: 7.2},
  {country: "Belarus", litres: 17.5},
  {country: "Ukraine", litres: 13.9},
  {country: "North Korea", litres: 3.7},
]

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d) { return d.country; }));
  y.domain([0, d3.max(data, function(d) { return d.litres; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".75em")
      .style("text-anchor", "end")
      .text("litres");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.litres); })
      .attr("height", function(d) { return height - y(d.litres); });


d3.select("input").on("change", change);

function change() {
  var x0 = x.domain(data.sort(this.checked
      ? function(a, b) { return b.litres - a.litres; }
      : function(a, b) { return d3.ascending(a.country, b.country); })
      .map(function(d) { return d.country; }))
      .copy();

  svg.selectAll(".bar")
      .sort(function(a, b) { return x0(a.country) - x0(b.country); });

  var transition = svg.transition().duration(750),
      delay = function(d, i) { return i * 50; };

  transition.selectAll(".bar")
      .delay(delay)
      .attr("x", function(d) { return x0(d.country); });

  transition.select(".x.axis")
      .call(xAxis)
    .selectAll("g")
      .delay(delay);
}
