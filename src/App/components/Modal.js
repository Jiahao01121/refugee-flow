import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import ModalCreator from 'react-modal';
import GlobalModal from '../stylesheets/GlobalModal.css'

class Modal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{'z-index': '100'}}>
        <ModalCreator
          isOpen={this.props.showModal}
          onRequestClose={this.props.onCloseRequest}
          className="GlobeModal"
          overlayClassName="Overlay"
        >
          <div className="CloseButtonPostioning">
            <span
              onClick={this.props.onCloseRequest}
              className="CloseButton">
              &times;
            </span>
          </div>
          {this.props.children}
        </ModalCreator>
      </div>
    );

  }
}

export default Modal;
