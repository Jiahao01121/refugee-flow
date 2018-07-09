import React, { Component } from 'react'
import styled from 'styled-components';
import * as d3 from 'd3';
import * as _ from 'underscore';

const Quote = styled.p`
  position: absolute;
  font-family: 'Ubuntu';
  width: 610px;
  text-align: justify;
  top: ${props => props.animation?'220px':'170px'}
  opacity: ${props => props.animation?1:0}
  left: 50%;
  transform: translateX(-50%);
  font-size: 25px;
  font-weight: 900;
  line-height: 2.4;
  color: #ffffff;
  box-shadow: 0px 12px 10px -11px #e04111;
  transition: top 2100ms,opacity 4300ms;
`

const Author = styled.p `
  top: 77%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Ubuntu';
  font-size: 14px;
  bottom: 0px;
  color: #FF5722;
  background: #4c3c2c3d;
  border-radius: 4px;
  margin: 0;
  height: 20px;
  padding: 20px 30px;
`

const Section = styled.section`
  height: 100vh;

  &>video{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    transition: opacity 5500ms, filter 1500ms;
    opacity: ${props => props.animation?1:0};
    filter: ${props =>
      props.videoLoop
        ? 'blur('+ d3.randomUniform(0, 20)()+'px'+') hue-rotate(0deg) contrast(1.2) saturate(0.8) brightness(0.5);'
        : 'blur(' + d3.randomUniform(0, 20)()+ 'px'+ ') hue-rotate(0deg) contrast(1.2) saturate('+d3.randomUniform(1, 1.5)()+') brightness('+d3.randomUniform(0.2, 1.1)()+');'
    };

    @media (max-width:1590px) and (min-width: 1270px) {
      width: 140%;
    };

    @media (max-width: 1269px) {
      width: 180%;
    };
  }
`

export default class Video extends Component {
  constructor(props){
    super(props);
    this.state = {
      animation:false,
      videoLoop: false,
    }
  }

  removeVideo = _.once(() =>{
    d3.select('#video')
      .transition()
      .duration(1500)
      .style('opacity',0)
      .on('end',function(){
        d3.select(this).remove();
      })
    })

  componentDidMount(){
    window.setTimeout(() => this.setState({animation: true}) ,1000);
    window.setInterval(() => this.setState({videoLoop: !this.state.videoLoop}) ,1550);
  }


  render() {
    return(
    <div id="video" onClick={()=> this.removeVideo()}>
      <Section animation={this.state.animation} videoLoop={this.state.videoLoop}>
        <video autoPlay loop muted style={{backgroundVideo: 'url(assets/img/hero.jpg)'}}><source src="https://player.vimeo.com/external/278983563.hd.mp4?s=df2675a8395d48ad7b455f155ae148361121b298&profile_id=175" /></video>
        <Quote animation={this.state.animation}>"At sea, a frightening number of refugees and migrants are dying each year. On land, people fleeing war are finding their way blocked by closed borders. Closing borders does not solve the problem"</Quote>
        <Author>UN High Commissioner for Refugees Filippo Grandi</Author>
      </Section>
    </div>
    )
  }
}
