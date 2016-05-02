# Assignment 3

## Team Members

- Guanming Wang 
- Ryan McGee
- Xiaochuan Du

## The spreading of SARS in 2003

Severe acute respiratory syndrome (SARS) is a viral respiratory disease of zoonotic origin caused by the SARS coronavirus (SARS-CoV), and between November 2002 and July 2003, an outbreak of SARS in southern China caused an eventual 8,096 cases and 774 deaths reported in multiple countries with the majority of cases in Hong Kong (9.6\% fatality rate) according to the World Health Organization (WHO). Within weeks, SARS spread from Hong Kong to infect individuals in 37 countries in early 2003. For this assignment, we are interested in visualized the spreading of SARS across time and countries. 

The data is from the WHO website, and it consist of SARS cases from March 17, 2003 to July 11, 2003 of about 30 different countries and area. Variables in the data are

* Country
* Date
* The cumulative number of cases
* The number of death
* The number of recovery
* The number of current cases, by subtracting the number of death and the number of recovery from the cumulative number of cases.

## Running Instructions

Access our visualization at [https://github.com/CSE512-16S.github.io/a3-dennis418szsy-xdu2peter-ryansmcgee/](https://github.com/CSE512-16S.github.io/a3-dennis418szsy-xdu2peter-ryansmcgee) or download this repository and run `python -m SimpleHTTPServer 8000` and access this from http://localhost:8000/.

Major interactions include a slider that controls map of which day to be shown, and clicking of a contry to see the corresponding area chart. Some backgroud information is displayed on the left side, and external links of more information are at the top right cornor. 

The data map is quite big so please view it on a large screen/window.

## Story Board

In Tableau, we explored several designs of how to present the data. We think a map representation like this is appropriate.

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/pic/worldmap.png)

Color is used to encode the number of current cases. Dark means a larger population of people having SARS. Tableau has this nice feature that enable you to play a video on how the map changes over time. There is also a slider that controls the date of the map. We think these are nice, and we decided to implement a slider in our interactive visualization. 

To show more than just the current cases, we decide to include area charts that shows the number of death and recovery as well. A scetch using data from the world looks like this,

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/pic/worldAreaChart.png)

We also want to enable viewer to create area chart of individual country like this,

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/pic/ChinaAreaChart.png)

This will be another interactive feature, namely when the viewer click on a country on the map, the corresponding area chart will be drawn besides the world area chart.

The basic overview of the interface is here:

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/pic/newSketch.jpg)

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/pic/proposedNewSketch.png)

## Changes Between the Storyboard and the Final Visualization

Once we implemented the interface, we realized that we want the world map to be as big as possible. Stacking the two area charts decreases the height of the map, so we put them side by side.

![summary](https://github.com/CSE512-16S/a3-dennis418szsy-xdu2peter-ryansmcgee/pic/proposedNewSketch2.png)

Things got move around a little bit. For example, we added a section for the slider that control the world map. Color is tuned for better visual expression. We also added, a title and external links about .


## Development Process
- [x] Data Cleaning
- [x] Create Prototype in Tableau
- [x] Storyboard of the Interface
- [x] Implement Design in D3
