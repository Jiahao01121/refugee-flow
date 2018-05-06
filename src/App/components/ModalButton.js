import React, { Component } from 'react';
import styled from 'styled-components';
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
      showModal: false
    };
    this.data = this.props.data;
  }

  componentWillReceiveProps(nextProps){
    this.data = nextProps.data;
  }

  handleToggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    if(this.data.length>0){
      console.log(this.data);
    }
    const { showModal, data } = this.state;

    return (
      <div>
        <SwitchCountryButton
          type="button"
          onClick={this.handleToggleModal}>
          Select Region
        </SwitchCountryButton>

        <Modal showModal={showModal} onCloseRequest={this.handleToggleModal}>
        <div className='container'>
          <RegionTitle>Select a country</RegionTitle>
          <RegionNav data={data} />
        </div>
          <Region />
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
