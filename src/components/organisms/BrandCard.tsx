import * as React from 'react';
import styled, { css } from 'styled-components';

import logo from '../../assets/logo.svg';

import { Text } from '../atoms/Text';

type BrandCardProps = {
  title: React.ReactNode;
  src?: string;
};

const BrandCard: React.FC<BrandCardProps> = ({
  title,
  src = '',
}) => (
  <BrandWrap>
    <LogoImage
      src={src}
    >
      <Image
        src={logo}
      />
    </LogoImage>
    {title}
  </BrandWrap>
);

export default BrandCard;

const BrandWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type ImageProps = {
  src: string;
};

const LogoImage = styled.div<ImageProps>`
  width: 128px;
  height: 128px;
  border-radius: 5rem;
  border: 5px solid rgb(232, 238, 247);
  box-shadow:
    rgba(163, 177, 198, 0.7) 3px 3px 3px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 4px inset,
    rgba(163, 177, 198, 0.6) 9px 9px 16px;
  margin-bottom: 1.5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ src = '' }) => src && css`
    background-image: url(${src});
    background-size: cover;

    img {
      display: none;
    }
  `}
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
  margin-top: 3.5px;
  margin-left: 3.5px;
`;
