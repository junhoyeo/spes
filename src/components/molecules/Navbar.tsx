import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../atoms/Text';
import TextButton from '../atoms/TextButton';

type NavbarProps = {
  title: string;
  showBack?: boolean;
  hideMeta?: boolean;
};

const Navbar: React.FC<NavbarProps & RouteComponentProps> = ({
  title, history, showBack = false, hideMeta = false,
}) => {
  const onClickBack = () => history.goBack();
  const onClickRank = () => history.push('/rank');

  return (
    <Container>
      <Head>
        {!showBack ||
          <TextButton
            onClick={onClickBack}
          >
            뒤로가기
          </TextButton>
        }
        <Title>
          {title}
        </Title>
      </Head>
      {hideMeta ||
        <Meta>
          <Label onClick={onClickRank}>
            <i className="fas fa-crown" />
            <Text>1등</Text>
          </Label>
          <Label>
            <i className="fas fa-coins" />
            <Text>1,500p</Text>
          </Label>
        </Meta>
      }
    </Container>
  );
};

export default withRouter(Navbar);

const Container = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled(Text)`
  font-size: 2.1rem;
  word-break: keep-all;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  color: #29344a;
  border-radius: 32px;
  padding: 0rem 0.65rem;
  background-color: white;
  box-shadow: rgba(163, 177, 198, 0.6) 3px 3px 9px;
  margin-bottom: 0.5rem;

  i {
    font-size: 15px;
    margin-right: 0.8rem;
  }

  span {
    font-size: 18px;
    font-weight: 700;
  }

  &:first-child {
    cursor: pointer;
    background-color: #ffe066;
    box-shadow: rgba(255, 224, 102, 0.6) 3px 3px 9px;

    i, span {
      text-shadow: rgba(230, 119, 0, 0.6) 3px 3px 9px;
    }
  }
`;
