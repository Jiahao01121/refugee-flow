import React, { Component } from 'react';
import styled, { css }from 'styled-components';
import * as d3 from 'd3';
import $ from "jquery";
import _ from 'underscore';

const RegionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #15151cd1;
  box-shadow: 0px 16px 20px 11px rgba(6, 6, 14, 0.38);
`
const SectionContainer = styled.div`
  width: 100%;
  height: 75%;
  top: 200px;
  position: absolute;
`
const SectionItemWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 2px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }
`
const SectionItem = styled.div`
  width: ${() =>{
    return $('.sectionItemWrapper').width() / 3 - 20 + 'px'
    }};
  height: 350px;
  margin: 10px;
  background: #2121304D;
  position: relative;
  float: left;
  cursor: pointer;
`
const SectionTitle = styled.p`
  color: white;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 100;
  text-align: center;
  top: 300px;
  position: relative;
  z-index: 1;
`
const Bubble = styled.div`
  border-radius:50%;
  background: #212130;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  position: absolute;
  transition: all 800ms;
  ${props =>props.size && css`
    width: ${props.size + 'px'};
    height: ${props.size+ 'px'};
  `}
`
class Region extends Component {
  constructor(props) {
    super(props);
    this.visualization = this.visualization.bind(this);
    this.data = this.props.data;
  }

  componentWillReceiveProps(nextProps){
    this.data = nextProps.data;
  }

  visualization(d){
    d = _.sortBy(d,d => d.total_fat).reverse();
    const jsxArray = [];
    const minMax = d3.extent(d,d => d.total_fat);
    const scaler = d3.scaleLinear().domain(minMax).range([0,300]).nice();
    for (var i = 0; i < d.length; i++) {
      jsxArray[i] = (() =>{
        return (
          <SectionItem key={i}>
            <SectionTitle>{d[i].country.charAt(0).toUpperCase() + d[i].country.toLowerCase().slice(1)}</SectionTitle>
            <Bubble size ={ scaler(d[i].total_fat) }></Bubble>

          </SectionItem>
        )
      })()
    }
    console.log(jsxArray);
    return jsxArray;
  }

  render() {
    console.log(this.data);
    return (
      <RegionContainer>
        <SectionContainer>
          <SectionItemWrapper className={'sectionItemWrapper'}>
            {this.visualization(this.data)}
        </SectionItemWrapper>
        </SectionContainer>
      </RegionContainer>
    )
  }
}

export default Region;
