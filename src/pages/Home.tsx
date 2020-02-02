import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/atoms/Navbar';
import Page from '../components/atoms/Page';
import Text from '../components/atoms/Text';
import PointIcon from '../components/molecules/PointIcon';
import CrownIcon from '../components/molecules/CrownIcon';
import Footer from '../components/organisms/Footer';
import RoomCard from '../components/organisms/RoomCard';
import CreateCard from '../components/organisms/CreateCard';
import PageTitle from '../components/molecules/PageTitle';

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const onClickCrown = () => history.push('/rank');
  const onClickHash = (hash: string): string => window.location.hash = `#${hash}`;

  return (
    <LoginPage>
      <SpacedNavbar>
        <PageTitle>
          로비
        </PageTitle>
        <Icons>
          <PointIcon>
            1,500p
          </PointIcon>
          <CrownIcon
            onClick={onClickCrown}
          >
            <i className="fas fa-crown" />
          </CrownIcon>
        </Icons>
      </SpacedNavbar>
      <Content>
        <Section>
          <Title
            id="created"
            onClick={() => onClickHash('created')}
          >
            <i className="fas fa-paperclip" />
            내 목표방
          </Title>
          <Cards>
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <CreateCard />
          </Cards>
        </Section>
      </Content>
      <Footer />
    </LoginPage>
  );
};

export default withRouter(Home);

const LoginPage = styled(Page)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const SpacedNavbar = styled(Navbar)`
  justify-content: space-between;
`;

const Icons = styled.div`
  display: flex;
`;

const Content = styled.main`
  width: 83%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 5rem;
  }
`;

const Title = styled(Text)`
  color: rgba(27, 41, 68, 0.5);
  font-weight: 900;
  font-size: 2rem;
  margin-bottom: 1rem;

  i.fa-paperclip {
    margin-right: 0.8rem;
    transition: color 0.3s ease-in-out;
  }

  &:hover {

    i.fa-paperclip {
      color: #1B2944;
    }
  }
`;

const Cards = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(auto-fill,minmax(252px, 1fr));
`;
