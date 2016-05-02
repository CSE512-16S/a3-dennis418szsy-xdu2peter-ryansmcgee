# Assignment 3

## Team Members

- Guanming Wang 
- Ryan McGee
- Xiaochuan Du

## The 2003 SARS Outbreak

Our data domain is investigating the spread of SARS in the 2003 outbreak of this disease. We are interested in the geospatial pattern of the disease's spread around the world over the course of the outbreak as well as understanding how different countries experienced the epidemic.

Severe acute respiratory syndrome (SARS) is a viral respiratory disease of zoonotic origin caused by the SARS coronavirus (SARS-CoV), and between November 2002 and July 2003, an outbreak of SARS in southern China caused an eventual 8,096 cases and 774 deaths reported in multiple countries with the majority of cases in Hong Kong (9.6% fatality rate) according to the World Health Organization (WHO). Within weeks, SARS spread from Hong Kong to infect individuals in 37 countries in early 2003. For this assignment, we are interested in visualized the spreading of SARS across time and countries. 

### Data Source 

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

Tableau has this nice feature that enables you to play a video of how the map changes over time. There is also a slider that controls the date of the map. This is nice because Tableau allows us to explore both the color encodings of our data and how the data looks as you use a slider to interact with it. By playing with this in Tableau, we identified a few things that we will need to consider in our implementation. First, the range of values for the number of cases are not uniform over its rather large range. Most countries have very few cases (<10) on any given day, but a few countries have very many cases (>100 or >1000+) cases on many days. We need to have a color scale that has enough dynamic range to distiguish differences both among the relatively low values and between the low and high values. Also, it is important to make sure the lightest color in the range is not so light that it doesn't stand out from the background. In our implementation, we will use a color scale with 16 different colors to provide enough levels for the necessary value distinctions, and use a "minimum" (lightest color) that is sufficiently contrasted with white background and unshaded countries.

In addition to encoding information with country colors, the map itself provides an intuitive interface for users to interact with and gain more detailed information. We will display tool tips with the current number of active cases and cumulative numbers of deaths and recoveries for a given country when the user mouses over that country. Clicking on a country will also be used as an interaction feature (details below).

The map will provide a good overview of the spread of the disease, but it may be hard to gauge global totals for active cases and deaths when they are displayed distributed over many countries. Therefore, we will also display an area chart that plots the total number of worldwide cases, deaths, and recoveries over time. This is a relatively simple visualization, but will be valuable for getting a picture of how the total number of cases rises and falls over time and will be a nice companion to the map visualization with a depiction of different data dimensions.  

While information about number of current cases for each country will be visualized in the map, it would also be nice to be able to see a plot - like the one for the global totals - to get an additional look at how cases/deaths/recoveries rise and fall over the whole time scale in each country. There are too many countries, each with a different scale of number of cases, to make displaying an area plot for each country (such as with small multiples) feasible in one view. Therefore, we will allow the user to interact with the map and click on countries to display the area chart for a selected country. One country will be charted at a time.

We used Tableau again to get a feel for what these area charts will look like. We decided to use the following color encodings: orange for active cases, red for deaths, and blue for recoveries. This scheme plays on common perceptions (red=bad, orange=similar to red (bad) but less so, blue=ok). This will also avoid using both red and green, taking into consideration of Deuteranopia(red-green color blindness). A scetch using data from the world totals looks like this,

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/worldAreaChart.png)

We also want to enable viewer to create area chart of individual country like this,

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/ChinaAreaChart.png)

This will be another interactive feature, namely when the viewer click on a country on the map, the corresponding area chart will be drawn besides the world area chart.

We have plotted out a basic overview of the layout/interface. The map, being the key visualization feature, is at the top of the page and near center. The charts will be below the map, near each other to allow for comparisons between global trends and trends within a particular country. Our design layout is shown here:

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/proposedNewSketch.png)

## Changes Between the Storyboard and the Final Visualization

Once we implemented the interface, we realized that we want the world map to be as big as possible. Stacking the two area charts decreases the height of the map, so we put them side by side.

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/proposedNewSketch2.png)

Things got move around a little bit. For example, we added a section for the slider that control the world map. Color is tuned for better visual expression. We also added a title and external links about SARS.


## Development Process
- [x] Data Cleaning
- [x] Create Prototype in Tableau
- [x] Storyboard of the Interface
- [x] Implement Design in D3
