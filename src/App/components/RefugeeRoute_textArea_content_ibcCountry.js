import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
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
    top: 40px;
    padding: 5px 8px;
    border-radius: 4px;
    text-align: left;
    background: #2f2f4ab3;
  }
`

const DataSource = styled.div`
  fill: white;
  position: absolute;
  top: 10px;
  right: 0;
  cursor: pointer;
  opacity: 0.8;
  transition: all 200ms;
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
const CardContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: ${() => window.innerHeight-60-90 -100+ 'px'};

  &::-webkit-scrollbar{
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }

`

export default class RefugeeRoute_textArea_content_ibcCountry extends React.Component {

  constructor(props){
    super(props);
    this.IBC_data = props.IBC_data;
    this.currentRouteName = props.currentRouteName;

    this.cardGenerator = this.cardGenerator.bind(this);
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

  cardGenerator(data){
    return <RefugeeRoute_textArea_content_ibcCountryItem data= {data} key ={data['NationalityLong']}/>
  }

  render(){
    // solution for inconsistancy in between dataSet;
    var pass = null;
    if(this.currentRouteName === 'Others') pass = 'Other';
    else pass = this.currentRouteName;
    // cardItemList
    let cardItem = this.IBC_data[pass].map(d => this.cardGenerator(d) );

    return(
      <Wrapper className='route-map-titleGroup__IBC'>
        <IBCTitle currentRouteName = {this.currentRouteName}>
          <p>Illegal Border Crossing - IBC Invovled Country</p>
        </IBCTitle>
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
          </svg></DataSource>

          <CardContainer>{cardItem}</CardContainer>
      </Wrapper>
    )
  }
}
