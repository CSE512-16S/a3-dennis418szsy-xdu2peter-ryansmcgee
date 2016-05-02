// Main

var areachartworld = worldArea("worldarea");
var slider;

console.log("main.js");

$(document).ready(function()
{
	
	
	//makeSlider.sliderShow();
	slider = slider_generator();
	DATAMAP.initMap();
	makeAreaChart.countryArea(null);
});

$(window).load(function(){
   //DATAMAP.updateMap(3, 17);
   //makeSlider.brushed();
   //slider = viz.makeSlider("slider");
});




$(window).resize(function(){
   //DATAMAP.updateMap(4, 17);
   //slider.redraw();
});



