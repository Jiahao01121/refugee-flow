import React from 'react';
import styled, { css }from 'styled-components';
import $ from "jquery";
import * as _ from 'underscore';
import * as d3 from 'd3';
import '../stylesheets/Introduction.css'

const Wrapper = styled.div`
width: 100%;
height: 100%;
position: absolute;
background-color: #000;
z-index: 20;
${'' /* display: none; */}
transition: all 5000ms;
opacity: 0;
overflow-y: scroll;
`

const ProjectIntroduction = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h3`
  color: #414a4f;
  text-transform: capitalize;
  font: bold 32px 'Open Sans', sans-serif;
  margin-bottom: 35px;
  text-align: center;
`

const IntroParagraph = styled.p`
  max-width: 800px;
  text-align: center;
  padding: 0 20px;
  line-height: 2;
  color: #555;
  font: normal 16px sans-serif;
`

const ProjectExplanation = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const TextTopLeftCorner = styled.div`
  color: #414a4f;
  max-width: 550px;
  top: 60px;
  align-self: flex-start;
  position: absolute;
  line-height: 25px;
`
const CornerImage = styled.div`
  background-image: url(./assets/globe/world.jpg);
  align-self: flex-end;
  right: 0;
  bottom: 0;
  position: absolute;
  height: 70%;
  width: 50%;
`

class Introduction extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const projectExplanation = document.getElementById("projectExplanation");
    const introductionWrapper = document.getElementById("introductionWrapper");
    introductionWrapper.scrollTo({
      top: projectExplanation.offsetHeight,
      behavior: 'smooth'
    })
  }

  render(){
    return (
      <Wrapper className='introduction-wrapper' id="introductionWrapper">
        <ProjectIntroduction id="projectIntroduction" className="demo">
          <Title>Refugee Flow</Title>
          <IntroParagraph>To leave one’s home country, community and loved ones to become a stranger in a strange land
            is a difficult prospect even in times of peace. As violence, persecution and terror surge like the
            rains of a monsoon the only option for survival and security is to become the stranger.</IntroParagraph>
            <IntroParagraph>The United Nations High Commissioner for Refugees reports that as of 2017, 65.6 million
              people were forcibly displaced worldwide due to persecution, conflict, violence and human
              rights violations.</IntroParagraph>
            <IntroParagraph>To become a refugee is to subject a person to the most pervasive form of cruelty by removing
                their basic need to lead a normal life. All aspects that make human life tolerable and meaningful
                are lost to the refugee. Refugees are placed in inhospitable host countries that do not want them.
                They face the brute indifference of the walls that people build between nations and cultures. Yet
                each refugee surrenders to the hardship of leaving their old lives and the lives they could have
                lived to find peace and safety elsewhere.</IntroParagraph>
            <IntroParagraph>Every refugee is an example of a world that failed to use its common strength for the common good.</IntroParagraph>
            <a onClick={this.handleClick}><span></span>Scroll</a>
        </ProjectIntroduction>
        <ProjectExplanation id="projectExplanation">
          <TextTopLeftCorner>
            <p>Refugee Flow gathers data from multiple reliable sources to construct a compelling account
               on how persons become refugees.The project examines one of the direct fundamental causes
               of the global refugee crisis, the collapse of order and stability in todays international
               landscape.
             </p>
             <p>This visualization examines the impact conflict, persecution and violence has on the lives of
               persons in their home countries and communities.The dataset delves into exploring what drives
               people to flee their homes and bear the burden of a life as a refugee.
             </p>
             <p>
               The project further explores the possible routes taken by refugees.The dataset examines the
               dangers those forcibly displaced face in their search for safety. Many refugees who depart
               on their journey never make it to their intended destination.The data collected presents the
               cause of these deaths along their chosen routes.
             </p>
             <a href="/conflict" className="btn">Launch Visualization</a>
          </TextTopLeftCorner>
          <CornerImage id="launch">
          </CornerImage>
        </ProjectExplanation>
      </Wrapper>
          )
        }
      }

      export default Introduction
