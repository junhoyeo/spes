import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../atoms/Icon';
import Navbar from '../atoms/Navbar';
import PageTitle from '../molecules/PageTitle';

interface IHeader extends RouteComponentProps {
  title: string;
  className?: string;
  onlyText?: boolean;
}

const Header = ({ history, title, className='', onlyText=false }: IHeader) => {
  const onClickBack = () => history.goBack();

  return (
    <LeftAlignedNavbar className={className}>
      {!onlyText ?
        <ArrowIcon
          onClick={onClickBack}
        >
          <i className="fas fa-arrow-left" />
        </ArrowIcon>
        : (null)
      }
      <PageTitle>
        {title}
      </PageTitle>
    </LeftAlignedNavbar>
  );
};

export default withRouter(Header);

const LeftAlignedNavbar = styled(Navbar)`
  justify-content: flex-start;
`;

const ArrowIcon = styled(Icon)`
  font-size: 2rem;

  i {
    text-shadow: 2px 2px 20px #A3B1C6;
  }
`;
