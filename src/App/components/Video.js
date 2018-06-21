import React, { Component } from 'react'
import styled from 'styled-components';
import '../stylesheets/Landing.css';
import '../stylesheets/styles.scss';

export default class Video extends Component {

  render() {
    return(
      <div id="video">
        <section className="hero">
          <video className="background-video" autoPlay loop muted style={{backgroundVideo: 'url(assets/img/hero.jpg)'}}>
            <source src="http://www.markhillard.com/sandbox/media/polina.mp4" />
          </video>
          <h1 className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</h1>
          <h3 className="author">— Patrick Farrell</h3>
        </section>
      </div>
    )
  }
}
