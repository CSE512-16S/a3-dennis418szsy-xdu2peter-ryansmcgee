//More in development on my local copy
var DATAMAP = 
{

	map: null,

	json_data: {},	
	display_data: {},
	
	clickedCountry: "China",

	colorRange_currentCases: null,
	lightestRGBShade: 10,
	darkestRGBShade: 255,



	initMap: function(initMonth=3, initDay=17, initYear=2003)
	{
		d3.json("dat/sars.json", function(error, data)//d3.json("dat/sars_withcodes.json", function(error, data)
			{
				if(error) return console.warn(error);
				
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

				slider.init();
			});

		this.colorRange_currentCases	= d3.scale.linear()
											.domain([1, 3500])
											.range([2,16])//.range([this.lightestRGBShade, this.darkestRGBShade])
											.clamp(true);
	},

	updateMap: function(setMonth=1, setDay=1, setYear=2003, redraw=true, updateChoropleth=false)
	{
		this.display_data	= {};
	
		for(var i = 0; i < json_data.length; i++)
		{
			if(json_data[i].month == setMonth && json_data[i].day == setDay && json_data[i].year == setYear)
			{
				var numCurrentCases	= json_data[i].current_case;
	
				var	mapData		= {}
				mapData['fillKey']			= (numCurrentCases>0) ? Math.ceil(this.colorRange_currentCases(numCurrentCases)) : 'defaultFill';
				mapData['numCases'] 		= numCurrentCases;
				mapData['numRecoveries'] 	= json_data[i].number_recovered;
				mapData['numDeaths'] 		= json_data[i].number_of_death;
	
				this.display_data[json_data[i].country_code]	= mapData;			
			}
		}

		if(redraw)
		{
			$("#datamap svg").remove();
			
			map = new Datamap(
				{
					element: document.getElementById('datamap'),
					projection: 'mercator',
					height: 400,
					width: 640,
					fills: 
						{
							0: 'rgb(240,240,240)',
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
							defaultFill: 'rgb(240,240,240)'
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
					done: function(datamap) 
					{
						datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) 
						{
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
	}

};
