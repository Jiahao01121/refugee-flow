import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
const mapboxgl = require('mapbox-gl');

const Wrapper = styled.div`
  width: 83%;
  position: relative;
  height: ${() => window.innerHeight-40-90 + 'px'};
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
  top: 100px;
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
  top: 100px;
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
  top: 134px;
  line-height: 2;
`
const StatsBoardWrapper = styled.div`
  width: 100%;
  height: 40px;
  top: 395px;
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
  width: ${() => ((window.innerWidth*0.55)*0.83)/3 - 20/3 -1 + 'px' }

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
const MediaSectionWrapper = styled.div`
  position: absolute;
  top: 490px;
  width: 100%;
  height: ${() => window.innerHeight -60-90-490 + 'px'};
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
  ${'' /* top: 438px; */}
`
const MediaCoverageDesc = styled.p`
  font-family: 'Roboto';
  color: white;
  font-size: 18px;
  font-weight: 300;
  font-style: italic;
  position: absolute;
  margin: 0;
  ${'' /* top: 30px; */}
  top: 50%;
  transform: translateY(-50%);
  left: 30px;

  &>em{
    font-size: 40px;
    font-style: italic;
    position: absolute;
    font-family: cursive;
  }
  &>em:first-child{
    top: -20px;
    left: -30px;
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
  bottom: 0;
  right: 0;
  padding: 0;
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
    console.log("new props");
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
          "circle-radius": 5,
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
      top: '170px',
    };

    return(
      <Wrapper>
        <Cause_of_death><em>Cause of Death</em> {this.selected_dataPoint && (this.selected_dataPoint.cause_of_death_displayText + '/ ' + this.selected_dataPoint.cause_of_death )}</Cause_of_death>

        <Date>{this.selected_dataPoint && moment(this.selected_dataPoint.date).format('dddd, MMM Do, YYYY')}</Date>
        
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

        <Delimiter offset={'485px'}/>
        <MediaSectionWrapper>
          <MediaCoverage>Media coverage</MediaCoverage>
          <MediaCoverageDesc><em>“</em>{this.selected_dataPoint && this.selected_dataPoint.description}<em>”</em></MediaCoverageDesc>
          <Source>Source: <em>{this.selected_dataPoint && this.selected_dataPoint.source}</em></Source>
        </MediaSectionWrapper>
      </Wrapper>
    )
  }
}
