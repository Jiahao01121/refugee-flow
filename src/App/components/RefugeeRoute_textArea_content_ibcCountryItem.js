import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import { countryList, year } from '../data/warDictionary';
import * as _ from 'underscore';
import $ from "jquery";

const Wrapper = styled.div`
  height: 150px;
  width: 98%
  background: #1e1e33;
  box-shadow: 4px 7px 58px -15px rgba(0,0,0,0.75);
  border-radius: 5px;
  margin-top: 15px;
`

const CountryName = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 300;
  color: white;
  top: 20px;
  left: 30px;
  margin: 0;
  position: relative;
  width: 100%;
`
const Region = styled.p`
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 100;
  left: 30px;
  color: white;
  position: relative;
  width: 200px;
  top: 9px;
`

const Stats = styled.div`
  cursor: pointer;
  left: 30px;
  height: 20px;
  background: #54547ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  text-align: center;
  top: 45px;
  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 600;
    font-size: 13px;
    position: relative;
    margin: auto;
    right: 0px;
    padding: 0 5px 0px 20px;
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
    content: 'total acrossing';
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 100;
    position: absolute;
    top: 1px;
    margin-left: 11px;
    width: 220px;
    text-align: left;
  }

  &:hover{
    background: #54547a;
  }
`
const BorderLocation = styled.div`
  cursor: pointer;
  left: -32px;
  height: 20px;
  background: #54547ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  text-align: center;
  top: 18px;
  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 400;
    font-size: 13px;
    position: relative;
    margin: auto;
    right: 0px;
    padding: 0 5px;
    transform: translateY(-50%);
    text-align: center;
    top: 50%;
    transition: all 300ms
  }
  &>p::after{
    content: 'Border';
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 100;
    position: absolute;
    top: 1px;
    margin-left: 8px;
    width: 220px;
    text-align: left;
  }

  &:hover{
    background: #54547a;
  }
`
const ChartContainer = styled.div`
  width: 60%;
  position: relative;
  left: 39%;
  height: 150px;
  margin-top: -73px;
  &>p{
    position: relative;
    top: 22px;
    color: white;
    font-weight: 200;
    font-family: 'Roboto';
    font-size:  16px;
  }

  &>svg{
    position: absolute;
    bottom: 5px;
  }

`
export default class RefugeeRoute_textArea_content_ibcCountryItem extends React.Component {

  constructor(props){
    super(props);
    this.data = props.data;
    this.margin = {top: 20, right: 20, bottom: 30, left: 30};
  }

  componentDidMount() {

    this.width = $(this.svg).width() - this.margin.left - this.margin.right;
    this.height = $(this.svg).height() - this.margin.top - this.margin.bottom;

    let arr = [];
    year.forEach(key => {

      let yearlyTotal = this.data[key];
      let res = Object.values(yearlyTotal).reduce((a,c) => a+c);

      arr.push({
        value: res,
        key: key
      })
    })

    this.xScale = d3.scaleTime()
      .domain(d3.extent(year, d => new Date(d) ))
      .range([0,this.width]);

    this.yScale = d3.scaleLinear()
      .domain(d3.extent(arr,d => d.value))
      .range([this.height,0]).nice();

    // points
    d3.select(this.g).selectAll('.cardChart__points')
      .data(arr)
      .enter()
      .append('circle')
      .attr('class','cardChart__points')
      .attr('r',4)
      .attr('cx',d => this.xScale(new Date(d.key)))
      .attr('cy',d => this.yScale( +d.value ))
      .style("fill", '#41edb8')
      .style("stroke", 'rgb(27, 31, 58)')
      .style("stroke-width", '3')

    // axis
    d3.select(this.svg).append("g").attr('class','cardChart__xAxis')
      .attr("transform", "translate(30,"+ (+this.height + +this.margin.top) +")")
      .call(d3.axisBottom(this.xScale));

    d3.selectAll(".cardChart__xAxis .tick text")
      .attr("dy", 8)
      .attr('fill','#ffffff')
      .style('font-family','Roboto')
      .style('font-weight',200)
      .style('font-size','10px')

    d3.selectAll(".cardChart__xAxis path")
      .attr('stroke','white')
    d3.selectAll(".cardChart__xAxis line")
      .attr('stroke','white')

    d3.select(this.svg).append("g").attr('class','cardChart__yAxis')
      .attr("transform", "translate("+ this.margin.left + ","+ +this.margin.top +")")
      .call(g => {
        g.call(d3.axisLeft(this.yScale).tickFormat(d3.format(".2s")));

        g.selectAll("path").attr('stroke','white');
        g.selectAll(".tick line").remove();


        g.selectAll(".tick text")
          .attr("x", -8)
          .attr('fill','#ffffff')
          .style('font-family','Roboto')
          .style('font-weight',400)
          .style('font-size','10px')

      g.selectAll(".tick:not(:last-of-type)").remove()
      });

  }



  render(){
    return(
      <div>
        <Wrapper>
          <CountryName>{this.data['NationalityLong']}</CountryName>
          <Region>{_.find(countryList, d => d[0] === this.data['NationalityLong'].toUpperCase())[1]} Region</Region>

          <Stats><p>{'10000'}</p></Stats>
          <BorderLocation><p>{this.data['BorderLocation']}</p></BorderLocation>

          <ChartContainer>
            <p>Illegal Border Crossing by Year</p>
            <svg width='100%' height='90px'
              ref={(svg) => {return this.svg = svg }}>

              <g width='100%' height= '100%'
                ref={(g) => {return this.g = g }}
                transform = {"translate("+this.margin.left+","+ this.margin.top + ")" }
              ></g>
            </svg>
          </ChartContainer>
        </Wrapper>
      </div>
    )
  }

}
