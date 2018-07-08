import React, { Component } from 'react'
import styled from 'styled-components';
import '../stylesheets/Landing.css';
import Video from './Video';
import Introduction from './Introduction';
import * as _ from 'underscore';
import * as d3 from 'd3';

export default class Landing extends Component {

  constructor(props){
    super(props);
  }

    evokePrompt = _.once(() => {
      _.delay(() => {
        d3.select('.introduction-wrapper').style('display','block').style('opacity','1');
        setTimeout( () => {
          let video = document.getElementById("video")
          if(video != null) {
            video.remove();
          }
        }, 6000)
      }, 5000 )
    })

  render() {
    return(
      <div>
        { (() => this.evokePrompt() )()}
        <Introduction />
        <Video />
      </div>
    )
  }
}
