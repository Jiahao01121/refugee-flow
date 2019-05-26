import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import ModalCreator from 'react-modal';
import GlobalModal from '../stylesheets/GlobeModal.css'

class RegionModalCreator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ModalCreator
          isOpen={this.props.showModal}
          onRequestClose={this.props.onCloseRequest}
          className="GlobeModal"
          overlayClassName="Overlay"
          ariaHideApp={false}
          closeTimeoutMS={200}
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
    );

  }
}

export default RegionModalCreator;
