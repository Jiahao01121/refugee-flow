import React from 'react';
import styled from 'styled-components';

import DownloadIcon from './icon_download.svg';

const Wrapper = styled.div`
  width: 20px;
  position: relative;
  top: 20px;
  cursor: pointer;
  left: ${() => `${window.innerWidth - 150 - 39}px`};
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
`;

const MEDIA_KIT_LINK = 'https://drive.google.com/drive/folders/1hR2JjaMN8DzXA8VyixHJ5zAiolnpoTSF?usp=sharing';

const DownloadLink = () => (
  <Wrapper onClick={() => window.open(MEDIA_KIT_LINK, '_blank')}>
    <DownloadIcon />
  </Wrapper>
);

export default DownloadLink;
