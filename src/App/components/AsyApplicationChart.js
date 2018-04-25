import React from 'react';
import styled, { css } from 'styled-components';
import * as warDict from '../data/warDictionary';

import * as d3 from 'd3';
import * as _ from 'underscore';
import $ from "jquery";

class AsyApplicationChart extends React.Component {
  constructor(props){
    super(props);

    this.margin = this.props.margin;
    this.width = this.props.width;
    this.height = this.props.height;
    this.chartData = this.props.chartData;
    this.x = this.props.x;
    this.y = this.props.y;

    this.drawChart = this.drawChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.width = nextProps.width;
    this.height = nextProps.height;
    this.chartData = nextProps.chartData;
    this.x = nextProps.x;
    this.y = nextProps.y;
  }

  componentDidMount(){
    this.drawChart()
  }

  drawChart(){
      this.quaterList = ['q1','q2','q3','q4'];
      // setup scaler
      this.x = d3.scalePoint().domain(this.quaterList).range([0,this.width]);
      this.y = d3.scaleLinear().domain([0,d3.max(this.chartData)]).range([this.height,0]);
      // this.y = d3.scalePow().exponent(2).domain([0,d3.max(this.chartData)]).range([this.height,0]);
      // this.y = d3.scaleLog().domain([1000,d3.max(this.chartData)]).range([this.height,0]).base(2);
      //draw X axis
      const xAxis = (g) =>{
        g.call(d3.axisBottom(this.x).tickFormat(function(d) {
            return d.toUpperCase();
          })
        );
        g.select('.domain').remove();
        g.selectAll('.tick text')
          .attr("dy", 10)
          .attr('fill','#7f7f7f')
          .style('font-family','Roboto')
          .style('font-weight',700)

        g.selectAll('.tick line')
          .attr('stroke','#7f7f7f')
          .attr("y2", 4)
          .attr('stroke-width',2);
        g.selectAll(".tick:first-of-type line").remove()
        g.selectAll(".tick:last-of-type line").remove()
      }
      d3.select(this.mount).append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis)

      //draw Y axis
      const yAxis = (g) =>{
        g.call(
          d3.axisLeft(this.y)
            .tickSize(-this.width)
            .tickFormat(function(d) {
              var s = d3.format(".2s")(d)
              return s;
            })
        );

        g.select(".domain").remove();

        g.selectAll(".tick line").attr("stroke", "#3b3a3e")

        g.selectAll(".tick:first-of-type text").remove()

        g.selectAll(".tick:first-of-type line")
          .attr('stroke','#7f7f7f')
          .attr('stroke-width',2);

        g.selectAll(".tick text")
          .attr("x", -8)
          .attr("dy", 4)
          .attr('fill','#7f7f7f')
          .style('font-family','Roboto')
          .style('font-weight',700)
          .attr("text-anchor", "end");

        g.selectAll(".tick:last-of-type")
          .append("text")
          .attr("fill", "#7f7f7f")
          .style('font-family','Roboto')
          .style('font-weight',700)
          .attr("dy", 4)
          .attr("text-anchor", "start")
          .text("Application Count (case)");

        g.selectAll(".tick:last-of-type line")
          .attr('x1',120);
      }
      d3.select(this.mount)
        .append("g")
          .call(yAxis)

      // draw Asylum application line
      d3.select(this.mount).append("path")
        .datum(this.chartData)
        .attr("fill", "none")
        .attr("stroke", "#41edb8")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d",
          d3.line()
            .x((d,i) => this.x(this.quaterList[i]) )
            .y( d => this.y(d) )
            .curve(d3.curveCardinal.tension(0))
        );

      // draw Asylum application point
      d3.select(this.mount)
        .selectAll('.null')
        .data(this.chartData)
        .enter()
        .append("circle")
        .attr("fill", "#41edb8")
        .attr("stroke", "#1b1f3a")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 3)
        .attr('cx',(d,i) => this.x(this.quaterList[i]) )
        .attr('cy', d => this.y(d) )
        .attr('r',5)

      // draw Asylum application avg
      d3.select(this.mount)
        .append('g')
        .attr('class','asy-stats')
        .call((g) =>{

          // draw avg
          g.append("line")
            .attr("stroke", "#41edb8")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1)
            .attr("x1", 0)
            .attr("x2",this.width)
            .attr("y1",this.y(this.chartData.reduce((a,c) => a+c ) / 4))
            .attr("y2",this.y(this.chartData.reduce((a,c) => a+c ) / 4));

          g.append("text")
            .attr('x',0)
            .attr("y",this.y(this.chartData.reduce((a,c) => a+c ) / 4))
            .text('Avg')
            .attr("fill",'#41edb8')
            .style('font-family','Roboto')
            .style('font-weight',400)
            .style('font-size','10px')
            .attr("text-anchor", "end");

          g.append("text")
            .attr('x',0)
            .attr("y",this.y(this.chartData.reduce((a,c) => a+c ) / 4))
            .attr('dy',15)
            .text(
              d3.format(".2s")( this.chartData.reduce((a,c) => a+c ) / 4 )
            )
            .attr("fill",'#41edb8')
            .style('font-family','Roboto')
            .style('font-weight',400)
            .style('font-size','10px')
            .attr("text-anchor", "end");
        })

  }



  render(){
    return(
      <g
        transform = {"translate(" + this.margin.left + "," + this.margin.top + ")"}
        ref={(mount) => {return this.mount = mount }}
        >

      </g>
    )

  }
}

export default AsyApplicationChart;
