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
    console.log(this.margin);
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



      this.x = d3.scalePoint().domain(['q1','q2','q3','q4']).range([0,this.width]);
      this.y = d3.scaleLinear().domain(d3.extent(this.chartData)).range([this.height,0]);

      const xAxis = (g) =>{
        g.call(d3.axisBottom(this.x));
        g.select('.domain').remove();
        g.selectAll('.tick text').attr('fill','#7f7f7f');
        g.selectAll('.tick line').attr('stroke','#7f7f7f');
      }

      d3.select(this.mount).append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis)

      const yAxis = (g) =>{
        g.call(
          d3.axisLeft(this.y)
            .tickSize(-this.width)
        );
        g.select(".domain").remove();
        // g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#3b3a3e")
        g.selectAll(".tick line").attr("stroke", "#3b3a3e")
        // .attr("stroke-dasharray", "2,2");
        g.selectAll(".tick text")
          .attr("x", 0)
          .attr("dy", -4)
          .attr('fill','#7f7f7f')
          .style('font-family','Roboto')
          .style('font-weight',700)
          .attr("text-anchor", "end");
      }

      d3.select(this.mount)
        .append("g")
          .call(yAxis)
          .append("text")
            .attr("fill", "#7f7f7f")
            .style('font-family','Roboto')
            .style('font-weight',700)
            .attr("y", 0)
            .attr("dy", "0.71em")
            .attr("text-anchor", "start")
            .text("Application Count (case)");

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
