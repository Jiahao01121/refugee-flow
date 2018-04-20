import React from 'react';


import * as THREE from 'three';
import * as d3 from 'd3';
import * as _ from 'underscore'


import GlobeVisual from './GlobeVisual'; //child component
import Timeline from './GlobeTimeline'; //child component

import { ScaleLoader } from 'react-spinners';
import styled, {css} from 'styled-components';

class GlobeContainer extends React.Component {

  constructor(props){
    super(props);

    this.timlineYearClicked = this.timlineYearClicked.bind(this);
    this.timlineQuaterClicked = this.timlineQuaterClicked.bind(this);

    this.state = {
      color: new THREE.Color(0xffffff),
      imgDir: '../globe/',
      colorFn: (x) => {
        const c = new THREE.Color();
        c.setHSL( ( 0.6 - ( x * 0.5 ) ), 0.4, 0.4 ); // r,g,b
        // console.log(c);
        return c;
      },
      currentYear: '2010',

      rotatePause: false,

      loadingStatus : true,
      loadingText   : 'Fetching data from the server...',

    }
    this.vkthread = window.vkthread;

  }

  componentDidMount(){

    console.log("------ Globe mounted");

    const url = 'http://' + window.location.hostname + ':2700' + '/data/war_all';

    this.fetchData(url).then(d =>{
      console.timeEnd("received & processed data");
      this.setState({ warData: d })

      return { 'loadingStatus': true, loadingText : 'WebGL Initialization...'}
    })

    .then((loadingState) =>{

      this.setState({
        loadingStatus: loadingState.loadingStatus,
        loadingText: loadingState.loadingText
      })
    })

    .then(() =>{
      console.log("second stage");
      setTimeout(() => {
              this.drawData(this.state.warData[0].value); // Default view : 2010
              this.gv.scaler = this.state.warData[0].scaler; // Default scaler : 2010's

              // this.gv.setTarget([40.226460, 17.442115], 250)

              // 4.71238898038469,0.5235987755982988
              this.gv.lastIndex = 0; // For animation purpose;
              this.gv.transition(this.gv.lastIndex); // Animate interface;
              this.gv.octree.update(); // this takes a long time
              this.gv.animate();

              this.setState({
                loadingStatus: false,
                loadingText: ''
              })
      },10)
    })

  }

  fetchData(url){

    console.time("received & processed data");
    const request = new Request( url, {method: 'GET', cache: true});
    return (
      fetch(request).then(res => res.json()).then(

        d => d = d.map(data =>{

          const data_year = data.Year;
          const data_value = data.value;
          const minMax = (()=>{
            if(Object.keys(data_value).length == 4){
              const arr = data_value[ Object.keys(data_value)[0] ].concat(
                data_value[ Object.keys(data_value)[1] ],
                data_value[ Object.keys(data_value)[2] ],
                data_value[ Object.keys(data_value)[3] ],
              )



              let max = d3.max(arr,d => d.fat )
              let min = d3.min(arr,d => d.fat )
              return [min,max];
            }else{
              console.log("err at compute max/min");
            }
          })();
          const scaler = d3.scaleLinear().domain(minMax).range([0,1]);
          const out = [];
          const all = [];
          const noHeight = [];

          for (var quater in data_value) {

            let output = [];
            data_value[quater].forEach(d =>{
              all.push(
                d.lat,
                d.lng,
                scaler(d.fat),
                {
                  'fat' : scaler(d.fat),
                  'id': d.id,
                  'int': d.int,
                  'cot': d.cot,
                  'evt': d.evt,
                }
              )

              noHeight.push(
                d.lat,
                d.lng,
                0,
                {}
              )
            })

            for (var _q in data_value) {

              // console.log(quater);
              // console.log(_q);
              // console.log(data[_q]);

              if(_q === quater){

                data_value[_q].forEach(d =>{
                  output.push(
                    d.lat,
                    d.lng,
                    scaler(d.fat),
                    {
                      'fat' : scaler(d.fat),
                      'id': d.id,
                      'int': d.int,
                      'cot': d.cot,
                      'evt': d.evt,
                    }
                  )
                })
              }
              else {

                data_value[_q].forEach(d =>{
                  output.push(
                    d.lat,
                    d.lng,
                    -1, // height
                    {
                      'fat' : scaler(d.fat), // color
                      'id': d.id,
                      'int': d.int,
                      'cot': d.cot,
                      'evt': d.evt,
                    }
                  )
                })
              }

            }// for in

            out.push([quater,output]);

          }

          return {
              year : data_year,
              value : [ ['all',all] ].concat(out,[ ['noHeight',noHeight] ]),
              scaler: scaler,
          }


        })

      )
    )
  }

  drawData(data){

    // otherwise won't switch data
    delete this.gv._baseGeometry;

    // let data_dict = data.map( (d) =>d[0] );

    console.time('********************add data takes');
    data.forEach(d => this.gv.addData(d[1], {format: 'legend', name: d[0], animated: true} ) ) // this loop takes a quite bit time
    console.timeEnd('********************add data takes');

    this.gv.createPoints(data); // doesn't take time

    console.time('********************octree update takes');
    this.gv.renderer.render(this.gv.scene, this.gv.camera); // this takes quite a bit time

    console.timeEnd('********************octree update takes');
  }

  renderGlobeVisual(){
    console.count("---------- Globe's render called");

    const LoadingDivWrapper = styled.div`
      position: absolute;
      top: 50%;
      left: 37.5%;
      display: block;
      transform: translate(-50%,-50%);
      ${props => !props.loading && css`
        display: none;
      `}
    `
    const LoaderGraphWrapper = styled.div`
      position: absolute;
      left:50%;
      transform: translate(-50%,-50%);
    `
    const LoadingIndicator = styled.p`
      font-family: 'Roboto';
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
      margin-top: 25px;
    `

    return(
      <div style={{width: '75%' }}>
        <LoadingDivWrapper loading={this.state.loadingStatus}>
          <LoaderGraphWrapper>
            <ScaleLoader color= {'#ffffff'} loading={this.state.loadingStatus}/>
          </LoaderGraphWrapper>
          <LoadingIndicator>{this.state.loadingText}</LoadingIndicator>
          </LoadingDivWrapper>

        <GlobeVisual
          opts = {{ imgDir : this.state.imgDir, colorFn : this.state.colorFn }}
          rotatePause = {this.state.rotatePause}
          ref = {gv => this.gv = gv}
        />
      </div>
    )
  }

  renderGlobeTimeline(){
    return (
      <Timeline
          onClickYear = {this.timlineYearClicked}
          onClickQuater = {this.timlineQuaterClicked}
          currentYear = {this.state.currentYear}
      />
    )
  }

  timlineYearClicked(year){

    if(year == this.state.currentYear){

      // Animate to all records within the currentYear;
      this.gv.transition(0);
    } else {

      this.setState({
        loadingStatus : true,
        loadingText   : 'Switching data to '+ year,
      })

      this.gv.transition(5,() => {

        //update visualization
        this.setState({
          currentYear: year,
        });

        this.gv.octree.remove(this.gv.points); //takes ~ 10ms
        this.gv.scene.remove(this.gv.points); //takes ~ 10ms

        this.state.warData.slice().forEach((d) => {
          if(d.year == year ) {
            // here only happens once.
            this.drawData( d.value );
            this.setState({ rotatePause: true });
            this.gv.transition(0,() => {
              this.gv.octree.update();
              this.setState({ rotatePause: false });
            });
          }
        });
      });

    } //else

  }

  timlineQuaterClicked(quater){
    this.gv.transition(quater); // Animate to selected quater;
  }


  render(){
    return(
      <div className = 'globe'>
          {this.renderGlobeTimeline()}
          {this.renderGlobeVisual()}
      </div>
    )
  }
}

export default GlobeContainer;
