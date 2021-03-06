
function createCommonFiftyChart(chartDiv, totalsDiv, path, colorScaleArray){

    var margin = {top:20, right:10, bottom:20, left:30},
    width  = 600 - margin.right - margin.left,
    height = 300 - margin.top - margin.bottom;

    var chart = d3.select(chartDiv)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom); 

    // var tooltip = d3.select("body")
    d3.select(chartDiv)
    .append("div")
    .attr("id", "tooltip" + chartDiv.split('#')[1])
    .attr('class', 'tooltip');

    d3.json(path, function(data){
        console.log(data)

    d3.select( totalsDiv + ' .total-tokens').text(data['total_words'])  
    d3.select( totalsDiv + ' .total-unique-tokens').text(data['set_total_words']) 
    d3.select( totalsDiv + ' .total-tokens-normal').text(data['total_words_normalized']) 
    d3.select( totalsDiv + ' .total-tokens-unique-normal').text(data['set_total_words_normalized'])    

    var xScale = d3.scale.linear().range([0, width]); 
    var yScale = d3.scale.linear().range([height,0]); 
    var bScale = d3.scale.linear().range([5,10]); 
    var cScale = d3.scale.linear().range(['#2c7fb8', '#edf8b1']); 


    let xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickSize(2, 2); 

    let yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickSize(2, 2);

    let xGrid = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(height, 0, 0)
    .tickFormat("");

    xScale.domain([
        0,
        d3.max(data["fifty_most_common"].map(function(d){return +d["length"];}))

        ]); 

     yScale.domain([
        0,
        d3.max(data["fifty_most_common"].map(function(d){return +d["frequency"];}))
        ]);

    bScale.domain([
        d3.min(data["fifty_most_common"].map(function(d){return +d["length"];})),
        d3.max(data["fifty_most_common"].map(function(d){return +d["length"];}))
        ]);  

    cScale.domain([
        //0,
        d3.min(data["fifty_most_common"].map(function(d){return +d["frequency"];})),
        d3.max(data["fifty_most_common"].map(function(d){return +d["frequency"];}))
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
            //Add 5px to the hover state 
            tooltip.style({
                "left" : (+dot.attr("cx") + (+dot.attr("r")) + margin.left) + "px",
                "top"  : (+dot.attr("cy") + margin.top - tooltipHeight - (+dot.attr("r")) + 20) + "px"
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



function createFrequencyDistribution(chartDiv, path, colorScaleArray){

    var margin = {top:20, right:10, bottom:20, left:30},
    width  = 800 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

    var chart = d3.select(chartDiv)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom); 

    // var tooltip = d3.select("body")
    d3.select(chartDiv)
    .append("div")
    .attr("id", "full-tooltip")
    .attr('class', 'tooltip');

    d3.json(path, function(data){
        console.log(data)  

    var xScale = d3.scale.linear().range([0, width]); 
    var yScale = d3.scale.linear().range([height,0]); 
    var bScale = d3.scale.linear().range([5,10]); 
    var cScale = d3.scale.linear().range(['#2c7fb8', '#edf8b1']); 


    let xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickSize(2, 2); 

    let yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickSize(2, 2);

    let xGrid = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(height, 0, 0)
    .tickFormat("");

    xScale.domain([
        0,
        d3.max(data["frequency_distribution"].map(function(d){return +d["length"];}))

        ]); 

     yScale.domain([
        0,
        d3.max(data["frequency_distribution"].map(function(d){return +d["frequency"];}))
        ]);

    bScale.domain([
        d3.min(data["frequency_distribution"].map(function(d){return +d["length"];})),
        d3.max(data["frequency_distribution"].map(function(d){return +d["length"];}))
        ]);  

    cScale.domain([
        //0,
        d3.min(data["frequency_distribution"].map(function(d){return +d["frequency"];})),
        d3.max(data["frequency_distribution"].map(function(d){return +d["frequency"];}))
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
        .data(data["frequency_distribution"])
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
            var tooltip = d3.select("#full-tooltip")
                .html(
                    "<strong>" + data["frequency_distribution"][i].word 
                    + "</strong><br>Frequency: " + data["frequency_distribution"][i].frequency 
                    + "<br>Length: " + data["frequency_distribution"][i].length)
                .style({"display":"block", "opacity": 1});

            //get the height of the tool tip box and save it in a variable
            var tooltipHeight = tooltip.node().getBoundingClientRect().height;

            //set the CSS of our tool tip to position it based on dot attributes
            //Add 5px to the hover state 
            tooltip.style({
                "left" : (+dot.attr("cx") + (+dot.attr("r")) + margin.left) + "px",
                "top"  : (+dot.attr("cy") + margin.top - tooltipHeight - (+dot.attr("r")) + 360) + "px"
            });
        })
        .on("mouseout", function(e){

            d3.select(this)
                .style("opacity", 1);

            d3.select("#full-tooltip")
                .style({"display":"none"})
                .html("");
        })



})




}    


