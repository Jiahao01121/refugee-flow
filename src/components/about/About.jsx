import React from 'react';
import styled from 'styled-components';

import DownloadLink from './downloadLink/DownloadLink';
import Accordion from './accordion/Accordion';
import Paragraph from './paragraph/Paragraph';

import { accordions, accordionsDefaultVisibility } from './config/accordionsConfig';

const Wrapper = styled.div`
  height: 100vh;
  overflow-x: scroll;
  &::-webkit-scrollbar { width: 6px };
  &::-webkit-scrollbar-thumb {
    background-color: #91eae3;
    -webkit-border-radius: 16px;
  }
  transition: all 400ms;
  opacity: ${props => (props.animate ? 1 : 0)};

  & ::selection {
    text-shadow: 0 0 0.8rem #9DD4FF;
    background: #13b0f330;
    color: #0af5dd;
  }
`;

const Footer = styled.div`
  margin-top: 100px;
`;

export default class About extends React.Component {
  state = {
    AccordionsVisibility: accordionsDefaultVisibility,
    animate: false,
  }

  componentDidMount() {
    window.setTimeout(() => this.setState({ animate: true }), 300);
  }

  render() {
    const { animate, AccordionsVisibility } = this.state;
    return (
      <Wrapper animate={animate}>
        <DownloadLink />

        {accordions.map(({ name, contents }) => (
          <Accordion
            key={name}
            isClosed={AccordionsVisibility[name].isClosed}
            onToggle={() => this.setState({
              AccordionsVisibility: {
                ...AccordionsVisibility,
                [name]: { isClosed: !AccordionsVisibility[name].isClosed },
              },
            })}
            animate={animate}
            title={name}
          >
            {contents.map((content, i) => (
              <Paragraph
                key={i}
                animate={animate}
                isClosed={AccordionsVisibility[name].isClosed}
                {...content}
              />
            ))}
          </Accordion>
        ))}

        <Footer />
      </Wrapper>
    );
  }
}
