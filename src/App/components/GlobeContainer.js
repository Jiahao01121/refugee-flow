import React from 'react';


import * as THREE from 'three';
import * as d3 from 'd3';
import * as _ from 'underscore'


import GlobeVisual from './GlobeVisual'; //child component
import Timeline from './GlobeTimeline'; //child component
import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './LoadingBarWrapper';
import ModalButton from './ModalButton';

import { ScaleLoader } from 'react-spinners';
import styled, {css} from 'styled-components';

class GlobeContainer extends React.Component {

  constructor(props){
    super(props);

    this.timlineYearClicked = this.timlineYearClicked.bind(this);
    this.timlineQuaterClicked = this.timlineQuaterClicked.bind(this);

    this.state = {
      color   : new THREE.Color(0xffffff),
      imgDir  : '../globe/',
      colorFn : (x) => {
        const c = new THREE.Color();
        c.setHSL( ( 0.6 - ( x * 0.5 ) ), 0.4, 0.4 ); // r,g,b
        // console.log(c);
        return c;
      },
      currentYear : '2010',
      //globevisual's props
      rotatePause : false,
      //loading state
      loadingStatus : true,
      loadingText   : 'Fetching data from the server...',

      titleText : 'Global'
    }
    this.vkthread = window.vkthread;

  }

  componentDidMount(){

    const url = 'http://' + window.location.hostname + ':2700' + '/data/war_all';

    this.fetchData(url).then(d =>{

      console.timeEnd("received & processed data");

      return ({
        'warData' : d,
        'loadingStatus': true,
        loadingText : 'WebGL Initialization...'
      })

    }).then((loadingState) =>{
      this.setState({
        loadingStatus: loadingState.loadingStatus,
        loadingText: loadingState.loadingText,
        warData: loadingState.warData
      })
      return;

    }).then(() =>{

      setTimeout(() => {
        this.drawData(this.state.warData[0].value); // Default view : 2010
        this.gv.scaler = this.state.warData[0].scaler; // Default scaler : 2010's
        // this.gv.setTarget([40.226460, 17.442115], 250)
        this.gv.lastIndex = 0; // For animation purpose;
        this.gv.transition(this.gv.lastIndex); // Animate interface;
        this.gv.octree.update( () => this.setState({loadingStatus: false}) ); // this takes a long time
        this.gv.animate();
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
          let scaler = d3.scaleLinear().domain(minMax).range([0,1]);
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

    return(
      <div style={{width: '75%' }}>
        <LoadingDivWrapper loading={this.state.loadingStatus} leftPercentage='37.5%'>
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

      //switch data
      this.setState({
        loadingStatus : true,
        loadingText   : 'Switching data to '+ year,
      })
      this.gv.transition(5,() => {

        //update visualization
        this.gv.octree.remove(this.gv.points); //takes ~ 10ms
        this.gv.scene.remove(this.gv.points); //takes ~ 10ms

        this.state.warData.slice().forEach((d,i) => {
          if(d.year == year ) {

            // inform parent component of changed current year;
            (() => {
              this.props.changeYearManager(i);
            })();

            // here only happens once.
            this.drawData( d.value );
            this.gv.scaler = d.scaler;

              this.setState({
                rotatePause: true,
                currentYear: year,
                loadingStatus : true,
                loadingText   : 'Optimizing Octree...',
              });

              this.gv.transition(0,() => {
                this.gv.octree.update(() =>{
                  this.setState({
                    rotatePause: false,
                    loadingStatus : false,
                    loadingText   : '',
                  });
                });
              });


          } //
        });
      });

    } //else

  }

  timlineQuaterClicked(quater){
    this.gv.transition(quater); // Animate to selected quater;
  }

  render(){

    const TitleContainer = styled.div`
      position: absolute;
      ${'' /* background: #0000ff61; */}
      width: ${window.innerWidth - 30 - (0.25 * window.innerWidth) + 'px'};
      left: 30px;
      top: 110px;
    `

    const TitleText = styled.p`
      font-family: 'Roboto';
      font-size: 25px;
      font-weight: 300;
      color: white;
      margin-top: 0;

      &:after{
        background-image: url(./title_icon.png);
        background-size: 14px 14px;
        display: inline-block;
        width: 14px;
        height: 14px;
        content: "";
        bottom: 10px;
        right: 0px;
        position: relative;
      }

      &:before{
        content: 'select regions & filter downbelow to switch country/matrix...';
        font-weight: 400;
        color: white;
        font-size: 12px;
        position: absolute;
        width: 320px;
        bottom: -7px;
      }
    `

    const SwitchCountryButton = styled.button`
      cursor: pointer;
      text-decoration: underline;
      color: white;
      font-family: 'Roboto';
      font-size: 15px;
      font-weight: 500;
      background: none;
      border: none;
      position: absolute;
      top: 110px;
      left: 20px;

      &:after{
        content: '>';
        font-weight: 900;
        color: white;
        font-size: 15px;
        position: absolute;
        right: -8px;
      }

      &:before{
        background-image: url(./location_icon.png);
        background-size: 50%;
        background-repeat: no-repeat;
        display: inline-block;
        width: 33px;
        height: 27px;
        content: "";
        bottom: 0px;
        right: 58px;
        position: absolute;
      }
    `

    // const GlobeControllerButton = styled.button`
    //   cursor: pointer;
    //   font-family: 'Roboto';
    //   font-weight: 600;
    //   font-size: 15px;
    //   color: #ffffff66;
    //   left: 30px;
    //   position: absolute;
    //   background: none;
    //   border: none;
    //   top: 160px;
    //   margin: 0px;
    //
    //   &:before{
    //     background-image: url(./globe_icon.png);
    //     background-size: 50%;
    //     width: 60px;
    //     height: 40px;
    //     background-repeat: no-repeat;
    //     display: inline-block;
    //     content: "";
    //     bottom: -16px;
    //     right: 12px;
    //     position: absolute;
    //     margin-right: 10px;
    //   }
    // `

    return(
      <div className = 'globe'>
        <TitleContainer>
          <TitleText> {'Armed Conflict: ' + this.state.titleText} </TitleText>

          <SwitchCountryButton>GLOBAL</SwitchCountryButton>
          <ModalButton />MAP

          {/* <GlobeControllerItems>
            <AllConflict>Show All Armed Conflict</AllConflict>
            <Conflict_Civilians>Show Only Conflict Against Civilians</Conflict_Civilians>

          </GlobeControllerItems> */}
        </TitleContainer>
          {this.renderGlobeTimeline()}
          {this.renderGlobeVisual()}
      </div>
    )
  }
}

export default GlobeContainer;
