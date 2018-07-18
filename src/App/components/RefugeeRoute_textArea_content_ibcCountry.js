import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import * as _ from 'underscore';
import * as Fuse from 'fuse.js';
import $ from "jquery";
import { year } from '../data/warDictionary';
import RefugeeRoute_textArea_content_ibcCountryItem from './RefugeeRoute_textArea_content_ibcCountryItem';

const Wrapper = styled.div`
  width: 83%;
  position: relative;
  height: ${() => window.innerHeight-60-90 + 'px'};
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
`
const IBCTitle = styled.div`
  top: -35px;
  position: relative;
  &>p{
    position: relative;
    bottom: 20px;
    font-family: 'Roboto';
    font-size: 25px;
    color: #ffffff;
    font-weight: 100;
    margin-bottom: 10px;
  }

  &>p::after{
    content: ${ props => "'" + props.currentRouteName + "'" };;
    left: -6px;
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 100;
    position: absolute;
    top: 50px;
    padding: 2px 8px;
    border-radius: 4px;
    text-align: left;
    background: #2f2f4ab3;
  }
`
const DataSource = styled.div`
  fill: white;
  position: absolute;
  right: 0;
  cursor: pointer;
  opacity: 0.8;
  transition: all 200ms;
  top: -50px;
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
const SearchBar = styled.div`
  position: absolute;
  top: 0px;
  width: 20px;
  height: 20px;
  right: 0;
  cursor: pointer;
  opacity: 0.8;
  transition: all 400ms;
  &>svg{
    fill: rgba(255,255,255,1);
    opacity: 0.8;
    transition: all 400ms;
  }

  &::before{
    content: 'Search by Country';
    position: absolute;
    color: #fff;
    right: 10px;
    bottom: 0;
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 300;
    width: 116px;
    opacity: ${props => props.inputOn ? 0 : 0.8};
    transition: all 400ms;
  }
  &:hover{
    opacity: 1;
  }
`
const SearchBarInput = styled.input`
  background: none;
  opacity: 0;
  border: none;
  border-bottom: 1px white solid;
  position: absolute;
  right: 30px;
  top: 0;
  transition: width 400ms;
  width: ${props => props.inputOn ? '100px' : 0};
  opacity: ${props => props.inputOn ? 1 : 0};
  color: white;
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 300;
  &:focus {outline: none;}

  &::placeholder {
    color: white;
    font-size: 10px;
    font-family: 'Roboto';
    font-weight: 300;
    opacity: .6;
}
`
const SearchBarInputTips = styled.p`
  opacity: ${props => props.inputOn ? 1 : 0};
  position: absolute;
  right: 30px;
  top: 20px;
  transition: all 400ms;
  color: #ffffffa3;
  font-size: 10px;
  font-family: 'Roboto';
  font-weight: 300;
`
const SearchDropDown = styled.ul`
  color: white;
  font-size: 10px;
  font-family: 'Roboto';
  font-weight: 300;
  position: absolute;
  right: 30px;
  top: 30px;
  width: 100px;
  margin: 0;
  z-index: 1;
  background: #7f8ea5d9;
  padding: ${props=>{
      if(props.paddingToggle && props.paddingToggle.value.length>0) return '5px 3px 5px 3px'
      else return '0'
    }};
  border-radius: 5px;
  transition: width 400ms;
  opacity: ${props => props.inputOn ? 1 : 0};

  &>li{
    margin-bottom: 3px;
    padding: 1px 0px;
    background: #1e1e3399;
    border-radius: 50px;
    position: relative;
    text-align: center;
    cursor: pointer;
    transition: all 400ms;
    &:hover{
      background: #1e1e33;
    }

  }
`
const Tags = styled.div`

  position: absolute;
  left: 150px;
  top: -3px;
  width: ${() => (window.innerWidth* 0.55)*0.83 - 150 - 130 - 5 + 'px'};
  height: 50px;
  overflow-y: scroll;
  transition: all 400ms;

  &::-webkit-scrollbar{
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }
  &::before{

    content: 'Select multiple countries to compare';
    position: fixed;
    color: #fff;
    left: 150px;
    top: -21px;
    font-family: 'Roboto';
    font-size: 10px;
    font-weight: 400;
    transition: all 400ms;
    opacity: ${props => props.inputOn ? 1 : 0};
  }
  &>div{
    background: #51517c7a;
    position: relative;
    font-family: 'Roboto';
    color: white;
    height: 20px;
    border-radius: 50px;
    margin: 0px 10px 5px 0px;
    padding: 0px 10px 0px 0px;
    float: left;
    cursor: pointer;
    transition: all 400ms;
    &:hover{
      background: #51517c;
    }
  }
  &>div>span{
    font-size: 8px;
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    left: 7px;

    transition: all 400ms;
    &:hover{
      font-size: 12px;
    }
  }
  &>div>p{
    font-size: 12px;
    margin: 0;
    margin-left: 20px;
    position: relative;
    top: 45%;
    transform: translateY(-50%);
  }
`
const CardContainer = styled.div`
  opacity: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  height: ${() => window.innerHeight-60-90 -100 - 3 + 'px'};

  &::-webkit-scrollbar{
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }
  transition: all 400ms;

  &::before{
    content: '* Ranked by: Highest crossings';
    text-decoration: underline;
    position: fixed;
    color: #f5f6fb;
    left: 0;
    top: 25px;
    font-family: 'Roboto';
    font-size: 10px;
    font-weight: 400;
    transition: all 400ms;
  }
`
const Page = styled.p`
  color: white;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  margin-top: 5px;
  width: 100%;
  position: absolute;
  transform: translateX(50%);
  bottom: 20px;
`
const PageUp = styled.p`
  position: absolute;
  bottom: 4px;
  color: white;
  opacity: .6;
  cursor: pointer;
  transition: opacity 400ms;
  &:hover{
    opacity: 1;
  }
`
const PageDown = styled.p`
  position: absolute;
  bottom: 4px;
  color: white;
  right: 20px;
  opacity: .6;
  cursor: pointer;
  transition: opacity 400ms;
  &:hover{
    opacity: 1;
  }
`


export default class RefugeeRoute_textArea_content_ibcCountry extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      inputOn: false,
      dropDownItem: [],
      searchedItem : []
    };

    this.IBC_data = props.IBC_data;
    this.currentRouteName = props.currentRouteName;

    this.cardGenerator = this.cardGenerator.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount(){

    d3.select('#CardContainer').style('opacity',1);

    this.fuse = new Fuse(
      this.cardItemAll,
      {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["key"]
      }
    );

  }

  componentWillReceiveProps(nextProps){
    const trans = d3.select('.route-map-titleGroup__IBC');

    trans && trans
      .style('opacity',0)
      .transition()
      .duration(400)
      .style('opacity',1)

    this.currentRouteName = nextProps.currentRouteName;
  }

  componentWillUnmount(){
    $(this.searchBar).off();
  }

  cardGenerator(){

    // solution for inconsistancy in between dataSet;
    let cardItemAll = this.IBC_data[this.currentRouteName === 'Others' ? 'Other' : this.currentRouteName]
      .map(data => {
        data.chartData = [];
        year.forEach(key => {
          let yearlyTotal = data[key];
          let res = Object.values(yearlyTotal).reduce((a,c) => a+c);
          data.chartData.push({value: res,key: key})
        })
        data.totalCross = data.chartData.reduce((a, c) => ({value:a.value + c.value}), {value:0})['value'];
        return (<RefugeeRoute_textArea_content_ibcCountryItem data= {data} key ={data['NationalityLong']}/>)
      });

    this.cardItemAll = _.sortBy(cardItemAll,d => d.props.data['totalCross']).reverse();

    const cardItemSub = (() =>{
      if(this.cardItemAll.length > 10){

        const temp = new Map();
        let pageCounter = 1;

        for (var i = 0; i < this.cardItemAll.length; i+=10) {
          temp.set(pageCounter,this.cardItemAll.slice(i,i+10));
          pageCounter++;
        }
        return temp;
      }
      else {
        const temp = new Map();
        temp.set(1,this.cardItemAll);
        return temp;
      }
    })();

    if(this.state.inputOn && this.state.searchedItem.length > 0){
      return new Map().set(1,this.state.searchedItem.map(i => _.find(this.cardItemAll,d => d.key === i)))
    }else{
      return cardItemSub
    }
  }

  handlePageClick(param,pageMax){

    d3.select('#CardContainer').style('opacity',0);

    if(param === 'down'){

      if(this.state.currentPage < pageMax){
        d3.select('#CardContainer').transition().delay(100).style('opacity',0).on('end',()=>{
          this.setState({currentPage: ++this.state.currentPage});
          d3.select('#CardContainer').style('opacity',1);
        });
      };

    }else if(param === 'up') {
      d3.select('#CardContainer').transition().delay(200).style('opacity',1);
      if(this.state.currentPage > 1 && this.state.currentPage <= pageMax){
        d3.select('#CardContainer').transition().delay(100).style('opacity',0).on('end',()=>{
          this.setState({currentPage: --this.state.currentPage});
          d3.select('#CardContainer').style('opacity',1);
        });
      }
    }
  }

  render(){
    console.count('render!');
    const cards = this.cardGenerator();
    const pageMax = cards.size;

    return(
      <Wrapper className='route-map-titleGroup__IBC'>
        <IBCTitle currentRouteName = {this.currentRouteName}><p>Illegal Border Crossing Involved Country</p></IBCTitle>

        <DataSource onClick={() => window.open('https://frontex.europa.eu/', '_blank')}>
          <svg x="0px" y="0px" width="18.014px" height="19.304px" viewBox="0 0 18.014 19.304">
          <defs>
          </defs>
          <g id="zpGC0g_1_">
            <g>
              <path d="M8.858,8.442c1.995-0.015,3.835-0.176,5.607-0.76c0.726-0.239,1.44-0.553,2.109-0.925
                c0.97-0.539,1.453-1.335,1.44-2.533C18,3.059,17.575,2.23,16.599,1.723c-0.857-0.446-1.759-0.854-2.688-1.106
                c-2.708-0.734-5.468-0.765-8.23-0.349C4.268,0.481,2.893,0.853,1.632,1.562c-1.067,0.6-1.79,1.398-1.603,2.734
                C0.044,4.396,0.038,4.5,0.03,4.602C-0.024,5.321,0.288,5.886,0.826,6.31c0.408,0.322,0.852,0.619,1.321,0.839
                C4.316,8.164,6.638,8.406,8.858,8.442z M0.031,14.08c0,0.473,0.026,0.846-0.005,1.216c-0.077,0.914,0.342,1.562,1.044,2.079
                c1.018,0.75,2.187,1.144,3.397,1.425c2.587,0.599,5.199,0.643,7.815,0.249c1.458-0.219,2.891-0.574,4.166-1.353
                c1.67-1.021,1.639-1.678,1.466-3.518c-0.481,0.854-1.191,1.377-2.463,1.815c-1.442,0.496-2.933,0.737-4.448,0.83
                c-2.689,0.165-5.364,0.097-7.969-0.676C1.861,15.797,0.718,15.352,0.031,14.08z M0.031,6.806c0,0.505,0.028,0.885-0.006,1.26
                c-0.082,0.919,0.357,1.559,1.052,2.077c0.879,0.655,1.886,1.031,2.932,1.305c2.6,0.681,5.238,0.774,7.892,0.417
                c1.564-0.21,3.104-0.551,4.478-1.368c1.75-1.041,1.706-1.712,1.537-3.566c-0.5,1.01-1.432,1.455-2.417,1.798
                c-2.475,0.86-5.042,0.994-7.633,0.901c-1.826-0.065-3.63-0.275-5.36-0.899C1.527,8.377,0.591,7.942,0.031,6.806z M0.031,10.543
                c0,0.408,0.024,0.818-0.005,1.224c-0.056,0.772,0.246,1.395,0.851,1.813c0.616,0.426,1.27,0.847,1.97,1.095
                c3.531,1.253,7.137,1.278,10.765,0.482c1.286-0.282,2.522-0.717,3.552-1.588c0.41-0.346,0.756-0.758,0.799-1.309
                c0.045-0.574,0.01-1.155,0.01-1.858c-0.338,0.807-0.883,1.284-1.548,1.535c-1.042,0.392-2.108,0.762-3.196,0.982
                c-2.199,0.445-4.434,0.455-6.664,0.257c-1.569-0.139-3.121-0.393-4.578-1.032C1.193,11.795,0.458,11.365,0.031,10.543z"/>
            </g>
          </g>
          </svg>
        </DataSource>

        <SearchBar
          onClick={() => this.setState({inputOn: !this.state.inputOn },() =>{
            if(!this.state.inputOn){
              this.setState({searchedItem: [],dropDownItem: []});
              this.searchBar.value = '';
            }
          })}
          inputOn={this.state.inputOn}>
          {this.state.inputOn
            ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 13H5v-2h14v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M337.509 305.372h-17.501l-6.571-5.486c20.791-25.232 33.922-57.054 33.922-93.257C347.358 127.632 283.896 64 205.135 64 127.452 64 64 127.632 64 206.629s63.452 142.628 142.225 142.628c35.011 0 67.831-13.167 92.991-34.008l6.561 5.487v17.551L415.18 448 448 415.086 337.509 305.372zm-131.284 0c-54.702 0-98.463-43.887-98.463-98.743 0-54.858 43.761-98.742 98.463-98.742 54.7 0 98.462 43.884 98.462 98.742 0 54.856-43.762 98.743-98.462 98.743z"/>
              </svg>
          }

        </SearchBar>
        <SearchBarInput
          placeholder="Enter Country Name.."
          inputOn={this.state.inputOn}
          type="text"
          innerRef={(searchBar) => {return this.searchBar = searchBar }}
          onInput={() => this.setState({
            currentPage: 1,
            dropDownItem: this.fuse.search(this.searchBar.value).map(d => d.key).slice(0,10) })}>
        </SearchBarInput>
        <SearchBarInputTips inputOn={this.state.inputOn}>*Multi Selection</SearchBarInputTips>

        <SearchDropDown
          paddingToggle ={this.searchBar}
          inputOn={this.state.inputOn}>
          {((list) =>{
            const output = [];
            for (let i = 0; i < list.length; i++) output[i] =
              (
                <li key={list[i]} onClick={() =>{ if(!this.state.searchedItem.includes(list[i])) this.setState({searchedItem: this.state.searchedItem.concat([list[i]]) }) }}>
                  {list[i]}
                </li>
              );
            return output
          })(this.state.dropDownItem)}
        </SearchDropDown>

        <Tags inputOn={this.state.inputOn}>
          {((list) =>{
            const output = [];
            if(list.length>0){
              for (let i = 0; i < list.length; i++) {
                output[i] = (
                  <div key ={list[i]}
                    onClick={()=>{
                      this.setState({searchedItem: this.state.searchedItem.filter(d => d != list[i])})
                    }}
                    >
                    <span>x</span>
                    <p>{list[i]}</p>
                  </div>
                )
              };
            }
            return output;
          })(this.state.searchedItem)}
          {/* <div><span>x</span><p>aaa</p></div> */}
          {/* <div><span>x</span><p>bb bbb</p></div> */}
        </Tags>

        <CardContainer id="CardContainer">{cards.get(this.state.currentPage)}</CardContainer>

        <PageUp onClick = {() => this.handlePageClick('up',pageMax)}>{"<"}</PageUp>
        <Page>{this.state.currentPage+ '/' + pageMax}</Page>
        <PageDown onClick = {() => this.handlePageClick('down',pageMax)}>{">"}</PageDown>

      </Wrapper>
    )
  }
}
