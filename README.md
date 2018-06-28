# StravaData

This is a repo for our info visualization course. It consists of three main visual graphs through which we represent our activities (Runs/Rides).

Bubble Chart
======
The first Graph is a bubble chart through which you can see all the activities and sort the size of each according to specific criteria that a user can choose. 
The Rides are shown in Blue color while the Runs are shown in Green.

Zoomable Sunburst
======
The second graph is a expandable pie chart (zoomable sunburst) which reperesents our activites with respect to time. Each layer of pie chart represents a time layer (year --> Month --> Day --> Activities --> Single activity details)
As shown the graph is build in a hierarchical way. The aim of this graph is not to compare but to illustrate or show an overview (for example see how much progress is done ,etc..)

Geo map
======
The third graph is a map graph animation which represents the a route of a specific activity. 


Interaction between Graphs 
======
 * If you selected a specific activity in the bubble graph, the corresponding route map will be visualized in the Geo map visualization
 * If you select or click on any timespan in the pie chart (for example year :2018 or month: may in Year: 2018 ,etc...), all activities that were within this timespan will be highlighted in the bubble chart.
 
 
 
Files Discription 
======

The repo contains all data that we extracted from the strava account. 
* Bubble chart uses the main JSON file which contains the main data with all the details about each activity
* Expandable pie chart data structure is a hierarchical structure, so we created a script that is listed in the 'TreeStructuredConv' folder that converts the normal JSON file to a desired structured JSON.
* Geo Map visualization uses GeoJSON files to visualize them. Strava just allowed us to get the rides in a gpx files, so we used a library to convert our gpx files to GeoJSON to match with our geo map visualization.

Limitations
======
We have some errors in the project that needs to be enhanced:

* The interaction with the graphs doesn't update automatically, but we have to reclick or refresh the graph to show the corresponding action
* The interaction between the bubble chart and geo map is implemented on an external website, and we had some integration errors to integrate it with this repo's code.


The link for the external website for the interaction between the bubble chart and the geo map :
https://beta.observablehq.com/@salman19/rides-or-runs
