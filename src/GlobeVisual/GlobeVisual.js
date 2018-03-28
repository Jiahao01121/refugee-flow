import React from 'react';

import * as d3 from 'd3';
import Globe from './globe';
const data = require('./t.json');
console.log(data);

class GlobeVisual extends React.Component{
  constructor(props){
    super(props);
    // this.start = this.start.bind(this)
    // this.stop = this.stop.bind(this)
    // this.animate = this.animate.bind(this)
    this.data_transition = this.data_transition.bind(this);
  }

  componentDidMount(){

    const data_dict = data.map( (d) =>d[0] );
    let lastIndex = 0;
    this.lastIndex = lastIndex;
    const globe = new Globe(this.mount, {imgDir: './globe/'});
    this.globe = globe;

    let throttle = false;
    this.throttle = throttle;


    for (let i=0;i<data.length;i++) {
      // data add from outside lib
      this.globe.addData(data[i][1], {format: 'legend', name: data[i][0], animated: true});
      //addEventListener
      // $('#year'+data[i][0]).mouseover(data_transition(i));
    }
    this.globe.createPoints(data);

    this.data_transition(this.lastIndex)();

    this.globe.animate();



  }

  componentWillUnmount() {
    // TODO: delete stuff after unmount
  }

  data_transition (currentIndex) {

    return () => {

      // var currentSelection = $('#year'+data_dict[currentIndex]);
      /*return here, the rest of the function won't excute.*/
      // if (currentSelection.attr('class') === 'year active') { return }

      //set button focus
      // var yy = $('.year');
      // for(var i=0; i<yy.length; i++) { yy[i].setAttribute('class','year') };
      // currentSelection.toggleClass('active');


      // transition
      console.log(this);
      if(this.throttle){
        this.globe.points.morphTargetInfluences[this.lastIndex] = 0;
        this.globe.points.morphTargetInfluences[currentIndex] = 1;
        this.lastIndex = currentIndex;

        return;
       } else {

        const timer = d3.timer((e) =>{

          this.throttle = true;
          let t = Math.min(1,d3.easeCubicInOut(e/4000));
          // old data
          this.globe.points.morphTargetInfluences[this.lastIndex] = 1 -t;
          // new data
          // console.log(currentIndex);
          this.globe.points.morphTargetInfluences[currentIndex] = t;

          if (t == 1) {
            timer.stop();
            this.throttle = false;
            this.lastIndex = currentIndex;
          }
        })
      }

      console.log("transition");
    }; //clousure

  } //trans


  start(){
    // if (!this.frameId) {

      // this.frameId = requestAnimationFrame(this.animate)
    // }

  }

  animate() {
    // this.renderer.render(this.scene, this.camera);
    // get frameID
    // this.frameId = window.requestAnimationFrame(this.animate)

  }



  render(){
    return(
      <div id="globe"
        style={{ width: window.innerWidth, height: window.innerHeight}}
        ref={(mount) => {return this.mount = mount }}
      />
    )
  }
}

export default GlobeVisual
