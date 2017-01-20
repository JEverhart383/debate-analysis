
function createCommonFiftyChart(chartDiv, path){

    var margin = {top:20, right:10, bottom:20, left:30},
    width  = 500 - margin.right - margin.left,
    height = 250 - margin.top - margin.bottom;
  

    var chart = d3.select(chartDiv)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom); 

    var tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip" + chartDiv.split('#')[1]);

    d3.json(path, function(data){

    var xScale = d3.scale.linear().range([0, width]); 
    var yScale = d3.scale.linear().range([height,0]); 
    var bScale = d3.scale.linear().range([5,10]); 
    var cScale = d3.scale.linear().range(['blue', 'red']); 


    let xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom'); 

    let yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left');

    let xGrid = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(height, 0, 0)
    .tickFormat("");

    xScale.domain([
        0,
        // d3.min(data["fifty_most_common"].map(function(d){return +d["length"];})),
        d3.max(data["fifty_most_common"].map(function(d){return +d["length"];}))

        ]); 

     yScale.domain([
        // d3.min(data["fifty_most_common"].map(function(d){return +d["frequency"];})),
        0,
        d3.max(data["fifty_most_common"].map(function(d){return +d["frequency"];}))
        ]);

    bScale.domain([
        d3.min(data["fifty_most_common"].map(function(d){return +d["length"];})),
        d3.max(data["fifty_most_common"].map(function(d){return +d["length"];}))
        ]);  

    cScale.domain([
        0,
        // d3.min(data["fifty_most_common"].map(function(d){return +d["length"];})),
        d3.max(data["fifty_most_common"].map(function(d){return +d["length"];}))
        ]); 

    //append the grid mark axis first, so it's in back
    chart.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "grid")
        .call(xGrid);

    //append the y axis
    chart.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("class", "y axis")
        .call(yAxis);

    //append the x axis
    chart.append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
        .attr("class", "x axis")
        .call(xAxis);

    chart.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".bubbles")
        .data(data["fifty_most_common"])
        .enter()
        .append("circle")
        .attr("cx", function(d){ return xScale(+d["length"]); })
        .attr("cy", function(d){ return yScale(+d["frequency"]); })
        .attr("r", function(d){ return bScale(+d["length"]); })
        .style("fill", function(d){ return cScale(+d["frequency"]); })
        .attr("class", "bubbles")

        .on("mouseover", function(d, i){
    
            //create variable reference to dot we hovered over
            var dot = d3.select(this)
                .style("opacity", .5);
            //set the tool tip text, and make it visible with display "block" CSS.
            var tooltip = d3.select("#tooltip" + chartDiv.split('#')[1])
                .html(
                    "<strong>" + data["fifty_most_common"][i].word 
                    + "</strong><br>Frequency: " + data["fifty_most_common"][i].frequency 
                    + "<br>Length: " + data["fifty_most_common"][i].length)
                .style({"display":"block", "opacity": 1});

            //get the height of the tool tip box and save it in a variable
            var tooltipHeight = tooltip.node().getBoundingClientRect().height;

            //set the CSS of our tool tip to position it based on dot attributes
            tooltip.style({
                "left" : (+dot.attr("cx") + (+dot.attr("r")) + margin.left) + "px",
                "top"  : (+dot.attr("cy") + margin.top - tooltipHeight - (+dot.attr("r"))) + "px"
            });
        })
        .on("mouseout", function(e){

            d3.select(this)
                .style("opacity", 1);

            d3.select("#tooltip" + chartDiv.split('#')[1])
                .style({"display":"none"})
                .html("");
        })



})




}    


//init chart
createCommonFiftyChart('#clinton-results', './clinton/clinton-debate1-result.json' )
createCommonFiftyChart('#trump-results', './trump/trump-debate1-result.json')

