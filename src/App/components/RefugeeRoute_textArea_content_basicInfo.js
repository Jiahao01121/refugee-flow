import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import * as _ from 'underscore';
import $ from "jquery";
import { year } from '../data/warDictionary'
import { color_map } from '../data/routeDictionary';

const routeDescDict = require('../data/route_desc.json');

const Wrapper = styled.div`
  width: 83%;
  position: relative;
  height: ${() => window.innerHeight-60-90 + 'px'};
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
`
const CurrentSituation = styled.div`
  height: 150px;
  overflow-y: scroll;
  top: 50px;
  position: relative;

  &::-webkit-scrollbar{
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }

  &>p{
    font-family: 'Roboto';
    font-size: 13px;
    font-weight: 300;
    color: #ffffff;
    position: relative;
    width: 98%;
  }

  &::before{

    content:${ props => "'" +'Current Situation - '+ props.currentRouteName + "'" };
    font-family: 'Roboto';
    font-size: 25px;
    color: #ffffff;
    font-weight: 100;
    position: fixed;
    top: -10px;
  }
`
const DeathSummary = styled.div`

  top: 120px;
  position: relative;

  &>p{
    font-family: 'Roboto';
    font-size: 25px;
    color: #ffffff;
    font-weight: 100;
    margin-bottom: 10px;
  }
`

const Stats = styled.div`
  height: 25px;
  background: #2f2f4ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  text-align: center;

  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 600;
    font-size: 13px;
    position: relative;
    margin: auto;
    right: 0px;
    padding: 0 10px 0px 20px;
    transform: translateY(-50%);
    text-align: center;
    top: 50%;
    transition: all 300ms
  }

  &>p::before{
    content: "";
    width: 5px;
    height: 5px;
    left: 7px;
    position: absolute;
    border-radius: 50%;
    background: #8383ab;
    top: 50%;
    transform: translateY(-50%);
  }

  &>p::after{
    content: 'Accumulative Death/Missing Count';
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 100;
    position: absolute;
    top: 1px;
    margin-left: 18px;
    width: 220px;
    text-align: left;
  }
`

const ChartContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`

export default class RefugeeRoute_textArea_content_basicInfo extends React.Component {

  constructor(props){
    super(props);
    this.currentRouteName = props.currentRouteName;
    this.route_death_data = props.route_death_data;

    this.description = this.description.bind(this);
    this.calculateDeathTotal = this.calculateDeathTotal.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount(){
    this.drawChart();

  }

  drawChart(){
    d3.select(this.chartContainer).selectAll('svg').remove();
    const margin = {top: 20, right: 15, bottom: 20, left: 35};
    const width = $(this.chartContainer).width() - margin.left - margin.right;
    const height = ($(this.chartContainer).offset().top - $(this.stats).offset().top) - 40
      - margin.top - margin.bottom;

    this.g = d3.select(this.chartContainer).append('svg')
      .attr('width',width+ margin.left + margin.right +'px')
      .attr('height',height + margin.top + margin.bottom+'px')
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const data = Object.values(_.groupBy(this.route_death_data,d => d.year)).map((d,index) =>{
      let value = {
        'total': 0,
        'missing': 0,
        'dead': 0,

        "drowning or exhaustion related death": 0,
        "violent accidental death (transport; blown in minefield...)": 0,
        "authorities related death": 0,
        "unknown - supposedly exhaustion related death": 0,
        "suicide": 0,
        "malicious intent related death / manslaughter": 0,
        "other": 0
      };

      for(let i of d){
        if(i.route === this.currentRouteName){
          value.total += +i.dead_and_missing;
          value.dead += +i.dead;
          value.missing += +i.missing;
          value.year = '201'+index;
          if(i.cause_of_death === "drowning or exhaustion related death") value['drowning or exhaustion related death'] += +i.dead_and_missing;
          if(i.cause_of_death === "violent accidental death (transport; blown in minefield...)") value['violent accidental death (transport; blown in minefield...)'] += +i.dead_and_missing;
          if(i.cause_of_death === "authorities related death") value['authorities related death'] += +i.dead_and_missing;
          if(i.cause_of_death === "unknown - supposedly exhaustion related death") value['unknown - supposedly exhaustion related death'] += +i.dead_and_missing;
          if(i.cause_of_death === "suicide") value['suicide'] += +i.dead_and_missing;
          if(i.cause_of_death === "malicious intent related death / manslaughter") value['malicious intent related death / manslaughter'] += +i.dead_and_missing;
          if(i.cause_of_death === "other") value['other'] += +i.dead_and_missing;
        }
      }
      return value
    });
    const xScale = d3.scaleLinear().domain([0,d3.max(data, d => d.total)]).range([0,width]).nice();
    const yScale = d3.scaleBand().domain(year).rangeRound([height,0]).padding([.3])

    const stack = d3.stack()
      .keys( color_map.map(d => d.key) )
      .order(d3.stackOrderAscending)

    const stackedSeries = stack(data);

    const xAxis = this.g.append("g")
      .attr("transform",`translate(0,${height})`)
      .call(d3.axisBottom(xScale))

    const yAxis = this.g.append("g")
      .call(d3.axisLeft(yScale))

    xAxis.selectAll('text').style('fill','white');
    yAxis.selectAll('text').style('fill','white');

    const bgBar = this.g
      .append('g')
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x",d=> 0 )
      .attr("y",d=>  yScale(d.year) )
      .attr("height",yScale.bandwidth())
      .attr("width",d => xScale(d.total) )
      .attr('fill','white')

    const gSeries = this.g.selectAll("g.series").data(stackedSeries)
      .enter().append("g")
      .attr("class","series")
      .attr('transform',d => yScale(d[1]) )
      .style("fill",(d,i)=> _.find(color_map, _d => _d.key === d.key)['value'])
      .selectAll("rect")
      .data(d=>d)
      .enter().append("rect")
      .attr("x",d=> xScale(d[0]) )
      .attr("y",d=>  yScale(d.data.year) )
      .attr("height",yScale.bandwidth())
      .attr("width",d=> xScale(d[1]) - xScale(d[0]) )


  }

  componentWillReceiveProps(nextProps){
    console.log('update');

    $('#CurrentSituation__text').stop(true,true);
    $('#CurrentSituation__text').scrollTop(0);
    $('#CurrentSituation__text').animate({scrollTop: $('#CurrentSituation__text')[0].scrollHeight}, 25000);

    d3.select('.route-map-titleGroup__basic') && d3.select('.route-map-titleGroup__basic')
      .style('opacity',0)
      .transition()
      .duration(400)
      .style('opacity',1)

    this.currentRouteName = nextProps.currentRouteName;
    this.drawChart();
  }

  description(textArr){
    return textArr.map((d,i) => <p key ={i}>{d}</p>);
  }

  calculateDeathTotal(){
    let total = 0;
    _.groupBy(this.route_death_data,d => d.route)[this.currentRouteName].forEach(d => total += +d.dead_and_missing);
    this.deathTotal = total;
    return d3.format(',')(total);
  }

  render(){
    return(
      <Wrapper className='route-map-titleGroup__basic'>
        <CurrentSituation currentRouteName = {this.currentRouteName} id="CurrentSituation__text"
          onClick={()=> $('#CurrentSituation__text').stop(true,true).scrollTop(0)}>
          {this.description(_.find(routeDescDict,d => d.route === this.currentRouteName).desc)}
        </CurrentSituation>

        <DeathSummary>
          <p>Death Summary - {this.currentRouteName}</p>
          <Stats innerRef={(stats) => {return this.stats = stats }}><p>{this.calculateDeathTotal()}</p></Stats>
          <ChartContainer innerRef={(chartContainer) => {return this.chartContainer = chartContainer }}></ChartContainer>
        </DeathSummary>
      </Wrapper>
    )
  }
}
