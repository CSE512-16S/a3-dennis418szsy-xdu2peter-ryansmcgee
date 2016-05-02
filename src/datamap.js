//More in development on my local copy
var DATAMAP = 
{

	map: null,

	json_data: {},	
	display_data: {},
	bubbles_data: [],

	clickedCountry: "China",

	colorRange_currentCases: null,
	colorRange_currentCases: null,
	lightestRGBShade: 10,
	darkestRGBShade: 255,



	initMap: function(initMonth=3, initDay=17, initYear=2003)
	{
		d3.json("dat/sars.json", function(error, data)//d3.json("dat/sars_withcodes.json", function(error, data)
			{
				if(error) return console.warn(error);
				//console.log("initMap");

				json_data	= data;
				for(var i=0; i<data.length; i++) 
			    {
			    	if(json_data[i].country in countryCodeLookup)
			    	{
			    		json_data[i].country_code	= countryCodeLookup[json_data[i].country];	
			    	}
			    	else
			    	{
			    		console.log(json_data[i].country + " NOT FOUND IN LOOKUP");
			    	}


			    	
			    }

				//console.log(json_data[0]);
				//console.log(json_data.length);
				//console.log("Calling slider.init");
				slider.init();
			});

		this.colorRange_currentCases	= d3.scale.linear()
											.domain([1, 3500])
											.range([2,16])//.range([this.lightestRGBShade, this.darkestRGBShade])
											.clamp(true);

		this.radiusRange_deaths			= d3.scale.linear()
											.domain([0, 250])
											.range([0,25]);

		//callback(initMonth, initDay, initYear);

		


		//update(3, 17);

		
		//slider.init();
	},

	//refactor from o
	updateMap: function(setMonth=1, setDay=1, setYear=2003, redraw=true, updateChoropleth=false)
	{	//console.log("updateMap");

		//var time0 = performance.now();
		

		this.display_data	= {};
		this.bubbles_data	= [];
		//console.log("json_data len = " + json_data.length);
		//console.log(json_data[0]);
		for(var i = 0; i < json_data.length; i++)
		{
			//console.log("updateloop: month="+setMonth+" day="+setDay+" year="+setYear);
			if(json_data[i].month == setMonth && json_data[i].day == setDay && json_data[i].year == setYear)
			{
				var numCurrentCases	= json_data[i].current_case;
				//var shadeValue	= 255 - Math.ceil(this.colorRange_currentCases(numCurrentCases));

				var	mapData		= {}
				mapData['fillKey']			= (numCurrentCases>0) ? Math.ceil(this.colorRange_currentCases(numCurrentCases)) : 'defaultFill';
				//mapData['fillColor']		= 'rgb('+shadeValue+',0,0)';'rgb('+shadeValue+','+shadeValue+','+shadeValue+')';
				mapData['numCases'] 		= numCurrentCases;
				mapData['numRecoveries'] 	= json_data[i].number_recovered;
				mapData['numDeaths'] 		= json_data[i].number_of_death;
				//console.log(mapData);
				this.display_data[json_data[i].country_code]	= mapData;

				var bubbleData	= {}
				bubbleData['fillKey']		= 'BUBBLE';
				bubbleData['radius']		= Math.ceil(this.radiusRange_deaths(json_data[i].number_of_death));
				bubbleData['centered']		= json_data[i].country_code;
				//bubbleData['country']		= json_data[i].country_code;
				//bubbleData['latitude']		= 0.0;
				//bubbleData['longitude']		= 0.0;
				this.bubbles_data.push(bubbleData);
				
			}
		}

		if(redraw)
		{
			$("#datamap svg").remove();
			
			map = new Datamap(
				{
					element: document.getElementById('datamap'),
					projection: 'mercator',
					// setProjection: function(element) 
					// {
					//		var projection = d3.geo.mercator().scale(200);
					// 		var path = d3.geo.path().projection(projection);
	    			//		return {path: path, projection: projection};
	  				// },
					height: null,
					width: null,
					fills: 
						{
							0: 'rgb(240,240,240)',
							// 1: '#ffffe5',
							// 2: '#fff7bc',
							// 3: '#fee391',
							// 4: '#fec44f',
							// 5: '#fe9929',
							// 6: '#ec7014',
							// 7: '#cc4c02',
							// 8: '#993404',
							// 9: '#662506',
							1: '#fff7bc',
							2: '#ffe59d',
							3: '#ffd481',
							4: '#fec268',
							5: '#f8b154',
							6: '#f1a143',
							7: '#e79034',
							8: '#dd8127',
							9: '#d2731d',
							10: '#c56515',
							11: '#b7580f',
							12: '#a94b0b',
							13: '#9a4008',
							14: '#893608',
							15: '#782d07',
							16: '#662506',
							TEST: 'green',
							BUBBLE: 'red',
							defaultFill: 'rgb(240,240,240)'//'rgb('+(255-this.lightestRGBShade)+','+(255-this.lightestRGBShade)+','+(255-this.lightestRGBShade)+')'
						},
					data: this.display_data,
					geographyConfig:
					{
						highlightOnHover: false,
				  		//highlightFillColor: 'rgba(0,0,0,0.0)',
				  		//highlightBorderColor: '#addd8e',
				  		//highlightBorderWidth: 2,
	     				//highlightBorderOpacity: 1,
	     				borderWidth: 1,
	     				borderColor: "#FFFFFF", 
						popupTemplate: function(geography, data) 
						{
							if(data)
							{
								return	'<div class="hoverinfo">' 
										+ geography.properties.name + '<br>' 
										+ '<b><font color="black">'+data.numCases+'</font></b>' + ' current cases' + '<br>'
										+ '<font color="red">'+data.numDeaths+'</font>' + ' have died' + '<br>'
										+ '<font color="light blue">'+data.numRecoveries+'</font>' + ' have recovered' + '<br>'
										+ '</div>'; 
	                   		}
							else
							{
	            				return '<div class="hoverinfo">' + geography.properties.name + '<br>No reported cases</div>'; 
							}
						}
					},
					bublesConfig:
					{
						borderWidth: 2,
				        borderOpacity: 1,
				        borderColor: '#FFFFFF',
				        popupOnHover: false, // True to show the popup while hovering
				        //radius: null,
				        // popupTemplate: function(geography, data) { // This function should just return a string
				        //   return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>';
				        // },
				        fillOpacity: 1.0,
				        animate: false,
				        highlightOnHover: false,
				        // highlightFillColor: '#FC8D59',
				        // highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
				        // highlightBorderWidth: 2,
				        // highlightBorderOpacity: 1,
				        // highlightFillOpacity: 0.85,
				        // exitDelay: 100, // Milliseconds
				        // key: JSON.stringify
					},
					done: function(datamap) 
					{
						datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) 
						{
							//console.log("Clicked " + geography.properties.name);
							clickedCountry	= geography.properties.name;
							makeAreaChart.setCountry(clickedCountry);
						});
					}
				});
			}

			if(updateChoropleth)
			{
				map.updateChoropleth(this.display_data);
			}

		//map.resize();

		//console.log(this.bubbles_data);
		// map.bubbles
		// (
		// 	this.bubbles_data,
		// 	{
		// 		popupTemplate: function(geography, data) 
		// 		{
		// 			return	'<div class="hoverinfo">' 
		// 					+ geography.properties.name + '<br>' 
		// 					//+ '<b><font color="black">'+data.numCases+'</font></b>' + ' current cases' + '<br>'
		// 					//+ '<b><font color="red">'+data.numDeaths+'</font></b>' + ' have died' + '<br>'
		// 					//+ '<b><font color="green">'+data.numRecoveries+'</font></b>' + ' have recovered' + '<br>'
		// 					+ '</div>'; 
		// 		}
		// 	}
		// );
			
			//console.log(this.display_data);

		
		//var time1 = performance.now();
		//console.log("Body of updateMap took " + (time1 - time0) + " milliseconds.");
	}

};