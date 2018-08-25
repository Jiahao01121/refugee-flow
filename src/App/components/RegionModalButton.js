import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import RegionModalCreator from './RegionModalCreator';

import RegionModalNav from './RegionModalNav';
import RegionModalContent from './RegionModalContent';

const SwitchCountryButton = styled.button`
  cursor: pointer;
  color: white;
  font-family: 'Ubuntu';
  font-size: 15px;
  font-weight: 700;
  background: #3f415845;
  position: absolute;
  top: 110px;
  padding: 8px 20px 9px 50px;
  border-radius: 3px;
  border: 1px solid;
  border-color: #3f41581c;
  transition: background 400ms, border-color 1000ms;
  &:hover{
    background: #3f415894;
    border-color: #555875cf;
  }
  &:before{
    background-image: url(./assets/location_icon.png);
    background-size: 50%;
    background-repeat: no-repeat;
    width: 26px;
    height: 25px;
    content: "";
    bottom: 0px;
    right: 127px;
    position: absolute;
  }
`
const CurrentCountryTag = styled.div`
  background: #3f415891;
  position: absolute;
  top: 110px;
  color: white;
  left: 187px;
  padding: ${props => props.currentCountry !='GLOBAL'?'5px 15px 5px 25px':'5px 15px 5px 15px' };
  border-radius: 4px;
  border: 1px solid #060610b5;
  font-family: 'Roboto';
  font-size: 10px;
  font-weight: 400;
  cursor: ${props => props.currentCountry !='GLOBAL'?'pointer':'default' };
  transition: all 400ms;

  ${props => props.currentCountry !='GLOBAL'&&css`
    background: #3f4158;
    border-color: #8387b185;
  `};

  &:before{
    ${props =>
      props.currentCountry && css`
        content: ${props.currentCountry !='GLOBAL'?"'x'":null};
    `}
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    left: 10px;
    top: 2px;
    }
  &:hover{
    ${props => props.currentCountry !='GLOBAL'&&css`
      background: #2b2c3c;
      border-color: #2e9493cc;
    `};
  }
`
const RegionTitle = styled.p`
  font-family: 'Roboto';
  font-size: 25px;
  color: white;
  font-weight: 300;
  z-index: 111111;
  position: absolute;
  left: 30px;

  &::after{
    content: 'Select a region to view regional conflict data. Click on a year to view conflict data for a selected country by year';
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    width: 650px;
    top: 42px;
    left: 0;
  }
`
const ModalInnerContainer = styled.div`
  width: 100%;
`

class RegionModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      visualizeSectionData: []
    };
    this.data = this.props.data;
    this.passCountryToRegion = this.passCountryToRegion.bind(this);
    this.passhandler = this.props.countryChangeHandler;
    this.currentCountry = this.props.currentCountry;
    this.removeCountryHandler = this.props.removeCountryHandler;
  }

  componentWillReceiveProps(nextProps){
    this.data = nextProps.data;
    this.currentCountry = nextProps.currentCountry;
  }

  handleToggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  passCountryToRegion(data,currentSelection){
    this.setState({
      visualizeSectionData: data[currentSelection]
    })
  }
  render() {


    const { showModal, data } = this.state;


    return (
      <div>
        <SwitchCountryButton
          type="button"
          onClick={this.handleToggleModal}>
          Select Region
        </SwitchCountryButton>
        <CurrentCountryTag currentCountry={this.currentCountry} onClick={this.removeCountryHandler} > {this.currentCountry} </CurrentCountryTag>

        <RegionModalCreator showModal={showModal} onCloseRequest={this.handleToggleModal}>
          <ModalInnerContainer>
            <RegionTitle>Explore Regional Conflicts</RegionTitle>
            <RegionModalNav data={this.data} pass = {this.passCountryToRegion}/>
          </ModalInnerContainer>
          {(() => {
            if(this.state.visualizeSectionData.length>0)
              return <RegionModalContent
              data={this.state.visualizeSectionData}
              clickHandler = {this.passhandler}
              closeModal = {this.handleToggleModal}/>
            })()}
        </RegionModalCreator>
      </div>
    );
  }
}

RegionModalButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default RegionModalButton
