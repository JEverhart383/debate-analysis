
    var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

    var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

    var svg = d3.select("body").append("trump-svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

      var div = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0);

function loadPathToSVG(path){
      d3.json(path, function(error, root){

          if (error) throw error;

          var frequencyObject = {
            "name": "Leaves", 
            "children": []
          }

        for (word in root) {

          var newObj = {
            "name": word, 
            "size": root[word]
          }; 
          frequencyObject.children.push(newObj); 
        }; 

        console.log(frequencyObject); 

          var node = svg.selectAll(".node")
              .data(bubble.nodes(classes(frequencyObject))
              .filter(function(d) { return !d.children; }))
            .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
              .on("mouseover", function(d) {    
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
              div.html(d.className + "<br/>"  + d.value)  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
            .on("mouseout", function(d) {   
                div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });;

          node.append("title")
              .text(function(d) { return d.className + ": " + format(d.value); });

          node.append("circle")
              .attr("r", function(d) { return d.r; })
              .style("fill", function(d) { return color(d.packageName); });

          node.append("text")
              .attr("dy", ".3em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.className.substring(0, d.r / 3); });



      }); 
    }//end load path function  

    function loadTrump(){
      loadPathToSVG("trump-result.json"); 
    }
    function loadClinton(){
      loadPathToSVG("clinton-result.json"); 
    }
    // function loadTrump(){
    //   loadPathToSVG("trump-results.json"); 
    // }

      function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
        else classes.push({packageName: name, className: node.name, value: node.size});
      }

      recurse(null, root);
          return {children: classes};
      }

      d3.select(self.frameElement).style("height", diameter + "px");

      loadTrump();