// Template From D3.org, to be modified..


var makeAreaChart = {

    countryArea: function(clickedCountry){

        containerId = "#countryarea";

        $(containerId + " svg").remove()

        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        var width = 700 - margin.left - margin.right;
        var height = 320 - margin.top - margin.bottom;

        var selectedCountry = clickedCountry;

        var parseDate = d3.time.format("%m/%d").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(d3.time.format("%b %d"))
            .ticks(5)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(4)
            //.style("font-size","6px")
            .orient("left");

        var svg = d3.select(containerId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var area = d3.svg.area()
            .interpolate("linear")
            .x(function(d) {return x(d.date);})
            .y0(function(d) {return y(d.y0);})
            .y1(function(d) {return y(d.y0 + d.y);});

        var stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) {return d.values;})
            .x(function(d) {return d.date;})
            .y(function(d) {return d.value;});

        var nest = d3.nest()
            .key(function(d) {return d.key;});

        d3.tsv("dat/country.tsv", function(error, data){
            if (error) throw error;

            color.domain(d3.keys(data[0])
                .filter(function(key){
                    return key == "RecoveredCase" || key == "CurrentCase" || key == "DeadCase";
                }));
            color.range(['#b30000', '#fe9929', '#deebf7']);

            data.forEach(function(d){
                d.country = d.country;
                d.date = parseDate(d.date);
                d.value = +d.value;
            });

            x.domain(d3.extent(data, function(d) {return d.date;}));

            var selectedData = data.filter(function(d){
                if(d.country == selectedCountry){
                    return d;
                }
            });

            var layers = stack(nest.entries(selectedData));

            y.domain([0, d3.max(selectedData, function(d) {return d.y0 + d.y;}) * 1.2]);

            var ymax = d3.max(selectedData, function(d) {return d.y0 + d.y;})

            svg.append("text")
                .attr("x", width/2)
                .attr("y", height/2)
                .attr("text-anchor", "middle")
                .style("font-size", "20px") 
                .style("fill", "#cccccc")
                .style("stroke", "#cccccc")
                .text(function(){
                    if(!selectedCountry){
                        return "Click a country to chart its cases";
                    }
                    if(!ymax){
                        return "No SARS Cases in 2003";
                    }
                });

            svg.selectAll(".layer").data(layers)
                .enter().append("path")
                .attr("class", "layer")
                .attr("d", function(d) {return area(d.values);})
                .style("fill", function(d, i) {return color(i);});

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0, " + height + ")")
                .call(xAxis)
                .append("text")
                .attr("x", width - 18)
                .attr("dx", ".71em")
                .style("text-anchor", "end")
                .text("Date");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style("font-size","12px")
                .text("Number of Cases");

            svg.selectAll('.axis line, .axis path')
                .style({'stroke': '#000', 'fill': 'none', 'shape-rendering': 'crispEdges'});

            if(selectedCountry){
                svg.append("text")
                    .attr("x", width/2)
                    .attr("y", 10)
                    .attr("text-anchor", "middle")
                    .style("font-size", "20px") 
                    .style("fill", "black")
                    .style("stroke", "black")
                    .text("SARS Cases in " + selectedCountry);
                }
            else{
                svg.append("text")
                    .attr("x", width/2)
                    .attr("y", 10)
                    .attr("text-anchor", "middle")
                    .style("font-size", "20px") 
                    .style("fill", "black")
                    .style("stroke", "black")
                    .text(selectedCountry);
            }

            d3.selectAll(".axis").style("font-size", "11px");
        });

    },

    setCountry: function(clickedCountry){
        console.log("Setting country = " + clickedCountry);
        this.countryArea(clickedCountry);
    }

}


































