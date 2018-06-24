import React, { Component } from 'react'
import styled from 'styled-components';
import '../stylesheets/Landing.css';
import '../stylesheets/styles.scss';

const Quote = styled.p`
text-align: center;
position: absolute;
top: 35%;
font-family: 'Roboto';
left: 50%;
transform: translate(-50%, -50%);
width: 60%;
font-size: 45px;
font-weight: 300;
line-height: 1.5;
margin-bottom: 20px;
padding: 0;
`

const Author = styled.p `
  position: absolute;
  font-family: 'Roboto';
  top: 65%
  left: 35%
  font-size: 18px;
`

export default class Video extends Component {

  render() {
    return(
      <div id="video">
        <section className="video-container">
          <video className="background-video" autoPlay loop muted style={{backgroundVideo: 'url(assets/img/hero.jpg)'}}>
          <source src="http://www.markhillard.com/sandbox/media/polina.mp4" />
        </video>
        <Quote>"At sea, a frightening number of refugees and migrants are dying each year. On land, people fleeing war are finding their way blocked by closed borders. Closing borders does not solve the problem"</Quote>
        <Author>— UN High Commissioner for Refugees Filippo Grandi</Author>
      </section>
    </div>
    )
  }
}
