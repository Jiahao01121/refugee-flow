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
