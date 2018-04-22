import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const GlobeControllerButton = styled.button`
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 15px;
  color: #ffffff66;
  left: 30px;
  position: absolute;
  background: none;
  border: none;
  top: 160px;
  margin: 0px;

  &:before{
    background-image: url(./globe_icon.png);
    background-size: 50%;
    width: 60px;
    height: 40px;
    background-repeat: no-repeat;
    display: inline-block;
    content: "";
    bottom: -16px;
    right: 12px;
    position: absolute;
    margin-right: 10px;
  }
`


class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { showModal } = this.state;

    return (
      <GlobeControllerButton
        type="button"
        onClick={() => this.handleToggleModal()}
        >MAP
        {showModal && 
          <Modal onCloseRequest={() => this.handleToggleModal()}>
            <img src="https://placeimg.com/900/650/nature" alt="Nature" />
          </Modal>
        }
      </GlobeControllerButton>

    );
  }
}

export default ModalButton