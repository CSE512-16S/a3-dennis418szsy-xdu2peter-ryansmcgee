

var slider_generator = function(){
	console.log("load slider");
	
	var initDone	= false;

	var margin = {top: 20, right: 20, bottom: 20, left: 20};
	var width = 680 - margin.left - margin.right;
	var height = 50 - margin.bottom - margin.top;


	var formatDate = d3.time.format("%b %d")

	var timeScale = d3.time.scale()
		.domain([new Date('2003-03-18'), new Date('2003-07-12')])
		.range([0, width])
		.clamp(true);

	startingValue = new Date('2003-03-18');

	var svg = d3.select('#newslider').append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height / 2 + ")")
		.call(d3.svg.axis()
				.scale(timeScale)
				.orient("bottom")
				.tickFormat(function(d) {
					return formatDate(d);
				})
				.tickSize(0)
				.tickPadding(12)
				.tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
		.select(".domain")
		.select(function() {
			console.log(this);
			return this.parentNode.appendChild(this.cloneNode(true));
		})
		.attr("class", "halo")
		.style("stroke", "#aaaaaa")
		.style("stroke-width", 4)
		.style("stroke-linecap", "round");

	var brush = d3.svg.brush()
		.x(timeScale)
		.extent([startingValue, startingValue])
		.on("brush", function(){
			var value = brush.extent()[0]
			if(d3.event.sourceEvent){
				value = timeScale.invert(d3.mouse(this)[0]);
				brush.extent([value, value]);
			}
			handle.attr("transform", "translate(" + timeScale(value) + ",0)");
			handle.select('text').text(formatDate(value));
			console.log("draw");
			if(initDone){
				//var time0 = performance.now();

				DATAMAP.updateMap(value.getMonth()+1, value.getDate(), 2003, false, true);

				//var time1 = performance.now();
				//console.log("Slider call to updateMap took " + (time1 - time0) + " milliseconds total.");
			}
		});

	var slider = svg.append("g")
		.attr("class", "slide")
		.call(brush)

	slider.selectAll(".extent, .resize")
		.remove();

	slider.select(".background")
		.attr("height", height);

	var handle = slider.append("g")
		.attr("class", "handle")

	handle.append("path")
		.attr("transform", "translate(0," + height / 2.5 + ")")
		.attr("d", "M 0 -7 V 7")
		.style("stroke", "black")
		.style("stroke-width", 3)
		.style("stroke-linecap", "round")
		.style("pointer-events", "none");

	handle.append("text")
		.text(startingValue)
		.attr("transform", "translate(" + (-18) + " ," + (height / 3 - 12) + ")")
		.style("fill", "black");

	slider.call(brush.event);

	var init = function(){
		console.log("init slider");
		DATAMAP.updateMap(3, 17, 2003, true, false);
		initDone = true;
	};

	/*
	var redraw = function(){
		var value = brush.extent()[0];

		if(d3.extent.sourceEvent){
			value = timeScale.invert(d3.mouse(this[0]));
			brush.extent([value, value]);
		}
		handle.attr("transform", "translate(" + timeScale(value) + ",0)");
		handle.select('text').text(formatDate(value));
		console.log("update slider");
		DATAMAP.updateMap(value.getMonth()+1,value.getDate());
	};
	*/
	return{init: init};
}

