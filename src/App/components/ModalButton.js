import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Button = styled.div`
  padding: 0.7rem, 1.8rem;
  background-color: #568db2;
  border: 0;
  border-radius: 0.3rem;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  margin-bottom: 0.8rem;
`;

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
      <Button>
        <button
          type="button"
          onClick={() => this.handleToggleModal()}
        >
          Open Countries
        </button>
        {showModal &&
          <Modal onCloseRequest={() => this.handleToggleModal()}>
            <img src="https://placeimg.com/900/650/nature" alt="Nature" />
          </Modal>
        }
      </Button>
    );
  }
}

export default ModalButton;
