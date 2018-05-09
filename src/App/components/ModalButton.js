import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Modal from './Modal';
import RegionNav from './RegionNav';
import Region from './Region';
import RegionNavBar from '../stylesheets/RegionNavBar.css'

const SwitchCountryButton = styled.button`
  cursor: pointer;
  text-decoration: underline;
  color: white;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 500;
  background: none;
  border: none;
  position: absolute;
  top: 110px;
  left: 20px;

  &:after{
    content: '>';
    font-weight: 900;
    color: white;
    font-size: 15px;
    position: absolute;
    right: -8px;
  }

  &:before{
    background-image: url(./location_icon.png);
    background-size: 50%;
    background-repeat: no-repeat;
    display: inline-block;
    width: 33px;
    height: 27px;
    content: "";
    bottom: 0px;
    right: 98px;
    position: absolute;
  }
`
const CurrentCountryTag = styled.div`
  background: #3f415891;
  position: absolute;
  top: 109px;
  color: white;
  left: 150px;
  padding: ${props => props.currentCountry !='GLOBAL'?'5px 15px 5px 25px':'5px 15px 5px 15px' };
  border-radius: 100px;
  font-family: 'Roboto';
  font-size: 10px;
  font-weight: 400;
  cursor: ${props => props.currentCountry !='GLOBAL'?'pointer':'default' };
  transition: all 400ms;
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
      background: #3f4158;
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
  top: 20px;
  left: 30px;

  &::after{
    content: 'select regions & filter downbelow: CLick jump to country';
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    width: 300px;
    top: 42px;
    left: 0;
  }
`

class ModalButton extends Component {
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

        <Modal showModal={showModal} onCloseRequest={this.handleToggleModal}>
          <div className='container'>
            <RegionTitle>Select a country</RegionTitle>
            <RegionNav data={this.data} pass = {this.passCountryToRegion}/>
          </div>
          {(() => {if(this.state.visualizeSectionData.length>0){return <Region
            data={this.state.visualizeSectionData}
            clickHandler = {this.passhandler}
            closeModal = {this.handleToggleModal}
          />}})()}
        </Modal>
      </div>
    );
  }
}

ModalButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ModalButton
