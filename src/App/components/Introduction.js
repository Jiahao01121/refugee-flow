import React from 'react';
import styled, { css }from 'styled-components';
import $ from "jquery";
import * as _ from 'underscore';
import * as d3 from 'd3';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  z-index: 20;
  ${'' /* display: none; */}
  transition: all 5000ms;
  opacity: 0;
  overflow-y: scroll;
`

class Introduction extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Wrapper className='introduction-wrapper'>
        <section className="explain-project">
          <p className="quote">To leave one’s home country, community and loved ones to become a stranger in a strange land
is a difficult prospect even in times of peace. As violence, persecution and terror surge like the
rains of a monsoon the only option for survival and security is to become the stranger.</p>
<p className='quote'>The United Nations High Commissioner for Refugees reports that as of 2017, 65.6 million
people were forcibly displaced worldwide due to persecution, conflict, violence and human
rights violations.</p>
<p className='quote'>To become a refugee is to subject a person to the most pervasive form of cruelty by removing
their basic need to lead a normal life. All aspects that make human life tolerable and meaningful
are lost to the refugee. Refugees are places in inhospitable host countries that do not want them.
They face the brute indifference of the walls that people build between nations and cultures. Yet
each refugee surrenders to the hardship of leaving their old lives and the lives they could have
lived to find peace and safety elsewhere.</p>
<p className='quote'>Every refugee is an example of a world that failed to use its common strength for the common
good.</p>
        </section>

        <section className="hero">
          <div className="background-image" styles="background-image: url(assets/img/hero.jpg);"></div>
          <a href="/conflict" className="btn">Launch Visualization</a>
        </section>
      </Wrapper>
    )
  }
}

export default Introduction
