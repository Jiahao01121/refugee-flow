import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Modal from './Modal';
import RegionNav from './RegionNav';
import Region from './Region';

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
    right: 58px;
    position: absolute;
  }
`

class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleToggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <SwitchCountryButton
          type="button"
          onClick={this.handleToggleModal}>
          GLOBAL
        </SwitchCountryButton>

          <Modal showModal={this.state.showModal} onCloseRequest={this.handleToggleModal}>
            <RegionNav />
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
