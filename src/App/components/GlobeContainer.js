import React from 'react';


import * as THREE from 'three';
import * as d3 from 'd3';
import * as _ from 'underscore'


import GlobeVisual from './GlobeVisual'; //child component
import Timeline from './Timeline'; //child component


class GlobeContainer extends React.Component {

  constructor(props){
    super(props);

    this.timelineClicked = this.timelineClicked.bind(this);
    this.state = {
      color: new THREE.Color(0xffffff),
      imgDir: '../globe/',
      colorFn: (x) => {
        const c = new THREE.Color();
        c.setHSL( ( 0.6 - ( x * 0.5 ) ), 0.4, 0.4 ); // r,g,b
        // console.log(c);
        return c;
      },
    }

  }

  componentDidMount(){

    console.log("------ Globe mounted");
    // const url = 'http://' + window.location.hostname + ':2700' + '/data/all';
    const url = 'http://' + window.location.hostname + ':2700' + '/data/global_war';
    this.fetchData(url).then(d =>{

      console.timeEnd("received");

      this.setState({
        warData: d
      });

      this.drawData([d[0]]); //default view (2010);
      this.gv.lastIndex = 0;
      this.gv.transition(this.gv.lastIndex);
      this.gv.animate();

    });

  }

  fetchData(url){
    console.time("received");
    const request = new Request( url, {method: 'GET', cache: true});

    return (
      fetch(request).then(res => res.json()).then(
        d => d = d.map((d) =>{
          let casualty = [];
          // get extreme -> d3.domain().range()
          for (let i = 0; i < d.value[1].length; i+= 4) {
            casualty.push(d.value[1][i+2]);
          }
          let max = d3.max(casualty);
          let min = d3.min(casualty);
          let map = d3.scaleLinear().domain([min,max]).range([0,1]);

          // calculate num
          for (var i = 0; i < d.value[1].length; i+= 4) {
            d.value[1][i+2] = map( d.value[1][i+2] );
          }

          return d.value;
        })
      )
    )
  }

  drawData(data){
    // otherwise won't switch data
    delete this.gv._baseGeometry;

    let data_dict = data.map( (d) =>d[0] );

    for (let i=0;i<data.length;i++) {

      // TODO: data (fetched from API)
      // data add here
      this.gv.addData(data[i][1], {format: 'legend', name: data[i][0], animated: true} );
      // TODO interactive between data
      //addEventListener
      // $('#year'+data[i][0]).mouseover(data_transition(i));
    }


    this.gv.createPoints(data);
  }

  renderGlobeVisual(){
    console.count("---------- Globe's render called");

    return(
      <GlobeVisual
        opts = {{
          imgDir : this.state.imgDir,
          colorFn : this.state.colorFn,
        }}
        // using ref to accsss method from GlobeVisual
        ref = {(gv) => {
          console.log("------ Globe Got reference for GlobeVisual");
          return this.gv = gv;
        }}
      />
    )
  }

  renderGlobeController(){
    return (
      <Timeline
          onClickFn = {this.timelineClicked}
      />
    )
  }

  timelineClicked(year){

    //update visualization
    this.gv.scene.remove(this.gv.points);
    const data = this.state.warData.slice(); //copy state;
    data.forEach((d) => {
      if(d[0] == year ) {
        console.log(d);
        this.drawData([ d ]);
        this.gv.transition(this.gv.lastIndex);
      }
    });
  }

  render(){
    return(
      <div className = 'globe'>
          {this.renderGlobeController()}
          {this.renderGlobeVisual()}
      </div>
    )
  }
}

export default GlobeContainer;
