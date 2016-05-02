# Assignment 3

## Team Members

- Guanming Wang 
- Ryan McGee
- Xiaochuan Du

## The 2003 SARS Outbreak

Our data domain is investigating the spread of SARS in the 2003 outbreak of this disease. We are interested in the geospatial pattern of the disease's spread around the world over the course of the outbreak as well as understanding how different countries experienced the epidemic.

Severe acute respiratory syndrome (SARS) is a viral respiratory disease of zoonotic origin caused by the SARS coronavirus (SARS-CoV), and between November 2002 and July 2003, an outbreak of SARS in southern China caused an eventual 8,096 cases and 774 deaths reported in multiple countries with the majority of cases in Hong Kong (9.6% fatality rate) according to the World Health Organization (WHO). Within weeks, SARS spread from Hong Kong to infect individuals in 37 countries in early 2003. For this assignment, we are interested in visualized the spreading of SARS across time and countries. 

### Data Domain

Data on SARS cases during the 2003 outbreak is available from the World Health Organization (WHO). We acquired data from the the WHO website for use in our visualization. This data set consists of information about SARS cases from March 17, 2003 to July 11, 2003 for about 30 different countries. 

Variables in the data include:
* Country
* Date
* The cumulative number of cases (per country, on each date)
* The cumulative number of deaths (per country, on each date)
* The cumulative number of recoveries (per country, on each date)
* The number of current (active) cases (per country, on each date)

## Our Interactive Visualization

### Running Instructions

Access our visualization at [http://cse512-16s.github.io/a3-dennis418szsy-xdu2peter-ryansmcgee/](http://cse512-16s.github.io/a3-dennis418szsy-xdu2peter-ryansmcgee/) or download this repository and run `python -m SimpleHTTPServer 8000` and access this from http://localhost:8000/.

###Overview of Major Interactions:
* <b>Move the date slider</b> to explore the global spread of active SARS cases on the map. 
* <b>Mouseover a country</b> to view the number of cases in that country on the given date.
* <b>Click on a country</b> to chart its cases over the duration of the epidemic.
* External links with more information about the outbreak are available in the top right corner.

##Design

We will implement a visualization that allows a user to explore and understand how incidence of SARS cases (including active infections, recoveries, and deaths) change over both location and time. Understanding this data requires making sense of a number of data dimensions, and effective interactive visualization will be invaluable in making this information accessible.

A key aspect of this epidemiology data domain is tracking cases of the disease spatially around the world. It is natural to encode such data in a map visualization, which will be the central component of our visualization. Interactive features will allow users to get more information about individual countries: by mousing over a country to display case statistics on a given date and by clicking on a country to display a chart of all cases in that country over the full course of the outbreak. For understanding a disease outbreak, it is also important to capture how the number of cases and their spatial distribution changes over time. Thus, we will provide an interactive slider that will allow the user to update the map's encoded visual information to display different dates under their control. 

### Story Board

We used Tableau, to explore several designs of how to present the data. 

As mentioned above, we think a map representation is appropriate for this data domain. We will use color to encode the number of current (active) cases in each country on a given date. Darker colors mean a higher number of people currently having an active SARS infection, and vice versa.

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/worldmap.png)

Tableau has this nice feature that enables you to play a video of how the map changes over time. There is also a slider that controls the date of the map. This is nice because Tableau allows us to explore both the color encodings of our data and how the data looks as you use a slider to interact with it. By playing with this in Tableau, we identified a few things that we will need to consider in our implementation. First, the range of values for the number of cases are not uniform over its rather large range. Most countries have very few cases (<10) on any given day, but a few countries have very many cases (>100 or >1000+) cases on many days. We need to have a color scale that has enough dynamic range to distiguish differences both among the relatively low values and between the low and high values. Also, it is important to make sure the lightest color in the range is not so light that it doesn't stand out from the background. In our implementation, we will use a color scale with at least 10 different colors to provide enough levels for the necessary value distinctions, and use a "minimum" (lightest color) that is sufficiently contrasted with white background and unshaded countries.

In addition to encoding information with country colors, the map itself provides an intuitive interface for users to interact with and gain more detailed information. We will display tool tips with the current number of active cases and cumulative numbers of deaths and recoveries for a given country when the user mouses over that country. Clicking on a country will also be used as an interaction feature (details below).

The map will provide a good overview of the spread of the disease, but it may be hard to gauge global totals for active cases and deaths when they are displayed distributed over many countries. Therefore, we will also display an area chart that plots the total number of worldwide cases, deaths, and recoveries over time. This is a relatively simple visualization, but will be valuable for getting a picture of how the total number of cases rises and falls over time and will be a nice companion to the map visualization with a depiction of different data dimensions.  

While information about number of current cases for each country will be visualized in the map, it would also be nice to be able to see a plot - like the one for the global totals - to get an additional look at how cases/deaths/recoveries rise and fall over the whole time scale in each country. There are too many countries, each with a different scale of number of cases, to make displaying an area plot for each country (such as with small multiples) feasible in one view. Therefore, we will allow the user to interact with the map and click on countries to display the area chart for a selected country. One country will be charted at a time.

We used Tableau again to get a feel for what these area charts will look like. We decided to use the following color encodings: orange for active cases, red for deaths, and blue for recoveries. This scheme plays on common perceptions (red=bad, orange=similar to red (bad) but less so, blue=ok). This will also avoid using both red and green, taking into consideration of Deuteranopia(red-green color blindness). We will be consistent in using these colors for these categories across each component of our overall visualization (e.g. use an orange color gradient in the map, which is encoding active cases). A sketch using data from the world totals looks like this:

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/worldAreaChart.png)

We also want to enable viewer to create area chart of individual country like this,

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/ChinaAreaChart.png)

This will be another interactive feature, namely when the viewer click on a country on the map, the corresponding area chart will be drawn besides the world area chart.

We have plotted out a basic overview of the layout/interface. The map, being the key visualization feature, is at the top of the page and near center. The charts will be below the map, near each other to allow for comparisons between global trends and trends within a particular country. Our design layout is shown here:

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/proposedNewSketch.png)

## Changes Between the Storyboard and the Final Visualization

Tableau proved to be a very effective prototyping tool that allowed us to tease out a lot of the design considerations before we began implementation. As such, most of our final visualization remained in line with our design/storyboard.

Early after beginning to implement the layout and interface, we realized that screen real estate was a bit of an issue. We wanted to make sure all components of the visualization would be visible on nearly all screen sizes, so we tried to position and scale all components to fit on rather small Surface tablet and Macbook air screens (the smallest screens in our group). At first each of our components were too large to fit simultaneously on these displays. We wanted the world map to be as big as possible so we realized that stacking the two area charts below the map decreases the possible height of the map. So we ended up putting the area charts side by side below the map to free up vertical screen real estate. We made a revised layout storyboard after this early redesign:

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/proposedNewSketch2.png)

Another change was opting to use a single slider centered underneath the map rather than having individual (but linked) sliders on each of the area charts. This simplified the interface and makes it less confusing for the user what slider to use.

The colors were refined in the implementation beyond what we had in the storyboard/design. We planned to use at least 10 colors in the gradient for the map, but ended up using a 16-color scale to provide the desired resolution at different ranges of values. We also experimented with both linear and log-based color gradients. The log scale gave more dramatic differentiation when the number of cases was very low, but made it so that once a country got past an intermediate number of cases it always appeared dark. We opted to use a linear scale which still gave enough differentiation at low values but also made changes across all value ranges apparent as you move across dates. With the linear scale, but not the log scale, you can easily see the rise and fall in number of cases in countries with wide ranges of values like China.

We also carefully considered the colors used in the area charts. We stuck with the red=death, orange=active case, and blue=recovered scheme. But we chose to use a light/desturated blue so that the trends in active cases and deaths, which are the most interesting categories to look at, would stand out prominently. We also chose a slightly darkened red for good contrast with the orange. A legend was added to the Global data area chart which serves as a legend for all figures since they are consistent in coloration.

A lot of attention was paid to formatting the axes, ticks, labels, and titles so that they convey the important information without being cluttered or distracting. This involved tweaking font sizes, giving some less important font a gray tone, and so on.

We also added a title bar at the head of the page which includes external links providing resources with more information about SARS.

## Development Process
- [x] Data Cleaning
- [x] Create Prototype in Tableau
- [x] Storyboard of the Interface
- [x] Implement Design in D3

####Ryan's Tasking
I spent roughly 20 hrs working on this application overall. A fair amount of time involved getting more up to speed with javascript, D3, and CSS since I am new to these tools. Getting the map on the page was rather straightforward using the Datamap javascript library, but a lot of time was spent refining the display and behavior of the map for our purposes. Time was also spent tailoring the code used to update the map to minimize the time it took to redraw the map as it updated. A significant amount of time was also spent in fine tuning other components and overall layout.
- [x] Implement the Interactive Data Map (~ 12 hrs)
 * Create lookup dictionaries for converting WHO country names to country codes used in Datamap API
 * Implement reading in and storing data from data files
 * Implement generating and initializing world data map, including customizing display parameters
 * Implement update function to color countries according to data and given date
 * Provide function interface to slider for specifiying date to display
 * Implement tooltips for country data on mouseover
 * Implement ability to click on countries and direct area chart to update to display info for selected country
 * Optimizing for responsiveness of map (it was initially rather laggy relative to slider inputs, but now very responsive)
 * Sizing and positioning the map in the web layout
 * Optimizing choice of color gradient scale and encoding
- [x] Fine tuning area chart visualization aspects (~2 hrs)
 * Formatted area chart axes, labels, and titles for aesthetic expressiveness/effectiveness with minimal clutter and distraction
 * Choice of final colors for active/death/recovery
 * Minor adjustments to legend to be in same order as chart stack and out of the way of the title
- [x] Working with page layout (~2 hrs)
 * Worked some to move/scale a few things to achieve final page layout and make sure all components simultaneously visible on relatively small screens (bulk of layout was done by Guanming)
- [x] Storyboarding (~1 hr)
 * Contributed the page layout storyboards
- [x] Contributed to readme (~2 hrs)
