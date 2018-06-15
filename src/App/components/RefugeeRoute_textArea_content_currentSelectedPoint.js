import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
const mapboxgl = require('mapbox-gl');

const Wrapper = styled.div`
  width: 83%;
  position: relative;
  height: 811px;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
`
const Cause_of_death = styled.h1`
  font-family: 'Roboto';
  color: white;
  font-size: 16px;
  font-weight: 200;
  margin: 0;
  position: absolute;
  width: 80%;
  &>em{
    font-size: 16px;
    padding-right: 10px;
    font-style: normal;
    font-weight: 500;
  }
`
const DataSource = styled.div`
  fill: white;
  position: absolute;
  top: -3px;
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
const Date = styled.p`
  font-family: 'Roboto';
  color: #868686;
  font-size: 15px;
  font-weight: 300;
  font-style: italic;
  position: absolute;
  margin: 0;
  top: 40px;
`
const UrlLink = styled.div`
  fill: white;
  position: absolute;
  top: 45px;
  right: 0;
  cursor: pointer;
  opacity: 0.8;
  transition: all 200ms;
  &:hover{
    opacity: 1;
  }
  &::before{
    content: 'Link';
    position: relative;
    color: #fff;
    right: 55px;
    bottom: 0;
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 300;
  }
`
const Delimiter = styled.div`
  width: 100%;
  height: 1px;
  transition: all 200ms;
  background: #76819ea3;
  top: ${props => props.offset};
  position: absolute;
`
const Location = styled.h1`
  font-family: 'Roboto';
  font-size: 16px;
  padding-right: 10px;
  font-style: normal;
  font-weight: 500;
  color: white;
  margin: 0;
  top: 110px;
  position: relative;
`
const Route = styled.h1`
  font-family: 'Roboto';
  font-size: 16px;
  padding-right: 10px;
  font-style: normal;
  font-weight: 400;
  color: white;
  margin: 0;
  top: 110px;
  right: 0;
  position: absolute;
`

const LocationDesc = styled.p`
  font-family: 'Roboto';
  color: #868686;
  font-size: 15px;
  font-weight: 300;
  font-style: italic;
  position: absolute;
  margin: 0;
  top: 150px;
`
const StatsBoardWrapper = styled.div`
  width: 100%;
  height: 40px;
  top: 410px;
  position: relative;
`
const StatsBoardItem = styled.div`
  height: 40px;
  background: #2f2f4ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  margin: ${props => props.index === 2 && '0 10px'};
  width: ${() => ((window.innerWidth*0.55)*0.83)/3 - 20/3 + 'px' }

  &:hover{
    background: #2f2f4a;
    cursor: pointer;
  }
  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 100;
    font-size: 25px;
    position: relative;
    margin: auto;
    right: 15px;
    text-align: end;
    transform: translateY(-50%);
    top: 50%;
    transition: all 300ms;
    margin-right: 10px;
    &:after{
      content:${props => "'" + props.name + "'"};
      left: 38px;
      font-weight: 500;
      font-size: 12px;
      position: absolute;

      top: 47%;
      transform: translateY(-50%);
    }

    &:before{
      content: "";
      width: 5px;
      height: 5px;
      left: 25px;
      position: absolute;
      border-radius: 50%;
      background: #8383ab;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`
const MediaCoverage = styled.h1`
  font-family: 'Roboto';
  font-size: 16px;
  padding-right: 10px;
  font-style: normal;
  font-weight: 500;
  color: white;
  margin: 0;
  position: relative;
  top: 468px;
`
const MediaCoverageDesc = styled.p`
  font-family: 'Roboto';
  color: white;
  font-size: 18px;
  font-weight: 300;
  font-style: italic;
  position: absolute;
  margin: 0;
  top: 600px;
  left: 30px;

  &>em{
    font-size: 60px;
    font-style: italic;
    position: absolute;
    font-family: cursive;
  }
  &>em:first-child{
    top: -47px;
    left: -50px;
  }
`
const Source = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  padding-right: 10px;
  font-style: normal;
  font-weight: 400;
  color: white;
  margin: 0;
  position: absolute;
  bottom: 25px;
  right: 0;
  cursor: pointer;

  &>em{
    text-decoration: underline;
    font-weight: 800;
  }
`


export default class RefugeeRoute_textArea_content_currentSelectedPoint extends React.Component {

  constructor(props){
    super(props);
    this.selected_dataPoint = JSON.parse(props.selected_dataPoint);
    this.mapFly = this.mapFly.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.selected_dataPoint = JSON.parse(nextProps.selected_dataPoint);

    const map_lng = this.selected_dataPoint ? this.selected_dataPoint.lng : 0;
    const map_lat = this.selected_dataPoint? this.selected_dataPoint.lat: 0;
    this.mapFly(map_lng,map_lat);
  }

  componentDidMount() {
    const map_lng = this.selected_dataPoint ? this.selected_dataPoint.lng : 0;
    const map_lat = this.selected_dataPoint? this.selected_dataPoint.lat: 0;
    mapboxgl.accessToken = 'pk.eyJ1IjoiamlhaGFvMDExMjEiLCJhIjoiY2l6bjI5ZHI1MDJkYzJxbzg1NXJmYWxvMSJ9.AhMpv-yiSAvqlo7bi2UBig';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jiahao01121/cji9iqnff6xl52so1ienqz75o',
      attributionControl: false,
      center: [map_lng,map_lat],
      zoom: 4,
    });
    this.map.on('load',()=>{
      this.map.addSource('point', {
        "type": "geojson",
        "data": {"type": "Point","coordinates": [-73.98605346679688, 40.755222049021405]}
      });
      this.map.addLayer({
        "id": "point",
        "source": "point",
        "type": "circle",
        "paint": {
          "circle-radius": 3,
          "circle-color": "#fff",
          "circle-opacity": .8,
          "circle-pitch-scale": "map"}
      });
      this.mapFly(map_lng,map_lat);
    })
  }

  mapFly(map_lng,map_lat){
    this.map.getSource('point').setData({"type": "Point","coordinates": [map_lng, map_lat]});
    this.map.jumpTo({center: [map_lng, map_lat],zoom:4});
  }

  componentWillUnmount() {
    this.map.remove();
  }


  render(){
    // console.log(this.mapContainer);
    // console.log(this.selected_dataPoint);
    // console.log("rendered");

    const style = {
      position: 'absolute',
      width: '100%',
      height: '230px',
      top: '180px',
    };

    return(
      <Wrapper>
        <Cause_of_death><em>Cause of Death</em> {this.selected_dataPoint && (this.selected_dataPoint.cause_of_death_displayText + '/ ' + this.selected_dataPoint.cause_of_death )}</Cause_of_death>
        <DataSource onClick={() => window.open('http://missingmigrants.iom.int/downloads', '_blank')}>
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
        <Date>{this.selected_dataPoint && moment(this.selected_dataPoint.date).format('dddd, MMM Do, YYYY')}</Date>
        <UrlLink onClick={() => window.open(this.selected_dataPoint && this.selected_dataPoint.source_url, '_blank')}>
          <svg x="0px" y="0px" width="21.258px" height="21.272px" viewBox="0 0 21.258 21.272">
          <g>
          	<path d="M0,16.316c0.009-0.131,0.016-0.263,0.026-0.394c0.051-0.631,0.217-1.233,0.482-1.807
          		c0.282-0.61,0.663-1.153,1.138-1.629c1.406-1.407,2.807-2.818,4.221-4.216c0.81-0.8,1.786-1.306,2.908-1.506
          		c1.333-0.237,2.575,0.008,3.706,0.766c0.25,0.168,0.484,0.357,0.69,0.576c0.384,0.407,0.495,0.887,0.307,1.411
          		c-0.186,0.518-0.574,0.816-1.121,0.881c-0.417,0.05-0.788-0.08-1.091-0.375c-0.304-0.296-0.66-0.497-1.074-0.587
          		C9.58,9.304,8.997,9.403,8.442,9.686c-0.28,0.142-0.527,0.33-0.748,0.553c-0.852,0.857-1.704,1.713-2.556,2.57
          		c-0.54,0.544-1.084,1.085-1.619,1.634c-0.426,0.437-0.709,0.954-0.798,1.564c-0.19,1.303,0.696,2.333,1.761,2.53
          		c0.541,0.1,1.058,0.009,1.551-0.23c0.333-0.161,0.622-0.382,0.883-0.644c0.762-0.763,1.525-1.525,2.287-2.288
          		c0.019-0.019,0.033-0.044,0.047-0.063c0.414,0.332,0.893,0.462,1.381,0.566c0.404,0.086,0.814,0.124,1.227,0.096
          		c0.271-0.019,0.535-0.067,0.776-0.207c-0.01,0.011-0.019,0.022-0.03,0.032c-1.297,1.297-2.587,2.6-3.893,3.887
          		c-0.786,0.775-1.73,1.272-2.816,1.484c-0.249,0.049-0.505,0.062-0.757,0.091c-0.025,0.003-0.049,0.007-0.073,0.01
          		c-0.105,0-0.209,0-0.314,0c-0.029-0.004-0.058-0.01-0.087-0.011c-0.408-0.017-0.809-0.081-1.198-0.204
          		c-1.402-0.442-2.414-1.33-3.029-2.665c-0.235-0.51-0.367-1.048-0.41-1.608C0.016,16.651,0.009,16.517,0,16.384
          		C0,16.361,0,16.338,0,16.316z"/>
          	<path d="M16.602,0c0.126,0.014,0.253,0.027,0.379,0.041c0.454,0.051,0.893,0.165,1.312,0.346
          		c1.089,0.47,1.907,1.232,2.445,2.29c0.271,0.533,0.435,1.1,0.493,1.696c0.145,1.503-0.292,2.831-1.24,3.99
          		c-0.304,0.372-0.658,0.704-0.999,1.044c-1.129,1.127-2.264,2.247-3.392,3.375c-0.422,0.422-0.871,0.805-1.393,1.098
          		c-0.608,0.342-1.256,0.567-1.948,0.66c-0.908,0.122-1.786,0.014-2.631-0.342c-0.579-0.244-1.094-0.587-1.53-1.038
          		c-0.382-0.395-0.493-0.871-0.315-1.391c0.178-0.519,0.559-0.821,1.1-0.897c0.421-0.059,0.799,0.064,1.108,0.361
          		c0.3,0.29,0.644,0.493,1.05,0.589c0.577,0.136,1.133,0.059,1.668-0.184c0.329-0.149,0.615-0.358,0.869-0.614
          		c1.227-1.234,2.455-2.468,3.681-3.703c0.219-0.221,0.443-0.44,0.646-0.675c0.329-0.382,0.548-0.824,0.632-1.324
          		c0.202-1.198-0.49-2.187-1.473-2.52c-0.525-0.178-1.052-0.143-1.57,0.046c-0.406,0.148-0.76,0.379-1.065,0.682
          		c-0.791,0.786-1.578,1.575-2.366,2.364c-0.018,0.018-0.033,0.038-0.045,0.053c-0.541-0.402-1.166-0.539-1.807-0.626
          		C9.862,5.275,9.513,5.267,9.164,5.323C8.988,5.352,8.82,5.402,8.655,5.481c0.016-0.018,0.032-0.036,0.048-0.052
          		c1.099-1.099,2.196-2.2,3.298-3.296c0.308-0.306,0.614-0.617,0.947-0.894c0.744-0.616,1.6-1.003,2.554-1.166
          		c0.177-0.03,0.356-0.04,0.535-0.06C16.062,0.01,16.086,0.004,16.111,0C16.275,0,16.438,0,16.602,0z"/>
          </g>
          </svg>
        </UrlLink>
        <Delimiter offset={'80px'}/>

        <Location>Location</Location>
        <Route>Route: {this.selected_dataPoint && this.selected_dataPoint.route_displayText}</Route>

        <LocationDesc>{this.selected_dataPoint && this.selected_dataPoint.location}</LocationDesc>
        <div style={style} ref={el => this.mapContainer = el} />
        <StatsBoardWrapper>
          <StatsBoardItem index={1} name='Dead: '><p>{this.selected_dataPoint && this.selected_dataPoint.dead}</p></StatsBoardItem>
          <StatsBoardItem index={2} name='Missing: '><p>{this.selected_dataPoint && this.selected_dataPoint.missing}</p></StatsBoardItem>
          <StatsBoardItem index={3} name='Dead and Missing: '><p>{this.selected_dataPoint && this.selected_dataPoint.dead_and_missing}</p></StatsBoardItem>
        </StatsBoardWrapper>

        <Delimiter offset={'500px'}/>
        <MediaCoverage>Media coverage</MediaCoverage>
        <MediaCoverageDesc><em>“</em>{this.selected_dataPoint && this.selected_dataPoint.description}<em>”</em></MediaCoverageDesc>

        <Source onClick={() => window.open(this.selected_dataPoint && this.selected_dataPoint.source_url, '_blank')}>Source: <em>{this.selected_dataPoint && this.selected_dataPoint.source}</em></Source>
      </Wrapper>
    )
  }
}
