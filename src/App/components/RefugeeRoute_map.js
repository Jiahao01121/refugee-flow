import React from 'react';
import styled from 'styled-components';
import * as _ from 'underscore';
import '../stylesheets/RefugeeRoute_map.css';
const mapboxgl = require('mapbox-gl');
export default class RefugeeRoute_map extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamlhaGFvMDExMjEiLCJhIjoiY2l6bjI5ZHI1MDJkYzJxbzg1NXJmYWxvMSJ9.AhMpv-yiSAvqlo7bi2UBig';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jiahao01121/cji9iqnff6xl52so1ienqz75o',
      attributionControl: false,
      center: [55.498,8.536],
      zoom: 4.7,
      bearing: -14.57,
      pitch: 39.50,
    });
    this.map.addControl(new mapboxgl.NavigationControl(),'top-right');

  }

  componentWillUnmount() {
    this.map.remove();
  }

  render(){
    const style = {
      position: 'absolute',
      width: '100%',
      height: '835px',
      zIndex: 0,
      height: window.innerHeight - 60 + 'px',
    };
    return(
      // <Wrapper>

      // </Wrapper>
      <div style={style} ref={el => this.mapContainer = el} />
    )
  }
}
