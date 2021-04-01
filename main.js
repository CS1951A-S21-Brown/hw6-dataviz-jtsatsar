// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};


// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 450;
let graph_2_width = (MAX_WIDTH / 2), graph_2_height = 375;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

const NUM_EXAMPLES1 = 10;

let svg = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", graph_1_height)
    .append("g")
    .attr("transform", "translate(200, 40)");

let countRef = svg.append("g");
let y_axis_label = svg.append("g");
let y_axis_text = svg.append("text")
    .attr("transform", `translate(${-120} , ${(graph_1_height - margin.top - margin.bottom)/2})`)
    .style("text-anchor", "middle");

    let tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


d3.csv("./data/new_video_games.csv").then(function(data) {

    data = cleanData(data,
      function(a, b) {
        return parseInt(b.output) - parseInt(a.ouput);
      }, NUM_EXAMPLES1
    );

    let mouseover = function(d) {
        let color_span = `<span style="color: ${color(d.Genre)};">`;
        let html = `${d.Genre}<br/>
                ${color_span}${parseInt(d.Year)}</span><br/>`
                // let html = `${d['attr']}`

        tooltip.html(html)
            .style("left", `${(d3.event.pageX) - 220}px`)
            .style("top", `${(d3.event.pageY) - 30}px`)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
    };

    let mouseout = function(d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", 0);
    };


    let x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {return parseFloat(d.top_ten_sales)})])
        .range([0, graph_1_width - margin.left - margin.right]);


    let y = d3.scaleBand()
        .domain(data.map(function(d) {return d['top_ten_names']}))
        .range([0, graph_1_height - margin.top - margin.bottom])
        .padding(0.1);


    let bars = svg.selectAll("rect").data(data);

    let color = d3.scaleOrdinal()
      .domain(data.map(function(d) { return d["top_ten_names"] }))
      .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), NUM_EXAMPLES1));


    bars.enter()
        .append("rect")
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .merge(bars)
        .attr("fill", function(d) { return color(d['top_ten_names']) })
        .attr("x", x(0))
        .attr("y", function(d) { return y(d['top_ten_names']) })
        .attr("width", function(d) { return x(d['top_ten_sales']) })
        .attr("height",  y.bandwidth());

    let counts = countRef.selectAll("text").data(data);

    counts.enter()
        .append("text")
        .merge(counts)
        .attr("x", function(d) { return x(d.top_ten_sales) + 10})
        .attr("y", function(d) { return y(d.top_ten_names) + 10})
        .style("text-anchor", "start")
        .text(function(d) { return d.top_ten_sales});



    y_axis_label.call(d3.axisLeft(y).tickSize(0).tickPadding(10));

    svg.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.right - margin.left)/2} , ${(graph_1_height - margin.top - margin.bottom) + 10})`)
        .style("text-anchor", "middle")
        .text("Global Sales ($MM)")
        .style("font-size", 12);


    svg.append("text")
        .attr("transform", `translate(${-160} , ${(graph_1_height - margin.top - margin.bottom)/2}) rotate(${270})`)
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .text("Video Game");

    svg.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.right - margin.left)/2} , ${-10})`)
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Top 10 Video Games of All Time");


});

let svg4 = d3.select("#legend").attr("transform", `translate(${100}, ${200})`);

let svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", graph_2_width)
    .attr("height", graph_2_height)
    .append("g")
    .attr("transform", `translate(${5}, ${80})`);

  let title2 = svg2.append("text")
      .attr("transform", `translate(${(graph_2_width - margin.right - margin.left)/2} , ${-10})`)
      .style("text-anchor", "start")
      .style("margin-left", -1000)
      .style("font-size", 15);

d3.csv("./data/new_video_games.csv").then(function(data2) {
    data2 = cleanData(data2,
      function(a, b) {
        return parseInt(b.output) - parseInt(a.ouput);
      }, 1);

      d3.json('./data/custom.geo.json').then(function(data1) {

      let projection = d3.geoEqualEarth();
      projection.fitSize([graph_2_width, graph_2_height], data1);
      let geoGenerator = d3.geoPath()
      .projection(projection);


   svg2.append('g').selectAll('path')
   .data(data1.features)
   .join('path')
   .attr('d', geoGenerator)
   .attr('fill', '#088')
   .style("fill", function(d1) { return color_helper(d1,data2); })
   .attr('stroke', '#000');

   title2.text("Top Video Game Genre Sold Per Region");
 })});


let cy = 2;
let colors_seen = new Array();

function helper(genre) {
  color = ''
  if (genre == 'Role-Playing') {
    color= 'red'
  }
  else if (genre == 'Action') {
    color= 'blue'
  }
  else if (genre == 'Sports') {
    color= 'gold'
  }
  else if (genre == 'Platgorm') {
    color= 'green'
  }
  else if (genre == 'Racing') {
    color= 'yellow'
  }else if (genre == 'Misc') {
    color= 'grey'
  }
  else if (genre == 'Puzzle') {
    color= 'pink'
  }
  else if (genre == 'Shooter') {
    color= 'brown'
  }
  else if (genre == 'Simulation') {
    color= 'slateblue'
  }
  else if (genre == 'Action') {
    color= 'orange'
  }
  else if (genre == 'Fighting') {
    color= 'darkgreen'
  }
  else if (genre == 'Adventure') {
    color= 'black'
  }
  else if (genre == 'Strategy') {
    color= 'grey1'
  }
  if (colors_seen.includes(genre)==false) {
    svg2.append("circle").attr("cx",100).attr("cy",cy).attr("r", 6).style("fill", color)
    svg2.append("text").attr("x", 120).attr("y", cy).text(genre).style("font-size", "15px").attr("alignment-baseline","middle")
    cy = cy + 30;
    colors_seen.push(genre)
  }
  return color
}

function color_helper(d1,d2) {
  if (d1.properties.wb_a2 == "JP") {
    return helper(d2[0]['top_genre_JP'])
  }
  else if (d1.properties.continent == "Europe") {
    return helper(d2[0]['top_genre_EU'])
  }
  else if (d1.properties.continent == "North America") {
    return helper(d2[0]['top_genre_NA'])
  }
  else {
    return helper(d2[0]['top_genre_other'])
  }
}


let svg3 = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_3_width)
    .attr("height", graph_3_height)
    .append("g")
    .attr("transform", "translate (200, 40)");

let x3 = d3.scaleLinear()
    .range([0, graph_3_width - margin.left - margin.right]);

let y3 = d3.scaleBand()
    .range([0, graph_3_height - margin.top - margin.bottom])
    .padding(0.3);

let countRef3 = svg3.append("g");
let y_axis_label3 = svg3.append("g");

svg3.append("text")
    .attr("transform", `translate(${(graph_3_width - margin.right - margin.left)/2} , ${(graph_3_height - margin.top - margin.bottom) + 10})`)
    .style("text-anchor", "middle")
    .style("font-size", 12)
    .text("Global Sales ($MM)");

let y_axis_text3 = svg3.append("text")
    .attr("transform", `translate(${-120} , ${(graph_3_height - margin.top - margin.bottom)/2})`)
    .style("font-size", 12)
    .style("text-anchor", "middle");

let title3 = svg3.append("text")
    .attr("transform", `translate(${(graph_3_width - margin.right - margin.left)/2} , ${-10})`)
    .style("text-anchor", "middle")
    .style("font-size", 15);


function setData(input, output, name) {
    d3.csv('./data/new_video_games.csv').then(function(data) {
        data = cleanData(data,
          function(a, b) {
            return parseInt(b[output]) - parseInt(a[output]);
          }, NUM_EXAMPLES1
        );


        // x3.domain([0, d3.max(data, function(d) {return d.output})]);

        // y3.domain(data.map(function(d) {return d.input}));

        // move outside
        // let x3 = d3.scaleLinear()
        //     .domain([0, d3.max(data, function(d) {return d[output]})])
        //     .range([0, graph_3_width - margin.left - margin.right]);
        x3.domain([0, d3.max(data, function(d) {return parseFloat(d[output])})])

        y3.domain(data.map(function(d) {return d[input]}))
        // let y3 = d3.scaleBand()
        //     .domain(data.map(function(d) {return d[input]}))
        //     .range([0, graph_3_height - margin.top - margin.bottom])
        //     .padding(0.1);

        y_axis_label3.call(d3.axisLeft(y3).tickSize(0).tickPadding(10));
        // svg3.append("g").call(d3.axisLeft(y3).tickSize(0).tickPadding(20));
        let bars = svg3.selectAll("rect").data(data);

        let color = d3.scaleOrdinal()
          .domain(data.map(function(d) { return d[input] }))
          .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), NUM_EXAMPLES1));

        bars.enter()
            .append("rect")
            .merge(bars)
            .attr("fill", function(d) { return color(d[input]) })
            .transition()
            .duration(1000)
            .attr("x", x3(0))
            .attr("y", function(d) { return y3(d[input])})
            .attr("width", function(d) { return x3(d[output])})
            .attr("height",  y3.bandwidth());

        let counts = countRef3.selectAll("text").data(data);

        counts.enter()
            .append("text")
            .merge(counts)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x3(d[output]) + 10})
            .attr("y", function(d) { return y3(d[input]) + 10})
            .style("text-anchor", "start")
            .text(function(d) { return Math.round(100*d[output])/100});

        y_axis_text3.text(name + " Publishers");

        title3.text("Top " + name + " Video Game Publishers");

        bars.exit().remove();
        counts.exit().remove();
    });
}


setData('sports_publishers', 'sports_sales', 'Sports')
/**
 * Cleans the provided data using the given comparator then strips to first numExamples
 * instances
 */
function cleanData(data, comparator, numExamples) {
    return data.sort(comparator).slice(0, numExamples);
}
