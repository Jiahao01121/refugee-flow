import React from 'react';
import styled from 'styled-components';
import * as _ from 'underscore';
import $ from "jquery";
import '../stylesheets/RefugeeRoute_map.css';
const mapboxgl = require('mapbox-gl');
const dataDict = require('../data/IBC_crossingCountByCountry.json');

const color_map = [
  {
    'key': "drowning or exhaustion related death",
    'value': 'white',
  },
  {
    'key': "violent accidental death (transport; blown in minefield...)",
    'value': 'white',
  },
  {
    'key': "authorities related death",
    'value': 'white',
  },
  {
    'key': "unknown - supposedly exhaustion related death",
    'value': 'white',
  },
  {
    'key': "suicide",
    'value': 'white',
  },
  {
    'key': "malicious intent related death / manslaughter",
    'value': 'white',
  },
  {
    'key': "other",
    'value': 'blue',
  },
]

export default class RefugeeRoute_map extends React.Component {

  constructor(props){
    super(props);
    this.canvas_overlay_render = this.canvas_overlay_render.bind(this);
    this.data = _.groupBy(props.data,d => d.route);
    this.currentRouteName = props.currentRouteName;
    this.currentMapParams = _.find(dataDict,d => d.route === this.currentRouteName)
  }

  componentWillReceiveProps(nextProps){
    this.data = _.groupBy(nextProps.data,d => d.route);
    this.currentRouteName = nextProps.currentRouteName;
    this.currentMapParams = _.find(dataDict,d => d.route === this.currentRouteName)
    this.canvas_overlay_render(
      () => this.map.flyTo({center: [this.currentMapParams.center_lng,this.currentMapParams.center_lat],zoom:this.currentMapParams.zoom})
    );
  }

  componentDidMount() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiamlhaGFvMDExMjEiLCJhIjoiY2l6bjI5ZHI1MDJkYzJxbzg1NXJmYWxvMSJ9.AhMpv-yiSAvqlo7bi2UBig';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jiahao01121/cji9iqnff6xl52so1ienqz75o',
      attributionControl: false,
      center: [this.currentMapParams.center_lng,this.currentMapParams.center_lat],
      zoom: this.currentMapParams.zoom,
      // bearing: -14.57,
      // pitch: 39.50,
    }).addControl(new mapboxgl.NavigationControl(),'top-right');

    this.mapContainer_width = $(this.mapContainer).width();
    this.mapContainer_height = $(this.mapContainer).height();

    window.d3.select(this.map.getCanvasContainer())
      .append('canvas')
      .attr('height',this.mapContainer_height)
      .attr('width',this.mapContainer_width)
      .style('opacity',0.999)
      .attr('class','canvas_overlay')
      .canvas(true);

    this.size_change =.3;
    this.canvas = document.querySelector('.canvas_overlay');
    this.ctx = this.canvas.getContext('2d');

    this.myZoom = {
      start:  this.map.getZoom(),
      end: this.map.getZoom()
    };
    this.map.on('zoomstart',(e) => {
      this.myZoom.start = this.map.getZoom();
    })
    this.map.on('zoomend',(e) => {
      this.myZoom.end = this.map.getZoom();
      let diff = this.myZoom.start - this.myZoom.end;
      if(diff > 0){
        this.size_change = .3;
      } else if(diff < 0) {
        this.size_change = .3;
      }
    });

    this.map.on("viewreset", () => this.canvas_overlay_render());
    this.map.on("move", () => this.canvas_overlay_render());
    this.canvas_overlay_render();
  }

  canvas_overlay_render(cb){
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.mapContainer_width, this.mapContainer_height);
    this.ctx.translate(this.mapContainer_width/2, this.mapContainer_height/2);
    this.ctx.scale((512) * 0.5 / Math.PI * Math.pow(2, this.map.getZoom()),(512) * 0.5 / Math.PI * Math.pow(2, this.map.getZoom()));

    this.currentRouteName && this.data[this.currentRouteName].forEach(d =>{
      // console.log(this.currentRouteName);
      // console.log(this.data[this.currentRouteName]);
      // console.log(d.lng);
      // console.log(d.lat);
      if(-90 > d.lat || d.lat > 90){
        var ready = this.map.project(new mapboxgl.LngLat(d.lng,90));
      }else{
        var ready = this.map.project(new mapboxgl.LngLat(d.lng,d.lat));
      }
      // console.log(ready);
      d.map_coord_x = ready.x;
      d.map_coord_y = ready.y;
      let size = 10 * this.size_change;
      let color =  _.find(color_map,_d =>_d.key === d.cause_of_death).value;

      this.ctx.beginPath();
      this.ctx.moveTo(d.map_coord_x + size , d.map_coord_y);
      this.ctx.arc(d.map_coord_x, d.map_coord_y, size  , 0, Math.PI*2);
      this.ctx.fillStyle = color;
      // TODO: stroke
      this.ctx.fill();
      this.ctx.restore();
    })

    cb && cb();

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
