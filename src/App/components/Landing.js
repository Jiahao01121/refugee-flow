import React, { Component } from 'react'
import styled from 'styled-components';
import '../stylesheets/Landing.css';
import { ParallaxProvider, ParallaxBanner, Parallax } from 'react-scroll-parallax';
import '../stylesheets/styles.scss';

export default class Landing extends Component {

  render() {
    return(
      <div style={{overflowY: 'scroll'}}>
        <section className="hero">
          <video className="background-video" autoPlay loop muted style={{backgroundVideo: 'url(assets/img/hero.jpg)'}}>
            <source src="http://www.markhillard.com/sandbox/media/polina.mp4" />
          </video>
          <h1 className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</h1>
          <h3 className="author">— Patrick Farrell</h3>
        </section>
        <section className="explain-project">
          <h3 className="title">What others say:</h3>
          <p className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <p className="author">— Patrick Farrell</p>
          <p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <p className="author">— George Smith</p>
          <p className="quote">Donec commodo dolor augue, vitae faucibus tortor tincidunt in. Aliquam vitae leo quis mi pulvinar ornare. Integer eu iaculis metus.</p>
          <p className="author">— Kevin Blake</p>
        </section>
        <section className="explain-project">
          <h3 className="title">What others say:</h3>
          <p className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <p className="author">— Patrick Farrell</p>
          <p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <p className="author">— George Smith</p>
          <p className="quote">Donec commodo dolor augue, vitae faucibus tortor tincidunt in. Aliquam vitae leo quis mi pulvinar ornare. Integer eu iaculis metus.</p>
          <p className="author">— Kevin Blake</p>
        </section>
        <section className="hero">
          <div className="background-image" style={{backgroundImage: 'url(assets/img/hero.jpg)'}} />
          <a href="http://tutorialzine.com/2016/06/freebie-landing-page-template-with-flexbox/" className="btn">Launch Visualization</a>
        </section>
      </div>
    )
  }
}
