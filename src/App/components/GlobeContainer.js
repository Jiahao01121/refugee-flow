import React from 'react';
import styled, { css , keyframes } from 'styled-components';
import * as THREE from 'three';
import * as d3 from 'd3';
import * as _ from 'underscore';
import { rgbToHsl } from '../utils/color-conversion-algorithms';
import $ from "jquery";

import GlobeVisual from './GlobeVisual'; //child component
import Timeline from './GlobeTimeline'; //child component
import GlobeStatsBoard from './GlobeStatsBoard'; //child component
import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './LoadingBar';
import RegionModalButton from './RegionModalButton';
import { ScaleLoader } from 'react-spinners';
import GlobeRouteButton from './GlobeRouteButton'

const Scroll = require('scroll-js');
const cot_latLng = require('../data/cot_latLng.json');

const Wrapper = styled.div`
  & ::selection {
    background: none;
    color: none;
    }
`
const TitleContainer = styled.div`
  position: absolute;
  ${'' /* background: #0000ff61; */}
  width: ${window.innerWidth - 30 - (0.25 * window.innerWidth) + 'px'};
  left: 30px;
  top: 40px;
`
const TitleText = styled.p`
  font-family: 'Roboto';
  font-size: 25px;
  font-weight: 100;
  color: white;
  margin-top: 25px;
  cursor: pointer;
  position: absolute;

  &:after{
    background-image: url(./assets/title_icon.png);
    background-size: 14px 14px;
    display: inline-block;
    width: 14px;
    height: 14px;
    content: "";
    bottom: 10px;
    right: 0px;
    position: relative;
    cursor: pointer;
  }

  &:before{
    content: 'Select & filter regional conflict data';
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    width: 300px;
    top: 40px;
  }
`
const DataSource = styled.div`
  fill: white;
  position: absolute;
  right: 4%;
  cursor: pointer;
  opacity: 0.8;
  transition: all 200ms;
  top: 81vh;
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
const GlobeControllerButton = styled.button`
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 15px;
  color: #ffffff66;
  left: 30px;
  position: absolute;
  background: none;
  border: none;
  top: 160px;
  margin: 0px;
  z-index: 10;
  transition: all 300ms;
  cursor: pointer;

  &:before{
    background-image: url(./assets/globe_icon.png);
    background-size: 50%;
    width: 60px;
    height: 40px;
    background-repeat: no-repeat;
    display: inline-block;
    content: "";
    bottom: -16px;
    right: 28px;
    position: absolute;
    margin-right: 10px;
  }

  &:hover{
    color: #ffffffd1;
  }
`
const GlobeControllerItems = styled.div`
  position: absolute;
  top: 160px;
  left: 20px;
  transition: all 300ms ease-in-out;
  ${props => !props.show
  ? css`
    transform: translateX(-300px);
    opacity: 0;
  `
  : css`
    transform: translateX(90px);
    opacity: 1;
  `}
`
const AllConflict = styled.button`
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 100;
  font-size: 12px;
  color: white;
  background: none;
  border: none;

  ${props => props.selectornot == 1 && css`
    font-weight: 600;
  `}
`
const Conflict_Civilians = styled.button`
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 100;
  font-size: 12px;
  color: white;
  background: none;
  border: none;
  ${props => props.selectornot == 2 && css`
    font-weight: 600;
  `}
`
const LegendWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  left: 165px;
  height: 15px;

  &:before{
    content: ${props => props.minMax && "'"+props.minMax[1]+"'"};
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    top: 18px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 10px;
  }

  &:after{
    content: ${props => props.minMax && "'"+props.minMax[0]+"'"};
    right: 0;
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    top: 18px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 10px;
  }
`
const LegendTitle = styled.p`
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 14.2px;
  position: absolute;
  color: white;
  top: -50px;
  &:before{
    content: ${props => props.mode === 1 ? "'Max'" : "'Others'" };
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    top: 21px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 10px;
  }

  &:after{
    content: ${props => props.mode === 1 ? "'Min'" : "'Civilians'" };
    font-weight: 300;
    color: white;
    font-size: 12px;
    right: 0px;
    position: absolute;
    top: 21px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 10px;
  }
`
const Legend = styled.img`
  width: 90px;
  opacity: 0.5;
  transition: all 400ms;
  &:hover{
    opacity: 1;
  }
`
const GlobeNavPanel = styled.div`
  position: absolute;
  top: 105px;
  right: 28.6%;
`
const Compass = styled.img`
  position: absolute;
  width: 32px;
  left: -3px;
  cursor: pointer;
  opacity: .6;
  transition: all 300ms;
  &:hover{
    opacity: 1;
  }
`
const ZoomIn = styled.img`
  position: absolute;
  width: 25px;
  top: 41px;
  cursor: pointer;
  opacity: .6;
  transition: all 300ms;
  &:hover{
    opacity: 1;
  }
`
const ZoomOut = styled.img`
  position: absolute;
  width: 25px;
  top: 73px;
  cursor: pointer;
  opacity: .6;
  transition: all 300ms;
  &:hover{
    opacity: 1;
  }
`

class GlobeContainer extends React.Component {

  constructor(props){
    super(props);
    this.timlineYearClicked = this.timlineYearClicked.bind(this);
    this.timlineQuaterClicked = this.timlineQuaterClicked.bind(this);
    this.globeControllerClick = this.globeControllerClick.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.removeCountryHandler = this.removeCountryHandler.bind(this);
    this.changeCountryData = this.changeCountryData.bind(this);

    const color = rgbToHsl(22,247,123);
    this.state = {
      color   : new THREE.Color(0xffffff),
      imgDir  : '../assets/globe/',
      colorFn : (x) => {
        const c = new THREE.Color();
        c.setHSL(
          color[0] + 0.4*x
          ,
          0.87 + 0.13*x// color[1]
          ,
          0.56// color[2]
        );
        return c;
      },
      currentYear : '2010',
      //globevisual's props
      rotatePause : false,
      //loading state
      loadingStatus : true,
      loadingText   : 'Loading...',

      data: [],
      controllerShow: true,
      currentControllerSelection: 1,
      currentCountry: 'GLOBAL',
      countryData:[],
      country_totalFatality : [],
      country_civilianFatality : [],
      country_totalConflictCount : []
    }
    // TODO: web worker
    // this.vkthread = window.vkthread;

    this.history = props.history;

  }

  componentWillReceiveProps(nextProps){
    this.history = nextProps.history;
  }

  componentDidMount(){

    this.timeLineScroll = new Scroll($('.TimelineWrapper')[0]);

    const url = 'http://' + window.location.hostname + ':2700' + '/data/reduced_war_data';

    this.fetchData(url).then(d =>{
      d.forEach((d,i) => {
        console.log('year: ' + i + ' | dataPoint: ' + d.value[0][1].length);
      })

      return ({
        'warData' : d,
        'loadingStatus': true,
        loadingText : 'Loading Globe...'
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
        this.gv.octree.update( () => {
          this.setState({loadingStatus: false});
          console.time('animate takes');
          this.gv.animate();
          this.gv.setTarget([-11.874010, 44.605859],945) // set initial position
          console.timeEnd('animate takes');
          this.props.loadingManager(false);

          this.setState({controllerShow: false})
        }); // this takes a long time
      },10)

    })
  }

  fetchData(url){
    const request = new Request( url,  {
      method: 'GET',
      cache: 'force-cache'
    });
    return (
      fetch(request).then(res => res.json()).then(
        d => {
          this.setState({data: d});

          return d = d.map(data =>{

            // for stats Board
            const totalFatalityArr = [];
            const civilianFatalityArr = [];
            var totalConflictCount = 0;
            //
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

                // for statsBoard
                totalFatalityArr.push(d.fat);
                d.evt === 0 && civilianFatalityArr.push(d.fat);
                totalConflictCount++;
                //
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
                  {
                    'evt': d.evt,
                    'cot': d.cot
                  }
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
                totalFatality: _.reduce(totalFatalityArr, (a,c) => a+c, 0),
                civilianFatality: _.reduce(civilianFatalityArr, (a,c) => a+c, 0),
                totalConflictCount:totalConflictCount
            }


          })
        }

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
      this.gv.transition(0);// Animate to all records within the currentYear;
    } else {
      //switch data
      this.setState({loadingStatus : true, loadingText : 'Switching data to '+ year,currentControllerSelection:1})
      this.timeLineScroll.toElement($('.individualWrapper')[year.charAt(3)]).then(()=>console.log('aaaaa'));

      this.gv.transition(5,() => {
        //update visualization
        this.gv.octree.remove(this.gv.points); //takes ~ 10ms
        this.gv.scene.remove(this.gv.points); //takes ~ 10ms
        if(this.state.currentCountry === 'GLOBAL'){

          this.state.warData.slice().forEach((d,i) => {
            if(d.year === year ) {
              // inform parent component of changed current year;
              this.props.changeYearManager(i);
              // here only happens once.
              this.drawData( d.value );
              // set scaler.
              this.gv.scaler = d.scaler;
              //after init octree, present animation
              this.gv.octree.update(() =>{
                this.gv.transition(0);
                // inform parent component loading status
                this.props.loadingManager(false);
                this.setState({
                  rotatePause: false,
                  currentYear: year,
                  loadingStatus : false,
                  loadingText   : '',
                });
              });
            };
          });

        }else{
          this.props.changeYearManager(+year.charAt(3));
          this.drawData(_.find(this.state.countryData,d => d.year === year)['value']);
          this.gv.scaler = _.find(this.state.warData,d => d.year === year)['scaler'];
          this.gv.octree.update(() =>{
            this.gv.transition(0);
            // inform parent component loading status
            this.props.loadingManager(false);
            this.setState({
              rotatePause: false,
              currentYear: year,
              loadingStatus : false,
              loadingText   : '',
            });
          });
        }

      });
    } //else

  }

  timlineQuaterClicked(quater){
    this.gv.transition(quater); // Animate to selected quater;
  }

  globeControllerClick(id){
    if(this.state.currentControllerSelection != id){
      if(id === 1){
        this.gv.opts.colorFn = this.state.colorFn;
        this.setState({loadingStatus : true, loadingText : 'Filtering Data...',currentControllerSelection: id})
        this.gv.transition(5,() => {
          this.gv.octree.remove(this.gv.points); //takes ~ 10ms
          this.gv.scene.remove(this.gv.points); //takes ~ 10ms
          if(this.state.currentCountry === 'GLOBAL'){
            this.state.warData.slice().forEach((d,i) => {
              if(d.year == this.state.currentYear) {
                this.drawData( d.value );
                this.gv.scaler = d.scaler;
                this.gv.octree.update(() =>{
                  this.gv.transition(0);
                  // inform parent component loading status
                  this.props.loadingManager(false);
                  this.setState({
                    rotatePause: false,
                    loadingStatus : false,
                    loadingText   : '',
                  });
                });
              };
            });

          }else{
            this.state.countryData.forEach((d,i) => {
              if(d.year == this.state.currentYear) {
                this.drawData( d.value );
                this.gv.scaler = _.find(this.state.warData, _d => _d.year === d.year)['scaler'];

                this.gv.octree.update(() =>{
                  this.gv.transition(0);
                  // inform parent component loading status
                  this.props.loadingManager(false);
                  this.setState({
                    rotatePause: false,
                    loadingStatus : false,
                    loadingText   : '',
                  });
                });
              }
            })
          }

        });
      }
      else if(id === 2){
        this.setState({loadingStatus : true, loadingText : 'Filtering Data...',currentControllerSelection: id})
        this.gv.opts.colorFn = (x,criteria) => criteria.evt !=0 ? new THREE.Color('#004542') : new THREE.Color('#F44745');

        this.gv.transition(5,() => {
          // filter out violance not against civilians
          if(this.state.currentCountry === 'GLOBAL'){
            this.state.warData.forEach((d,i) =>{
              if(d.year === this.state.currentYear){
                this.gv.octree.remove(this.gv.points); //takes ~ 10ms
                this.gv.scene.remove(this.gv.points); //takes ~ 10ms
                this.drawData( d.value );
                this.gv.scaler = _.find(this.state.warData,d => d.year === this.state.currentYear)['scaler'];
                this.gv.octree.update(() =>{
                  this.gv.transition(0);
                  // inform parent component loading status
                  this.props.loadingManager(false);
                  this.setState({
                    rotatePause: false,
                    loadingStatus : false,
                    loadingText   : '',
                  });
                });
              };
            });
          }else{
            this.state.countryData.forEach((d,i) => {
              if(d.year == this.state.currentYear) {
                this.drawData( d.value );
                this.gv.scaler = _.find(this.state.warData, _d => _d.year === d.year)['scaler'];
                this.gv.octree.update(() =>{
                  this.gv.transition(0);
                  // inform parent component loading status
                  this.props.loadingManager(false);
                  this.setState({
                    rotatePause: false,
                    loadingStatus : false,
                    loadingText   : '',
                  });
                });
              }
            })
          }
        });
      };
    };
  }

  countryChangeHandler(country,year){
    this.setState({currentCountry: country});
    this.changeCountryData(country,year);
  }

  changeCountryData(country,year){

    // inform parent component currentCountry
    this.props.changeCountryManager(country);

    if(year === null){year = '2010'}else{year = '201'+ year}

    this.timeLineScroll.toElement($('.individualWrapper')[year.charAt(3)]);

    const data = JSON.parse(JSON.stringify(this.state.warData));
    const country_totalFatality = []
    const country_civilianFatality = []
    const country_totalConflictCount = []

    data.forEach((d,_i) =>{

      // for stats Board
      let totalFatalityArr = [];
      let civilianFatalityArr = [];
      let totalConflictCount = 0;

      d.value.forEach(d =>{
        let t = d[1];
        for (let i = t.length - 1; i >=0; i-=4) {
          if(t[i].cot!=undefined && t[i].cot[0].toUpperCase() == country){
            // for statsBoard
            if(d[0] ==='all'){
              totalFatalityArr.push(this.state.warData[_i].scaler.invert(t[i].fat));
              t[i].evt === 0 && civilianFatalityArr.push(this.state.warData[_i].scaler.invert(t[i].fat));
              totalConflictCount++;
            }

          }else{
            t.splice(i-3,4);
          }
        }
      })

      country_totalFatality.push({
        'year': d.year,
        'totalFatality': _.reduce(totalFatalityArr, (a,c) => a+c, 0),
      })
      country_civilianFatality.push({
        'year': d.year,
        'civilianFatality': _.reduce(civilianFatalityArr, (a,c) => a+c, 0),
      })
      country_totalConflictCount.push({
        'year': d.year,
        'totalConflictCount': totalConflictCount
      })

    })

    //switch data
    this.setState({
      loadingStatus : true,
      loadingText : 'Switching to ' + country + '...',
      countryData: data,
      currentYear: year,
      country_totalFatality : country_totalFatality,
      country_civilianFatality : country_civilianFatality,
      country_totalConflictCount : country_totalConflictCount
    })

    this.gv.transition(5,() => {

      this.gv.octree.remove(this.gv.points); //takes ~ 10ms
      this.gv.scene.remove(this.gv.points); //takes ~ 10ms
      this.props.changeYearManager(+year.charAt(3));
      this.drawData(_.find(data,d => d.year === this.state.currentYear)['value']);
      this.gv.scaler = _.find(this.state.warData,d => d.year === this.state.currentYear)['scaler'];

      this.gv.octree.update(() =>{
        this.gv.transition(0);
        // inform parent component loading status
        this.props.loadingManager(false);
        this.setState({
          rotatePause: false,
          loadingStatus : false,
          loadingText   : '',
        });
        const latLng = _.find(cot_latLng, d=> d.cot.toUpperCase() === country );
        if(latLng != undefined){
          this.gv.setTarget([latLng.lat,latLng.lng],700)
        }
      });

    });


  }

  removeCountryHandler(){
    if(this.state.currentCountry != 'GLOBAL'){

      this.setState({
        loadingStatus : true,
        loadingText : 'Returning to Global View...',
        currentCountry: 'GLOBAL',
      })
      // inform parent component currentCountry
      this.props.changeCountryManager('GLOBAL');

      this.gv.transition(5,() => {

        this.gv.octree.remove(this.gv.points); //takes ~ 10ms
        this.gv.scene.remove(this.gv.points); //takes ~ 10ms

        this.state.warData.slice().forEach((d,i) => {
          if(d.year === this.state.currentYear ) {
            // inform parent component of changed current year;
            this.props.changeYearManager(i);
            // here only happens once
            this.drawData( d.value );
            // set scaler
            this.gv.scaler = d.scaler;
            //after init octree, present animation
            this.gv.octree.update(() =>{
              this.timeLineScroll.toElement($('.individualWrapper')[this.state.currentYear.charAt(3)]).then(()=>console.log('aaaaa'));
              this.gv.transition(0);
              this.gv.setTarget([-11.874010, 44.605859],945) // set initial position
              // inform parent component loading status
              this.props.loadingManager(false);
              this.setState({
                rotatePause: false,
                loadingStatus : false,
                loadingText   : '',
              });
            });
          };
        });

      });

    }
  }

  render(){

    return(

      <Wrapper className = 'globe'>
        <TitleContainer>
          <TitleText onClick={() => d3.select('.annotation-wrapper').style('display','block').transition().delay(10).style('opacity','1') }> {'Armed Conflict - ' + this.state.currentCountry.charAt(0).toUpperCase() + this.state.currentCountry.toLowerCase().slice(1) } </TitleText>
          <DataSource onClick={() => window.open('https://www.acleddata.com/data/', '_blank')}>
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
            </svg>
          </DataSource>
          <RegionModalButton
             data={this.state.warData}
             countryChangeHandler = {this.countryChangeHandler}
             removeCountryHandler = {this.removeCountryHandler}
             currentCountry={this.state.currentCountry}
           />
          <GlobeControllerButton onClick ={() => this.setState({controllerShow : !this.state.controllerShow})} >GLOBE</GlobeControllerButton>

          <GlobeControllerItems show ={this.state.controllerShow}>

            <AllConflict
              selectornot = {this.state.currentControllerSelection}
              onClick = {() => this.globeControllerClick(1)}
              >All Armed Conflict
            </AllConflict>

            <Conflict_Civilians
              selectornot = {this.state.currentControllerSelection}
              onClick = {() => this.globeControllerClick(2)}
              >Conflict Against Civilians
            </Conflict_Civilians>

            {/* TODO: heat map implimentation */}
            {/* <Heat_map
              selectornot = {this.state.currentControllerSelection}
              onClick = {() => this.globeControllerClick(3)}
              >Heat Map
            </Heat_map> */}

          </GlobeControllerItems>
        </TitleContainer>
          {this.renderGlobeTimeline()}
          <GlobeRouteButton history = {this.history} country = {this.state.currentCountry} />
          {this.renderGlobeVisual()}
        <GlobeNavPanel>
          <Compass src='./assets/compass_icon.png' onClick={() => this.gv.setTarget([-11.874010, 44.605859],945)}></Compass>
          <ZoomIn  src='./assets/zoomin_icon.png'  onClick={() => this.gv.zoom(100)}></ZoomIn>
          <ZoomOut src='./assets/zoomout_icon.png' onClick={() => this.gv.zoom(-100)}></ZoomOut>
        </GlobeNavPanel>
        <LegendWrapper minMax = {this.state.warData && this.state.warData[+this.state.currentYear.charAt(3)]['scaler'].domain()}>
          <LegendTitle mode={this.state.currentControllerSelection}>Fatality Count</LegendTitle>
          <Legend src={this.state.currentControllerSelection === 1 ? './assets/globe_lagend-all.png' : './assets/globe_lagend-civilian.png'}></Legend>
        </LegendWrapper>

        <GlobeStatsBoard data = {
          this.state.warData && {
            'Total Fatality': (()=>{
              if(this.state.currentCountry === 'GLOBAL'){
                return _.find(this.state.warData,d => d.year === this.state.currentYear)['totalFatality']
              }else{
                return this.state.country_totalFatality.length>0 && _.find(this.state.country_totalFatality,d => d.year === this.state.currentYear)['totalFatality']
              }
            })(),
            'Civilian Fatality': (()=>{
              if(this.state.currentCountry === 'GLOBAL'){
                return _.find(this.state.warData,d => d.year === this.state.currentYear)['civilianFatality']
              }else{
                return this.state.country_civilianFatality.length>0 && _.find(this.state.country_civilianFatality,d => d.year === this.state.currentYear)['civilianFatality']
              }
            })(),
            'Armed Conflict Count': (()=>{
              if(this.state.currentCountry === 'GLOBAL'){
                return _.find(this.state.warData,d => d.year === this.state.currentYear)['totalConflictCount']
              }else{
                return this.state.country_totalConflictCount.length>0 && _.find(this.state.country_totalConflictCount,d => d.year === this.state.currentYear)['totalConflictCount']
              }
            })()
          }

        }></GlobeStatsBoard>
      </Wrapper>
    )
  }
}

export default GlobeContainer;
