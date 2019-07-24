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
  &>p::selection {
    text-shadow: 0 0 0.8rem #de2279;
    background: rgba(54,56,126,0.1);
    color: white;
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
const DataSource = styled.div`
  fill: white;
  position: absolute;
  right: 0;
  cursor: pointer;
  opacity: 0.8;
  transition: all 200ms;
  top: ${props => props.top};
  &:hover{
    opacity: 1;
  }

  &::before{
    content: 'Data Sources';
    position: relative;
    color: #fff;
    right: 10px;
    bottom: 0;
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 300;
  }
`
const DeathSummary = styled.div`

  top: 90px;
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
  background: #351f1fb3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  text-align: center;
  &>p{
    font-family: 'Roboto';
    color: #ef6464;
    font-weight: 600;
    font-size: 18px;
    position: relative;
    margin: auto;
    right: 0px;
    padding: 0px 15px 3px 25px;
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
    background: #ef6464;
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
    top: 10px;
    margin-left: 28px;
    width: 220px;
    text-align: left;
  }
`
const ChartContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`
const ChartController = styled.div`
  height: 25px;
  border-radius: 4px;
  position: relative;
  top: 80px;

  &::before{
    content: 'Breakdown By:';
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 300;
    font-style: italic;
    position: absolute;
    top: -30px;
    left: 0;
    text-align: left;
  }
`
const ChartControllerButton = styled.p`
  &::selection {
    text-shadow: none;
    background: none;
    color: none;
  }
  cursor: pointer;
  position: absolute;
  color: white;
  font-family: 'Roboto';
  margin-top: 0px;
  padding: 3px 10px 5px 10px;
  border-radius: 3.5px;
  transition: all 400ms;

  background:${props => {
    if(props.mode - 1 == props.index) return '#606096'
    else return '#28283c'
  }};
  border-bottom: ${props => {
    if(props.mode - 1 == props.index) return '3px #ef6363 solid'
    else return '1px #4e5d9a solid'
  }};
  left: ${props => props.button2W*(props.index) + 'px' };
  &:hover{
    border-width: 4px;
    background: #3b425a;
    color: #e8eaff;
  }

`

export default class RefugeeRoute_textArea_content_basicInfo extends React.Component {

  constructor(props){
    super(props);
    this.currentRouteName = props.currentRouteName;
    this.route_death_data = props.route_death_data;

    this.description = this.description.bind(this);
    this.calculateDeathTotal = this.calculateDeathTotal.bind(this);
    this.drawChart = this.drawChart.bind(this);
    this.handleChartMode = this.handleChartMode.bind(this);
    this.state = {
      ChartControllerWidth : 0,
      mode: 1,
    }
  }

  componentDidMount(){
    this.setState({ChartControllerWidth:$(this.ChartController).width()});
    this.drawChart();
  }

  drawChart(){

    d3.select(this.chartContainer).selectAll('svg').remove();

    const margin = {top: 20, right: 15, bottom: 20, left: 35};
    const width = $(this.chartContainer).width() - margin.left - margin.right;
    const height = ($(this.chartContainer).offset().top - $(this.stats).offset().top) - 100
      - margin.top - margin.bottom;

    this.g = d3.select(this.chartContainer).append('svg')
      .attr('overflow',"visible")
      .attr('width',width+ margin.left + margin.right +'px')
      .attr('height',height + margin.top + margin.bottom+'px')
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // transform data into viz data structure
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
    const yScale = d3.scaleBand().domain(year).rangeRound([height,0]).padding([.3]);
    const xAxis = this.g.append("g").attr("transform",`translate(0,${height -10})`).call(d3.axisBottom(xScale));
    const yAxis = this.g.append("g").call(d3.axisLeft(yScale));
    xAxis.selectAll('text').style('fill','white');
    xAxis.selectAll('line').remove();
    xAxis.selectAll('path').remove();
    yAxis.selectAll('text').style('fill','white');
    yAxis.selectAll('line').remove();
    yAxis.selectAll('path').remove();


    const stack = d3.stack().keys( color_map.map(d => d.key) );
    const stackedSeries = stack(data);
    const ratio = d3.stack().keys(['dead','missing'])(data);
    // total fatality

    if(this.state.mode == 1){
      // total fatality
      this.totalFat = this.g
        .append('g')
        .selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr('rx',3)
        .attr("x",d=> 0 )
        .attr("y",d=>  yScale(d.year) )
        .attr("height",yScale.bandwidth())
        .style('fill','#47478aad');

      this.totalFat.attr('width',0)
        .transition()
        .duration(600)
        .attr("width",d =>{
          console.log(d);
          return xScale(d.total)
        }  )
        .style('transition','fill 400ms')

      this.totalFat
      .on('mouseenter',function(d){

          d3.select(this).style('fill','#9292efad')
          const x = d3.mouse(this)[0];
          const y = d3.mouse(this)[1];
          const tooltopW = 170;
          const tooltopH = 20;
          d3.select(this.parentNode).append('rect')
            .attr('id','chartTooltip')
            .attr('rx',3)
            .attr("x",x + 15)
            .attr("y",y)
            .attr('width',tooltopW)
            .attr('height',0)
            .style('fill','rgb(255,255,255)')
            .style('opacity',0)
            .transition()
            .duration(400)
            .style('opacity',.7)
            .attr('height',tooltopH)
            .on('interrupt',function(){
              d3.select(this).style('opacity',.7)
            })

          d3.select(this.parentNode).append('text')
          .attr('id','chartTooltip__text')
          .attr("x",x + 10 + 15)
          .attr("y",y+(tooltopH/2) + 5)
          .style('opacity',0)
          .transition()
          .ease(d3.easePolyIn)
          .duration(300)
          .style('opacity',1)
          .style('fill','#191938')
          .style('font-size','12px')
          .style('font-family','Roboto')
          .text('Total Death & Missing: '+d3.format(',')(d.total))

        })
      .on('mouseout',function(){
          d3.select(this).style('fill','#47478aad');

          d3.select('#chartTooltip').remove()
          d3.select('#chartTooltip__text').remove()
        })

    }
    else if(this.state.mode == 2){
      // incident type
      this.incidentType = this.g.selectAll("g.series").data(stackedSeries)
        .enter().append("g")
        .attr("class","series")
        .attr('transform',d => yScale(d[1]) )
        .style("fill",(d,i)=> _.find(color_map, _d => _d.key === d.key)['value'])
        .selectAll("rect")
        .data(d=>d)
        .enter().append("rect")
        .attr('rx','.2%')
        .attr("y",d=>  yScale(d.data.year))
        .attr("x",d=> xScale(d[0]) )
        .attr("height",yScale.bandwidth());

      this.incidentType
        .attr("width",0)
        .transition()
        .duration(400)
        .attr("width",d=> xScale(d[1]) - xScale(d[0]) )

      this.incidentType

        .on('mouseenter',function(d){

          const x = d3.mouse(this)[0];
          const y = d3.mouse(this)[1];
          const tooltopW = 370;
          const tooltopH = 200;

          const text_g = d3.select(this.parentNode.parentNode)
          .append('g').attr('id','chartTooltip__text')

          text_g.append('rect')
            .attr('id','chartTooltip__text__rect')
            .attr('rx',3)
            .attr("x",width - tooltopW)
            .attr("y",height - tooltopH - 20)
            .attr('width',tooltopW)
            .attr('height',0)
            .style('fill','rgb(255,255,255)')
            .style('opacity',0)
            .transition()
            .duration(400)
            .style('opacity',1)
            .attr('height',tooltopH)
            .on('interrupt',function(){
              d3.select(this).style('opacity',1)
            })


          text_g
            .append('text')
            .attr("x",width - tooltopW + 10)
            .attr("y",height - tooltopH)
            .style('opacity',0)
            .transition()
            .ease(d3.easePolyIn)
            .duration(300)
            .style('opacity',1)
            .style('fill','#191938')
            .style('font-size','16px')
            .style('font-family','Roboto')
            .style('font-weight','700')
            .text(d.data.year+' Incident Type Summary:')

          color_map.map(d => d.key).forEach((ele,index) =>{

            text_g
              .append('text')
              .attr("x",width - tooltopW + 10)
              .attr("y",height - tooltopH + 25*(index+1) + 2)
              .style('opacity',0)
              .transition()
              .ease(d3.easePolyIn)
              .duration(300)
              .style('opacity',1)
              .style('fill','#191938')
              .style('font-size','12px')
              .style('font-family','Roboto')
              .style('font-weight','400')
              .style('text-transform', 'capitalize')
              .text(ele +':')

              text_g
                .append('text')
                .attr("x",width - 10)
                .attr("y",height - tooltopH + 25*(index+1))
                .style('opacity',0)
                .transition()
                .ease(d3.easePolyIn)
                .duration(300)
                .style('opacity',.7)
                .style('text-shadow',() => "3px 3px 0.6rem "+ _.find(color_map, _d => _d.key === ele)['value'])
                .style('fill','#1d1d29f7')
                .style('font-size','15px')
                .style('font-family','Roboto')
                .style('font-weight','600')
                .attr('text-anchor','end')
                .text(d3.format(',')(d.data[ele]))
          })
        })

        .on('mouseout',function(){
          const xStart = d3.select('#chartTooltip__text__rect').attr('x');
          const yStart = d3.select('#chartTooltip__text__rect').attr('y');
          const xEnd = +d3.select('#chartTooltip__text__rect').attr('x') + +d3.select('#chartTooltip__text__rect').attr('width');
          const yEnd = +d3.select('#chartTooltip__text__rect').attr('y') + +d3.select('#chartTooltip__text__rect').attr('height');

          const mx = d3.mouse(this)[0];
          const my = d3.mouse(this)[1];

          if((mx > xStart && mx < xEnd) && (my > yStart && my < yEnd)){
            d3.select('#chartTooltip__text').on('mouseout',() => {
              console.log('ssa');
              d3.select('#chartTooltip__text').remove()
            })
          }
          else{
            d3.select('#chartTooltip__text').remove()
          }
        })

    }
    else if(this.state.mode == 3){
      // death/missing ratio
      const colorCode = {
        0: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
        1: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
      }
      this.d_m_ratio = this.g.selectAll('g.ratio_series').data(ratio)
        .enter().append("g")
        .attr("class","series")
        .attr('transform',d => yScale(d[1]) )
        .style("fill",(d,i)=> colorCode[i])
        .selectAll("rect")
        .data(d=>d)
        .enter().append("rect")
        .attr("x",d=> xScale(d[0]) )
        .attr("y",d=>  yScale(d.data.year) )
        .attr('rx','.2%')
        .attr("height",yScale.bandwidth());

      this.d_m_ratio
        .attr('width',0)
        .transition()
        .duration(400)
        .attr("width",d=> xScale(d[1]) - xScale(d[0]) )

      this.d_m_ratio
      .on('mouseenter',function(d){

        const x = d3.mouse(this)[0];
        const y = d3.mouse(this)[1];
        const tooltopW = 230;
        const tooltopH = 55;

        const text_g = d3.select(this.parentNode.parentNode).append('g').attr('id','chartTooltip__text');

        text_g.append('rect')
          .attr('rx',3)
          .attr("x",x+ 10)
          .attr("y",y)
          .attr('width',tooltopW)
          .attr('height',0)
          .style('fill','rgb(255,255,255)')
          .style('opacity',0)
          .transition()
          .duration(400)
          .style('opacity',1)
          .attr('height',tooltopH)
          .on('interrupt',function(){
            d3.select(this).style('opacity',1)
          })

        text_g
          .append('text')
          .attr("x",x + 22)
          .attr("y",y+ 12)
          .style('opacity',0)
          .transition()
          .ease(d3.easePolyIn)
          .duration(300)
          .style('opacity',1)
          .style('fill','#191938')
          .style('font-size','13px')
          .style('font-family','Roboto')
          .style('font-weight','600')
          .text(d.data.year+' Death / Missing Ratio');

          // death text
          text_g
            .append('text')
            .attr("x",x + 22)
            .attr("y",y+ 25)
            .style('opacity',0)
            .transition()
            .ease(d3.easePolyIn)
            .duration(300)
            .style('opacity',1)
            .style('fill','#191938')
            .style('font-size','12px')
            .style('font-family','Roboto')
            .style('font-weight','400')
            .text('Death')
          // death num
          text_g
            .append('text')
            .attr("x",x + 22)
            .attr("y",y+ 45)
            .style('opacity',0)
            .transition()
            .ease(d3.easePolyIn)
            .duration(300)
            .style('opacity',.7)
            .style('fill','#1d1d29f7')
            .style('font-size','15px')
            .style('font-family','Roboto')
            .style('font-weight','600')
            .style('fill',colorCode['0'])
            .text(d3.format(',')(d.data['dead']) +' ('+ d3.format('.1%')( d.data['dead']/d.data['total'] )+')')

          // missing text
          text_g
            .append('text')
            .attr("x",x + tooltopW/2 + 30)
            .attr("y",y+ 25)
            .style('opacity',0)
            .transition()
            .ease(d3.easePolyIn)
            .duration(300)
            .style('opacity',1)
            .style('fill','#191938')
            .style('font-size','12px')
            .style('font-family','Roboto')
            .style('font-weight','400')
            .text('Missing')

            // missing num
            text_g
              .append('text')
              .attr("x",x + tooltopW/2 + 30)
              .attr("y",y+ 45)
              .style('opacity',0)
              .transition()
              .ease(d3.easePolyIn)
              .duration(300)
              .style('opacity',.7)
              .style('fill','#1d1d29f7')
              .style('font-size','15px')
              .style('font-family','Roboto')
              .style('font-weight','600')
              .style('fill',colorCode['1'])
              .text(d3.format(',')(d.data['missing'])  +' ('+ d3.format('.1%')( d.data['missing']/d.data['total'] )+ ')')
      })
      .on('mouseout',function(){
        d3.select('#chartTooltip__text').remove()
      })

    }

  }

  componentWillReceiveProps(nextProps){
    $('#CurrentSituation__text').stop(true,true);
    $('#CurrentSituation__text').scrollTop(0);
    $('#CurrentSituation__text').animate({scrollTop: $('#CurrentSituation__text')[0].scrollHeight}, 25000);

    if(nextProps.currentRouteName != this.currentRouteName){
      this.currentRouteName = nextProps.currentRouteName;
      console.log(nextProps);
      console.log('update');
      d3.select('.route-map-titleGroup__basic') && d3.select('.route-map-titleGroup__basic')
        .style('opacity',0)
        .transition()
        .duration(400)
        .style('opacity',1)
      this.drawChart();
    }
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

  handleChartMode(m){
    if(this.state.mode != m) this.setState({'mode':m},() => this.drawChart());
  }

  render(){
    console.log('remd');
    return(
      <Wrapper className='route-map-titleGroup__basic'>
        <CurrentSituation currentRouteName = {this.currentRouteName} id="CurrentSituation__text"
          onClick={()=> $('#CurrentSituation__text').stop(true,true).scrollTop(0)}>
          {this.description(_.find(routeDescDict,d => d.route === this.currentRouteName).desc)}
        </CurrentSituation>

        <DeathSummary>
          <p>Incident Summary - {this.currentRouteName}</p>
          <Stats innerRef={(stats) => {return this.stats = stats }}><p>{this.calculateDeathTotal()}</p></Stats>

          <ChartController innerRef={(ChartController) => {return this.ChartController = ChartController }}>
            <ChartControllerButton
               ChartControllerWidth = {this.state.ChartControllerWidth}
               index="0"
               innerRef={(button2) => {return this.button2 = button2 }}
               button2W = {$(this.button2).width()}
               mode={this.state.mode}
               onClick={() => {this.handleChartMode(1)}}>Total Fatality </ChartControllerButton>
            <ChartControllerButton
               ChartControllerWidth = {this.state.ChartControllerWidth}
               index="1"
               innerRef={(button2) => {return this.button2 = button2 }}
               button2W = {$(this.button2).width()}
               mode={this.state.mode}
               onClick={() => {this.handleChartMode(2)}}>Incident Type</ChartControllerButton>
            <ChartControllerButton
               ChartControllerWidth = {this.state.ChartControllerWidth}
               index="2"
               innerRef={(button2) => {return this.button2 = button2 }}
               button2W = {$(this.button2).width()}
               mode={this.state.mode}
               onClick={() => {this.handleChartMode(3)}}>Death/Missing Ratio</ChartControllerButton>
          </ChartController>
          <ChartContainer innerRef={(chartContainer) => {return this.chartContainer = chartContainer }}></ChartContainer>
        </DeathSummary>
      </Wrapper>
    )
  }
}
