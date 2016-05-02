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



### Story Board

In Tableau, we explored several designs of how to present the data. We think a map representation like this is appropriate.

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/worldmap.png)

Color is used to encode the number of current cases. Dark means a larger population of people having SARS. Tableau has this nice feature that enable you to play a video on how the map changes over time. There is also a slider that controls the date of the map. We think these are nice, and we decided to implement a slider in our interactive visualization. 

To show more than just the current cases, we decide to include area charts that shows the number of death and recovery as well. Red, yellow and blue are the colors for different area, taking into consideration of Deuteranopia(red-green color blindness). A scetch using data from the world looks like this,

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/worldAreaChart.png)

We also want to enable viewer to create area chart of individual country like this,

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/blob/master/storyboard/ChinaAreaChart.png)

This will be another interactive feature, namely when the viewer click on a country on the map, the corresponding area chart will be drawn besides the world area chart.

The basic overview of the interface is here:

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
