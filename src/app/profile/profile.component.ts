import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { EmitterService } from '../shared/emitter.service';
import { MapService } from '../shared/map.service';

import * as d3 from 'd3'; 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";


import * as L from 'leaflet';
import { Map } from 'leaflet';

import {Selection, select } from 'd3-selection';
import {transition} from 'd3-transition';

import { LeafletmapComponent } from '../leafletmap/leafletmap.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ MapService ]
})

export class ProfileComponent implements OnInit {

  public margin = {top: 50, right: 40, bottom: 50, left: 40};
  public width: number;
  public height: number;
  public x: any;
  public y: any;
  public svg: any;
  public line: d3Shape.Line<[number, number]>;
  public area: d3Shape.Area<[number, number]>;
  public incomingData:Array<any>;
  public nodeLabel:Array<any>;
  public peakData:any;
  public riverData:any;

  public xSCALE: any;
  public ySCALE: any;

  public xAxis: any;
  public yAxis: any;

  public xScale: any;
  public yScale: any;
  public chart: any;
  public update;
  public counter = 0;
  
  public mouseEventsMarkers:L.FeatureGroup;
  public map: Map;
  
  constructor(public _emitterService: EmitterService, public _mapService: MapService,) {
    
    this.width = 800 - this.margin.left - this.margin.right ;
    this.height = 400 - this.margin.top - this.margin.bottom;

    this._emitterService.case$.subscribe( newdata => this.switch(newdata) );

  }

  /**
   * Method makes decision on all incoming data (from the leaflet map component)
   * The first condition recieves the map intialized from the lealfet map.
   * This is important in displaying markers on mouseover on the elevation profile.
   * 
   * The else condition passes to the create elevation profile where further decisons are made based on the 
   * property of the incoming data.
   * 
   * Enoch
   * @param newdata 
   */
  switch(newdata) {
    if (newdata.hasOwnProperty("leafletmap")) {
      this.map = newdata;
    } else { this.incomingData = newdata; this.createElevationProfile() }
  }

  ngOnInit() {
    this.update = false;
    this.incomingData = [];   
    this.initSvg();
  }
 
   public initSvg() {
    this.svg = d3.select("svg")
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    }


    /**
     * Method recieves all incoming data and check its properties.
     * If data is not peaks or river data, Scale the axis with the elevation data,
     * then draw the svg axis based on the data and plot the profile.
     * 
     * Enoch
     */
  public createElevationProfile(){

    // If data is an edited label data, remove existing node labels and re-append 
    if ( (this.incomingData.hasOwnProperty("editedLabel")) ) {

      console.log("Label Edited...");

      this.svg.selectAll('#nodeLabels').remove();
      let newLabel:any = this.incomingData;
      this.nodeLabel[newLabel.index].name = newLabel.editedLabel;
      this.appendNodeLabels();

    }
    
    // If data is not peaks or river data, then draw the svg axis based on the data and plot the profile
    
    else if ( !((this.incomingData.hasOwnProperty("river")) || this.incomingData.hasOwnProperty("peak")) ) {
    
      this.nodeLabel = [];
      let tempLabel = "";
      for ( let i = 0; i < this.incomingData.length; i++ ) {
        if ( this.incomingData[i].node === "Y" ) {
          if ( !(this.incomingData[i].name === tempLabel) )
              { this.nodeLabel.push( {x: this.incomingData[i].x, name: this.incomingData[i].name, index: i} ) }
        } tempLabel = this.incomingData[i].name;
      }

      // Scale the axis with the elevation data
      this.xScale = d3Scale.scaleLinear()
          .domain([0, d3.max(this.incomingData, function(d) { return d.x; })])
          .range([0, this.width]);

      this.yScale = d3Scale.scaleLinear()
          .domain([0, d3.max(this.incomingData, function(d) { return d.y; })])
          .range([this.height, 40]);

      this.xAxis = d3Axis.axisBottom(this.x).scale(this.xScale);
      this.yAxis = d3Axis.axisLeft(this.y).scale(this.yScale);

      var xScale = this.xScale;                    
      var yScale = this.yScale;

      // Draws line and area chart, does not append yet
      this.area = d3.area()
          .curve(d3.curveMonotoneX)
          .x(function(d:any) { return xScale(d.x); })
          .y0(this.height)
          .y1(function(d:any) { return yScale(d.y); });

      this.line = d3Shape.line()
          .curve(d3.curveMonotoneX)
          .x( (d: any) => xScale(d.x) )
          .y( (d: any) => yScale(d.y) );

      // Append the axis to the svg if update is false and ....
      if (this.update === false) {

          console.log("Drawing Profile...");

          this.svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + this.height + ")")
              .call(this.xAxis);

          this.svg.append("g")
              .attr("class", "y axis")
              .call(this.yAxis);
          
          // Finish profile draw
          this.appendPlotArea();
          this.appendNodeLabels();
              
        } else if (this.update === true) {  this.updateElevationProfile() }
    
      this.update = true; // Make Update true 

    }  else { this.insertlabels() }

 }

 /**
  * Method appends labels for the peak and the river
  * 
  * Enoch
  */
 public insertlabels() {

    var xScale = this.xScale;                    
    var yScale = this.yScale;
  
    if ( this.incomingData.hasOwnProperty("river") ) {

      //-------------------------------------------o
      this.riverData = this.incomingData;
      let river:Array<any> = this.riverData.river;
      //-------------------------------------------o

      if (river.length > 0) {
        var riverLabels = this.svg.selectAll("g rivers").data(river); 
        var riverLabelsEnter = riverLabels.enter().append("g");
        var circle = riverLabelsEnter.append("circle")
          .attr("r", 5)
          .attr('cx', function(d:any) { return xScale(d.x); })
          .attr('cy', function(d:any) { return yScale(d.y); })
          .attr("id", "rivers")
          .attr("fill", "blue")
          
        riverLabelsEnter.append("text")
          .text( (d: any) => (d.name) )
          .attr("id", "rivers")
           .attr("transform", function(d){
            var x = xScale(d.x);
            var y = yScale(d.y - 10);
            return "translate(" + x + "," + y + ") rotate(90)" })
          .attr("font_family", "sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "darkblue");
      }
    }

    if ( this.incomingData.hasOwnProperty("peak") ) {

      // -------------------------------------------
      this.peakData = this.incomingData;
      let peak:Array<any> = this.peakData.peak;
      // ------------------------------------------- 

      if (peak.length > 0) {
        let peakLabels = this.svg.selectAll("g peaks").data(peak); 
        let peaksLabelsEnter = peakLabels.enter().append("g");  
        let circle = peaksLabelsEnter.append("circle")
          .attr("r", 5)
          .attr('cx', function(d:any) { return xScale(d.x); })
          .attr('cy', function(d:any) { return yScale(d.y); })
          .attr("id", "peaks")
          .attr("fill", "black");
          
        peaksLabelsEnter.append("text")
          .text( (d: any) => (d.name) )
          .attr("id", "peaks")
          .attr("transform", function(d){
            let x = xScale(d.x);
            let y = yScale(d.y) - 10;
            return "translate(" + x + "," + y + ") rotate(-45)" })
          .attr("font_family", "sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "purple");
      }
    }
 }

 /**
  * Method will update the elevation profile by removing items with id or class on the svg item
  * and then re-append the plot area and node labels.
  * 
  * Enoch
  */
  public updateElevationProfile() {

      console.log("Updating Profile...");

      let updateLine = this.svg.selectAll('.line').remove();
      let updateArea = this.svg.selectAll('.area').remove();
      this.svg.selectAll('#peaks').remove();
      this.svg.selectAll('#rivers').remove();
      this.svg.selectAll('#nodeLabels').remove();
      this.svg.selectAll('#hiddenTicks').remove();
 
      this.appendPlotArea();
      this.appendNodeLabels();         

      this.svg.selectAll("g .y.axis").transition()
          .call(this.yAxis);

      this.svg.selectAll("g .x.axis").transition()
          .call(this.xAxis);
    
  }

  /**
   * Method serves the whole class by appending node labels wherever it is called from
   * 
   * Enoch
   */
  public appendNodeLabels() {

    let xScale = this.xScale;
    let yScale = this.yScale;

    let labels = this.svg.selectAll("g nodeTexts")
                .data(this.nodeLabel)
            
    let labelsEnter = labels.enter()
      .append("g")
      
    let circle = labelsEnter.append("circle")
      .transition().delay(250)
      .attr("id", "nodeLabels")
      .attr("r", 20)
      .attr('cx', function(d:any) { return xScale(d.x); })
      .attr("fill", "red");

    labelsEnter
      .append("text")
      .transition().delay(250)
      .attr("id", "nodeLabels")
      .attr('dx', function(d:any) { return xScale(d.x); })
      .attr('dy', 20/4)
      .attr("text-anchor", "middle")
      .text(function(d){return d.name})
      .attr("stroke", "white");

    labelsEnter
      .append("line")
      .transition().delay(250)
      .style("stroke", "darkgrey")
      .filter(function(d) { return d.x > 0 })
      .attr("id", "nodeLabels")
      .attr("x1", (d: any) => xScale(d.x) )
      .attr("x2", (d: any) => xScale(d.x) )
      .attr("y1", this.height )
      .style("stroke-dasharray", ("7, 7"))
      .attr("y2", +30 );

  } // Append NodeLabels

  /**
   * Method serves the whole class by plotting the profile wherever it is called from.
   * The profile consist of the area chart, and a line (stroked red) and 
   * an hidden line chart used for mouse over
   * 
   * Enoch
   */
  public appendPlotArea() {

    //----------------------------------------
    let data = this.incomingData;
    let svg = this.svg;
    let xScale = this.xScale;
    let yScale = this.yScale;
    //----------------------------------------
    let map = this.map;
    let markers:any;
    this.mouseEventsMarkers = new L.FeatureGroup(markers);
    let eventMarkers = this.mouseEventsMarkers;
    map.addLayer(eventMarkers);
    let markerIcon = L.icon({ iconUrl: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png', 
                              iconSize: [30,30],
                              iconAnchor: [15,35]});
    //----------------------------------------                               
    this.svg.append("path")
        .datum(this.incomingData)
        .attr("class", "line")
        .attr("d", this.line)
        .attr('stroke','red')
        .attr("fill", "none");
     
    this.svg.append("path")
        .datum(this.incomingData)
        .attr("class", "area")
        .attr("d", this.area)
        .attr("fill", "lightsteelblue")
        .on("mouseenter",

          /**
           * Mouse over event for displaying the XYZ, and marker on the leaflet map
           * The leaflet map have been initialized as soon as the leaflet map component renders the map.
           * 
           * Enoch
           */
          function () {

            //------------Display Marker on Map---------------------
            // 1. Get x, y on svg
            var mouse = d3.mouse(this);
            // 2. Map to x and Y axis
            var mouseX = xScale.invert(mouse[0]);
            var mouseY = yScale.invert(mouse[1]);
            // 3. Get the closest point on the graph data
            var nearest = (closest(data,mouseX));
            // 4. Create marker and add to layer
            var marker = L.marker([nearest.geometry.lng, nearest.geometry.lat], {icon: markerIcon });
            eventMarkers.addLayer(marker);
            //------------oooooooooooooooooooooo---------------------

            //------Display Text and Circle on the Profile-----------
            // 1. Format x,y,z number data
            var lng = Math.round(nearest.geometry.lng * 100) / 100;
            var lat = Math.round(nearest.geometry.lat * 100) / 100;
            var alt = nearest.geometry.alt|0;
            //2. Show XYZ figures
            svg.append("g")
              .append("text")
              .text("X: " + lng + " | " + "Y: " + lat + " | " + "Z: " + alt+"m")
              .attr("id", "tips")
              .attr("class", "tips")
              .attr('dx', xScale(nearest.x))
              .attr('dy', yScale(nearest.y)-10)
              .attr("text-anchor", "middle");
            //3. Append circles
            svg.append("g")
              .append("circle")
              .attr("r", 3)
              .attr('cx', xScale(nearest.x))
              .attr('cy', yScale(nearest.y))
              .attr("id", "tips")
              .attr("fill", "red")
            
          // Get closest point on data
          function closest(array,num){
            var i=0, minDiff=1000, ans;
            for(var i = 0; i < array.length; i++){ var m=Math.abs(num-array[i].x);
                if( m<minDiff ){ minDiff=m; ans=array[i]} } return ans
          }  
        })
      .on("mouseleave", d => this.handleMouseOut(eventMarkers));
        
      let hidden = this.svg.selectAll("g hiddenTicks")
          .data(this.incomingData);
      let hiddenEnter = hidden.enter()
          .append("g");

      let circle = hiddenEnter.append("line")
          .style("stroke", "lightsteelblue")
          .attr("id", "hiddenTicks")
          .attr("x1", (d: any) => xScale(d.x) )
          .attr("x2", (d: any) => xScale(d.x) )   
          .attr("y1", this.height )  
          .attr("y2", (d: any) => yScale(d.y) );
  }

  /**
   * Method will Clear markers on the map and 
   * remove the XYZ tips on the elevation profile chart on mouse out.
   * 
   * Enoch
   * @param eventMarkers 
   */
  public handleMouseOut(eventMarkers) {
    eventMarkers.clearLayers();
    this.svg.selectAll('#tips').remove();
  }
  
} // Profile Class