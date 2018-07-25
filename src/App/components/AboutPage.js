import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import $ from "jquery";
import * as d3 from 'd3';

const Video = styled.video.attrs({
  opacity: props => props.animate ?0:.05,
  filter: 'blur(' + Math.abs(d3.randomNormal(0,10)()) + 'px'+ ') hue-rotate(0deg) contrast(1.2) saturate('+d3.randomUniform(1, 2.5)()+') brightness('+d3.randomUniform(0.4, 1.2)()+');'
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    transition: opacity 5500ms, filter 1550ms;
    opacity: ${props => props.opacity};
    filter: ${props => props.filter};

    @media (max-width:1590px) and (min-width: 1270px) {
      width: 140%;
    };

    @media (max-width: 1269px) {
      width: 180%;
    };

    @media (min-width:1590px){
      width: 125%;
    };

    @media (max-width:890px){
      width: 250%;
    };

    @media (max-width:650px){
      width: 500%;
    };
`
const Wrapper = styled.div`
  background: #111117f7;
  height: 100vh;
  position: absolute;
  margin: 0;
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar{width: 6px};
  &::-webkit-scrollbar-thumb {
    background-color: #91eae3;
    -webkit-border-radius: 16px;
  }
  transition: all 400ms;
  opacity: ${props => props.animate ? 1 : 0};

  & ::selection {
    text-shadow: 0 0 0.8rem #9DD4FF;
    background: #13b0f330;
    color: #0af5dd;
    }
`
const Mission = styled.div`
  width: 100%;
  position: relative;
  margin-left: 90px;
  &::after{
    content: '';
    width: calc(100% - 140px);
    height: 2px;
    background: #8dd8d6;
    position: absolute;
    top: 35px;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`
const Vision = styled.div`
  width: 100%;
  position: relative;
  margin-left: 90px;
  &::after{
    content: '';
    width: calc(100% - 140px);
    height: 2px;
    background: #8dd8d6;
    position: absolute;
    top: 35px;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`
const Bio = styled.div`
  width: 100%;
  position: relative;
  float: left;
  margin-left: 90px;
  &::after{
    content: '';
    width: calc(100% - 140px);
    height: 2px;
    background: #8dd8d6;
    position: absolute;
    top: 69px;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`
const QNA = styled.div`
  width: 100%;
  position: relative;
  float: left;
  margin-left: 90px;
  &::after{
    content: '';
    width: calc(100% - 140px);
    height: 2px;
    background: #8dd8d6;
    position: absolute;
    top: 69px;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`
const DataSources = styled.div`
  width: 100%;
  position: relative;
  float: left;
  margin-left: 90px;
  &::after{
    content: '';
    width: calc(100% - 140px);
    height: 2px;
    background: #8dd8d6;
    position: absolute;
    top: 69px;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`
const Title = styled.p`
  transition: font-size 800ms,margin-left cubic-bezier(0.48, 0.02, 0, 1.02) 1000ms, color 800ms, filter 500ms;
  color: #8BDEFF;
  font-family: 'Tajawal';
  margin-left: ${props => props.animate ? 0 :window.innerWidth+'px'}
  font-size: ${props => props.animate ? '35px' :'0px'};
  font-weight: 200;
  font-style: normal;
  letter-spacing: 2px;

  &:hover{
    color: #ceeefb;
    cursor: pointer;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`
const QNATitle  = styled.p`

  transition: opacity cubic-bezier(0.13, 0.01, 0.02, 0.92) 1500ms;
  color: white;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 400;
  width: calc(100% - 140px);
  line-height: 2;
  opacity: ${props => props.animate ? 1 :0};
  ${props => props.QNAOn && css`
    display:  none;
  `}
`
const Content = styled.p`
  transition: opacity cubic-bezier(0.13, 0.01, 0.02, 0.92) 1500ms;
  color: white;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 300;
  width: calc(100% - 140px);
  opacity: ${props => props.animate ? 1 :0};
  line-height: 2;

  &>em>a{
    transition: color 800ms;
    font-family: 'Tajawal';
    font-size: 24px;
    font-weight: 100;
    font-style: normal;
    text-decoration: underline;
    color: #9cddf7;
    letter-spacing: 1px;
    cursor: pointer;
    filter: drop-shadow(0px 2px 5px #a2a2c9);

    &:hover{
      color: #f2fbff;
    }
  }

  &>a{
    transition: color 800ms;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 100;
    font-style: normal;
    text-decoration: underline;
    color: #9cddf7;
    letter-spacing: 1px;
    cursor: pointer;
    filter: drop-shadow(0px 2px 5px #a2a2c9);

    &:hover{
      color: #f2fbff;
    }
  }

  ${props => props.missionOn && css`
    display:  none;
  `}
  ${props => props.visionOn && css`
    display:  none;
  `}
  ${props => props.bioOn && css`
    display:  none;
  `}
  ${props => props.QNAOn && css`
    display:  none;
  `}
  ${props => props.DataSourcesOn && css`
    display:  none;
  `}
`
const Toggle = styled.p`
  transition: all 600ms;
  font-family: 'Roboto';
  font-size: 35px;
  font-weight: 100;
  font-style: normal;
  color: white;
  position: absolute;
  top: ${props =>props.last ? '-8px' : '-42px'};
  left: ${() => window.innerWidth - 150 - 13+ 'px'};
  cursor: pointer;
  opacity: .8;
  &:hover{
    opacity: 1;
  }
  &::selection {
    text-shadow: none;
    background: none;
    color: none;
  }
`
const Footer = styled.div`
  height: 0;
  width: 100%;
  position: relative;
  float: left;
  background: blue;
  margin-top: 90px;
`
const Download = styled.div`
  width: 20px;
  position: relative;
  top: 20px;
  cursor: pointer;
  left: ${() => window.innerWidth - 150 - 39 + 'px'};
  &::after{
    content: 'Download Press Kit';
    position: absolute;
    font-family: 'Tajawal';
    top: 4px;
    font-size: 15px;
    font-weight: 200;
    text-decoration: underline;
    color: white;
    width: 130px;
  }
`

export default class AboutPage extends Component {
  state = {
    animate: false,
    missionOn: false,
    visionOn: true,
    bioOn: false,
    QNAOn: true,
    DataSourcesOn: true,
  }
  componentDidMount(){
    window.setTimeout(() => this.setState({animate: true}),300);
  }
    render(){
      return(
        <Wrapper animate={this.state.animate}>
          {/* <Video animation={this.state.animation} videoLoop={this.state.videoLoop} autoPlay muted loop style={{backgroundVideo: 'url(assets/img/hero.jpg)'}}><source src="https://player.vimeo.com/external/278983563.hd.mp4?s=df2675a8395d48ad7b455f155ae148361121b298&profile_id=175" /></Video> */}

          <Download onClick={() => window.open('https://drive.google.com/drive/folders/1hR2JjaMN8DzXA8VyixHJ5zAiolnpoTSF?usp=sharing')}><svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 199.5h-91.4V64H187.4v135.5H96l160 158.1 160-158.1zM96 402.8V448h320v-45.2H96z"/></svg></Download>

          <Mission>
            <Title onClick={() => this.setState({missionOn: !this.state.missionOn})} animate={this.state.animate}>MISSION</Title>
            <Toggle onClick={() => this.setState({missionOn: !this.state.missionOn})}>{this.state.missionOn? '+':'–'}</Toggle>
            <Content missionOn={this.state.missionOn} animate={this.state.animate}>Refugee Flow uses compelling visual design with comprehensive data to humanize the perilous transformation of the refugee.</Content>
          </Mission>

          <Vision>
            <Title onClick={() => this.setState({visionOn: !this.state.visionOn})} animate={this.state.animate}>VISION</Title>
            <Toggle onClick={() => this.setState({visionOn: !this.state.visionOn})}>{this.state.visionOn? '+':'–'}</Toggle>
            <Content visionOn={this.state.visionOn} animate={this.state.animate}>Refugee Flow's vision is for all people to live to their fullest potential without threat of violence and for all people to understand each person’s inherent dignity.</Content>
          </Vision>

          <Bio>
            <Title onClick={() => this.setState({bioOn: !this.state.bioOn})} animate={this.state.animate}>PROJECT TEAM</Title>
            <Toggle onClick={() => this.setState({bioOn: !this.state.bioOn})} last={true}>{this.state.bioOn? '+':'–'}</Toggle>
            <Content bioOn={this.state.bioOn} animate={this.state.animate}><em><a target="_blank" href='https://www.linkedin.com/in/will-su'>Will Su - Co-Creator</a></em> rides the line between design and technology. His work focuses on presenting data efficiently and beautifully with fluid interactivity. He has received awards from <a href="https://www.informationisbeautifulawards.com/showcase/2348-nyc-foodiverse">Information is Beautiful</a>, <a href="https://www.awwwards.com/sites/nyc-foodiverse">Awwwards</a> and placed first at the <a href="https://medium.com/@nycmedialab/prototyping-teams-win-12-000-in-prizes-at-mlbam-hackathon-organized-by-nyc-media-lab-d9fee4c7ccaf">MLB Advanced Media Hackathon</a>. He was featured at <a href="https://www.nypl.org/events/exhibitions/nyc-foodiverse">New York Public Library</a> and NYC Media Lab 2017 conf. He speaks regularly at <a href="https://www.meetup.com/UX-Support-Group/events/248956066/">Meetups</a> and <a href="https://dnnsociety.org/2018/01/01/from-graphic-designer-to-data-visualisation-specialist-a-sharing-from-will-su/">universities</a> about his learning path and perspective on data visualization.</Content>

            <Content bioOn={this.state.bioOn} animate={this.state.animate}><em><a target="_blank" href='https://www.linkedin.com/in/abins'>Abin Abraham - Co-Creator</a></em> is drawn to the intersection of technology, art, and policy. He is pursuing creative ways to understand the complex challenges facing the world today and believes that creativity is the key to effective policymaking. He works as a web developer at the United Nations Global Compact and has worked on <a href="https://www.unglobalcompact.org/interactive">UNGC Interactive</a> and the <a href="http://blueprint.unglobalcompact.org/">SDG Blueprint</a>.</Content>

            <Content bioOn={this.state.bioOn} animate={this.state.animate}><em><a target="_blank" href='https://www.linkedin.com/in/jasperlo/'>Jasper Lo - Copywriter</a></em> is a US Army veteran and writer based in NYC. His creative work focuses on diaspora, violence, and masculinity. Find his articles on <a href="https://www.globalcitizen.org/en/authors/jasper-lo/">Global Citizen</a>, a nonprofit with the mission of ending extreme poverty, and his poems in <a href="https://flapperhouse.com/2015/04/08/the-burning-moon-poetry-by-jasper-lo/">Flapperhouse</a> and <a href="https://morningsidepost.com/articles/2018/3/15/-munchies-master-ng2ea-esztk-787gk-pm5zb-dpdbn">The Morningside Post</a>. Jasper will graduate in 2019 from the dual Master’s Degree Program in International Affairs and Journalism at Columbia University.</Content>


            <Content bioOn={this.state.bioOn} animate={this.state.animate} style={{fontSize: '17px',fontWeight: '800',margin: 0}}><em>If you have any questions or feedback, please contact </em> <a href="mailto:refugeeflow@gmail.com" style={{fontSize: '17px',fontWeight: '200',margin: 0, 'marginLeft':'8px','fontStyle':'italic'}}>refugeeflow@gmail.com</a></Content>
          </Bio>

          <QNA>
            <Title onClick={() => this.setState({QNAOn: !this.state.QNAOn})} animate={this.state.animate}>Q & A</Title>
            <Toggle onClick={() => this.setState({QNAOn: !this.state.QNAOn})} last={true}>{this.state.QNAOn? '+':'–'}</Toggle>

            <QNATitle animate={this.state.animate} QNAOn={this.state.QNAOn}>What is Refugee Flow?</QNATitle>
            <Content QNAOn={this.state.QNAOn} animate={this.state.animate}>Is an exploratory investigation of the migration crisis. Combining multiple datasets and interactive visualizations, the project aims to allow users to create a better understanding of the current crisis.</Content>

            <QNATitle animate={this.state.animate} QNAOn={this.state.QNAOn}>How can design and technology help find solutions in migration?</QNATitle>
            <Content QNAOn={this.state.QNAOn} animate={this.state.animate}>Building solutions for the migration crisis requires political will, which must be driven by society. We are continually presented with facts and figures of the lingering refugee crisis but are unmoved. Our idea is to present this data in new, interesting, and visually appealing ways. Facts inform us, but they don’t push us to act. Emotion gets people to act. Refugee Flow aims to merge design and technology to help better understand the migration crisis in a way that resonates with users. We hope this inspires better solutions.</Content>

            <QNATitle animate={this.state.animate} QNAOn={this.state.QNAOn}>What makes your team unique for this project?</QNATitle>
            <Content QNAOn={this.state.QNAOn} animate={this.state.animate}>Will brings the creative mind of a designer with new interpretations of existing information. He has the development chops to turn creative concepts into a working application. Abin brings his web development background along with a nuanced understanding of the UN system. This awareness allows him to see what change is needed. Together, they provide a unique set of creative design capabilities.</Content>

            <QNATitle animate={this.state.animate} QNAOn={this.state.QNAOn}>What does Refugee Flow do differently than existing datasets?</QNATitle>
            <Content QNAOn={this.state.QNAOn} animate={this.state.animate}>Refugee Flow has collected multiple datasets together to create an exploratory look at the crisis in a way that has never been done before. No other project is as dynamic or interactive as the one we built. Previous dashboards or portals show static data but Refugee Flow allows users to explore and discover facts on their own. Instead of only showing general trends over time, Refugee Flow allows users to dive in deeper and move beyond trends by seeing information on a case by case basis.</Content>

            <QNATitle animate={this.state.animate} QNAOn={this.state.QNAOn}>Who can use Refugee Flow and how?</QNATitle>
            <Content QNAOn={this.state.QNAOn} animate={this.state.animate}>Anyone can use Refugee Flow. We built it as an exploratory tool to bring greater understanding to the crisis. This tool is for the person who has heard about the crisis, but wants to learn more. A policy expert can use the tool for authoritative data to gain comprehensive insights on regions of interest.</Content>

            <QNATitle animate={this.state.animate} QNAOn={this.state.QNAOn}>Why is Refugee Flow important?</QNATitle>
            <Content QNAOn={this.state.QNAOn} animate={this.state.animate}>Currently, UNHCR reports that 68.5 million people are forcibly displaced around the world. Funding to tackle the current challenge is decreasing, not increasing. By 2050 the continued impact of climate change will forcibly displace 1 billion people. The crisis is getting worse, not better. We must gain a greater understanding and we need to figure out better solutions to this crisis. Refugee Flow is a call to this action.</Content>
          </QNA>

          <DataSources>
            <Title onClick={() => this.setState({DataSourcesOn: !this.state.DataSourcesOn})} animate={this.state.animate}>Data Sources</Title>
            <Toggle last={true} onClick={() => this.setState({DataSourcesOn: !this.state.DataSourcesOn})}>{this.state.DataSourcesOn? '+':'–'}</Toggle>

            <Content DataSourcesOn={this.state.DataSourcesOn} animate={this.state.animate}>•	<em><a target="_blank" href='http://popstats.unhcr.org/en/asylum_seekers_monthly'>UNHCR Population Statistics Database</a></em> currently contains data about UNHCR's populations of concern from the year 1951 up to 2014 and you can use it to investigate different aspects of these populations: their general composition by location of residence or origin, their status (refugees, asylum seekers, internally displaced persons, etc.), their evolution over time, and so on.</Content>

            <Content DataSourcesOn={this.state.DataSourcesOn} animate={this.state.animate}>•	<em><a target="_blank" href='https://missingmigrants.iom.int/downloads'>Missing Migrants Project</a></em> tracks deaths of migrants, including refugees and asylum-seekers, who have died or gone missing in the process of migration towards an international destination.</Content>

            <Content DataSourcesOn={this.state.DataSourcesOn} animate={this.state.animate}>•	<em><a target="_blank" href='http://www.themigrantsfiles.com/'>The Migrants Files</a></em> is a consortium of journalists from over 10 EU countries. It is coordinated by Journalism++.</Content>

            <Content DataSourcesOn={this.state.DataSourcesOn} animate={this.state.animate}>•	<em><a target="_blank" href='https://frontex.europa.eu/along-eu-borders/migratory-map/'>Frontex</a></em>, the European Border and Coast Guard Agency, promotes, coordinates and develops European border management in line with the EU fundamental rights charter and the concept of Integrated Border Management. To help identify migratory patterns as well as trends in cross-border criminal activities, Frontex analyses data related to the situation at and beyond EU’s external borders.</Content>

            <Content DataSourcesOn={this.state.DataSourcesOn} animate={this.state.animate}>•	<em><a target="_blank" href='https://www.acleddata.com/data/'>ACLED</a></em> (Armed Conflict Location & Event Data) is a disaggregated conflict analysis and crisis mapping project. ACLED is the highest quality, most widely used, realtime data and analysis source on political violence and protest in the developing world. Practitioners, researchers and governments depend on ACLED for the latest reliable information on current conflict and disorder patterns.</Content>

          </DataSources>

          <Footer></Footer>

        </Wrapper>
      )
    }
}
