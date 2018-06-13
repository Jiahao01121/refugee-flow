import React from 'react';
import styled from 'styled-components';
import * as _ from 'underscore';
import $ from "jquery";
import * as d3 from 'd3';
import '../stylesheets/RefugeeRoute_map.css';
import { color_map } from '../data/routeDictionary';
const mapboxgl = require('mapbox-gl');
const dataDict = require('../data/IBC_crossingCountByCountry.json');


export default class RefugeeRoute_map extends React.Component {

  constructor(props){
    super(props);
    this.currentRouteName = props.currentRouteName;
    this.data = _.groupBy(props.data,d => d.route);
    this.currentMapParams = _.find(dataDict,d => d.route === this.currentRouteName);
    this.canvas_overlay_render = this.canvas_overlay_render.bind(this);
    this.canvas_overlay_drawCall = this.canvas_overlay_drawCall.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.banned_category = nextProps.banned_category;
    this.data = _.groupBy(nextProps.data,d => d.route);
    this.currentMapParams = _.find(dataDict,d => d.route === nextProps.currentRouteName);

    if(this.currentRouteName != nextProps.currentRouteName){
      this.currentRouteName = nextProps.currentRouteName;
      this.canvas_overlay_render(() => this.map.flyTo({center: [this.currentMapParams.center_lng,this.currentMapParams.center_lat],zoom:this.currentMapParams.zoom}));
    }else{
      this.canvas_overlay_render();
    }
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

    this.size_change =1;
    this.canvas = document.querySelector('.canvas_overlay');
    this.ctx = this.canvas.getContext('2d');
    this.myZoom = {start: this.map.getZoom() , end: this.map.getZoom()};

    this.map.on('zoomstart',(e) => this.myZoom.start = this.map.getZoom());
    this.map.on('zoomend',(e) => this.myZoom.end = this.map.getZoom());
    this.map.on('viewreset', () => this.canvas_overlay_render());
    this.map.on('move', () => this.canvas_overlay_render());
    this.map.on('mousemove',(e) => {
      let p = this.tree.find(e.point.x, e.point.y);
      if(p) this.intersected_id = p.id;
      this.canvas_overlay_render();
      console.log(p.cause_of_death);
    })
    this.map.on('click',() => {
      // TODO
    })
    this.canvas_overlay_render();
  }

  canvas_overlay_render(cb){
    this.data_filtered = [];
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.mapContainer_width, this.mapContainer_height);
    this.ctx.translate(this.mapContainer_width/2, this.mapContainer_height/2);
    this.ctx.scale((512) * 0.5 / Math.PI * Math.pow(2, this.map.getZoom()),(512) * 0.5 / Math.PI * Math.pow(2, this.map.getZoom()));

    if(this.currentRouteName){
      // console.log('current route: '+ this.currentRouteName);
      // console.log(d3.extent(this.data[this.currentRouteName], d => +d.dead_and_missing));

      this.sizeScaler = d3.scaleLinear()
        .domain(d3.extent(this.data[this.currentRouteName], d => +d.dead_and_missing))
        .range([1,50]);

      if(this.currentRouteName === 'Others'){
        // max > 500
        this.sizeScaler = d3.scaleLinear()
          .domain(d3.extent(this.data[this.currentRouteName], d => +d.dead_and_missing))
          .range([1,200]);
      }

      if(this.currentRouteName === 'Central Mediterranean'){
        // max > 500
        this.sizeScaler = d3.scaleLinear()
          .domain(d3.extent(this.data[this.currentRouteName], d => +d.dead_and_missing))
          .range([1,120]);
      }
    }

    this.currentRouteName && this.data[this.currentRouteName].forEach(d =>{
      if(this.banned_category != undefined && this.banned_category.length >0){
        let check = _.find(this.banned_category,banned => banned === d.cause_of_death);
        if(!check){
          this.data_filtered.push(d);
          this.canvas_overlay_drawCall(d);
        }
      }else{
        this.data_filtered.push(d);
        this.canvas_overlay_drawCall(d);
      }
    })

    // quadtree optimized mouseover
    this.tree = d3.quadtree()
      .extent([0,0], [this.mapContainer_width,this.mapContainer_height])
      .x(d => d.map_coord_x)
      .y(d => d.map_coord_y)
      .addAll(this.data_filtered);

    cb && cb();

  }

  canvas_overlay_drawCall(d){
    if(-90 > d.lat || d.lat > 90){
      var ready = this.map.project(new mapboxgl.LngLat(d.lng,90));
    }else{
      var ready = this.map.project(new mapboxgl.LngLat(d.lng,d.lat));
    }
    d.map_coord_x = ready.x;
    d.map_coord_y = ready.y;
    let size = this.sizeScaler(+d.dead_and_missing) * this.size_change;
    var color =  _.find(color_map,_d =>_d.key === d.cause_of_death).value;
    if(this.intersected_id){
      if(d.id === this.intersected_id) {
        var color =  '#FFFFFF';
      }
    }

    this.ctx.beginPath();
    this.ctx.moveTo(d.map_coord_x + size , d.map_coord_y);
    this.ctx.arc(d.map_coord_x, d.map_coord_y, size  , 0, Math.PI*2);
    this.ctx.fillStyle = color;
    // TODO: stroke
    this.ctx.fill();
    // this.ctx.strokeStyle="#FFFFFFCC";
    // this.ctx.lineWidth=4;
    // this.ctx.stroke();
    this.ctx.restore();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render(){
    const style = {
      position: 'absolute',
      width: '100%',
      height: '835px',
      height: window.innerHeight - 60 + 'px',
    };
    return(
      // <Wrapper>

      // </Wrapper>
      <div style={style} ref={el => this.mapContainer = el} />
    )
  }
}
