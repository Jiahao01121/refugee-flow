import React, { Component } from 'react';
import styled, { css }from 'styled-components';
import * as d3 from 'd3';
import $ from "jquery";
import _ from 'underscore';
import * as emojiFlags from 'emoji-flags';
import {countryCode} from '../data/warDictionary';
import { ScaleLoader } from 'react-spinners';
import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './styledComponents/LoadingBarWrapper.styled';

const RegionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #15151cd1;
  box-shadow: 0px 16px 20px 11px rgba(6, 6, 14, 0.38);
  border-radius: 10px;
`
const SectionContainer = styled.div`
  width: 100%;
  height: 75%;
  top: 25%;
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
  width: ${() =>$('.sectionItemWrapper').width() / 3 - 20 + 'px'};
  height: 350px;
  margin: 10px;
  background: #3535504d;
  position: relative;
  float: left;
  ${'' /* ${props => props.index && css`
    position: absolute;
    display: inline-block;
    top: ${ Math.floor(props.index/3) * 350 + 'px'};
    left: ${ props.index%3 * ( $('.sectionItemWrapper').width() / 3 - 20 ) + 'px'};
  `} */}
  cursor: pointer;
  transition: all 800ms;

  &:hover{
    background: #353550b3;
  }
`
const SectionTitle = styled.p`
  color: white;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 100;
  text-align: center;
  top: 290px;
  position: absolute;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
`
const Bubble = styled.div`
  border-radius:50%;
  background: #6A6A8C;
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
const Fat_num = styled.p`
  font-family: 'Roboto';
  font-weight: 600;
  color: white;
  font-size: 30px;
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);

  &::after{
    ${props => props.textChange
      ?css` content: ${`'Number of Fatality - ${props.textChange}'`};`
      :css` content: 'Total number of Fatality';`
    }
    font-weight: 300;
    font-size: 12px;
    position: absolute;
    width: 300px;
    top: 50px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
  }
`
const MouseoverButton = styled.div`
  width: ${() =>($('.sectionItemWrapper').width() / 3 - 20) / 9 - 8 + 'px'};
  height: ${props => props.heightMap + 'px'};
  background: white;
  position: relative;
  top: 0;
  float: left;
  margin: 0 4px;
  cursor: alias;
  transition: all 200ms;
  font-weight: 300;
  color: white;
  z-index: 100;

  &:after{
    content: ${props => "'"+props.tag+"'"};
    font-weight: inherit;
    font-size: 12px;
    position: absolute;
    top: 0px;
    padding-top: 20px;
    color: inherit;
    font-family: 'Roboto';
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
  }
`


class Region extends Component {
  constructor(props) {
    super(props);
    this.visualization = this.visualization.bind(this);
    this.data = this.props.data;
    this.clickHandler = this.props.clickHandler;
    this.closeModal = this.props.closeModal;
    this.state = {
      mv:false,
      mv_year:null,
      loadingStatus: true,
      loadingText : 'Fetching data from the server...'
    }
  }

  componentWillReceiveProps(nextProps){
    this.data = nextProps.data;
    this.setState({loadingStatus: false});
  }

  visualization(d){
    d = _.sortBy(d,d => this.state.mv? d.fat_year['201'+this.state.mv_year] : d.total_fat).reverse();

    const jsxArray = [];
    const minMax = d3.extent(d,d => d.total_fat);
    const scaler = d3.scaleLinear().domain(minMax).range([0,300]).nice();
    const heightMap_scaler = d3.scaleLinear().domain(minMax).range([1,20]).nice();
    for (let i = 0; i < d.length; i++) {

      let flag_code =(() =>{
        var temp;
        var query = _.find(countryCode,_d => _d.full === d[i].country);
        if(query != undefined) {
          temp = query["code"];
          return temp;
        }
      })()

      jsxArray[i] = (() =>{
        return (
          <SectionItem key={i} index={i} onClick = {() => {
            this.setState({loadingStatus: true},() =>{
              setTimeout(() => {
                this.closeModal();
                this.clickHandler(d[i].country,this.state.mv_year);
              },10);
            });
          }}>
            {(()=>{

              let mouseOverButtonGroup = [];
              for (let _i = 0; _i < 9; _i++) {
                mouseOverButtonGroup[_i] = <MouseoverButton
                  key = {'201' + _i}
                  tag = {'201' + _i}
                  heightMap = {heightMap_scaler(d[i].fat_year['201'+_i])}
                  className = {'section-mouseover-button-y201' + _i}
                  onMouseOver = {() =>{
                    this.setState({mv: true,mv_year: _i})
                    d3.selectAll('.section-mouseover-button-y201'+ _i)
                      .style('background','rgb(255, 65, 65)')
                      .style('color','rgb(255, 65, 65)')
                      .style('font-weight','900')
                  }}
                  onMouseOut = {() =>{
                    this.setState({mv: false,mv_year: null})
                    d3.selectAll('.section-mouseover-button-y201'+ _i)
                      .style('background','white')
                      .style('color','white')
                      .style('font-weight','300')
                  }}
                ></MouseoverButton>;
              }
              return mouseOverButtonGroup
            })()}
            <SectionTitle>{ flag_code && emojiFlags.countryCode(flag_code).emoji + d[i].country.charAt(0).toUpperCase() + d[i].country.toLowerCase().slice(1)}</SectionTitle>
            <Bubble size ={ this.state.mv ? scaler(d[i].fat_year['201'+this.state.mv_year]) : scaler(d[i].total_fat) }></Bubble>
            <Fat_num textChange = {this.state.mv ? '201'+this.state.mv_year : false}>{d3.format(",")(
              this.state.mv ? d[i].fat_year['201'+this.state.mv_year] : d[i].total_fat
            )}</Fat_num>
          </SectionItem>
        )
      })()
    }

    return jsxArray;
  }

  render() {
    return (
      <RegionContainer>
        <SectionContainer>

          <LoadingDivWrapper loading={this.state.loadingStatus}  leftPercentage='50%' marginTop = '-60'>
            <LoaderGraphWrapper>
              <ScaleLoader color= {'#ffffff'} loading={this.state.loadingStatus}/>
            </LoaderGraphWrapper>
            <LoadingIndicator>{this.state.loadingText}</LoadingIndicator>
            </LoadingDivWrapper>

          <SectionItemWrapper className={'sectionItemWrapper'}>{this.visualization(this.data)}</SectionItemWrapper>
        </SectionContainer>
      </RegionContainer>
    )
  }

}

export default Region;
