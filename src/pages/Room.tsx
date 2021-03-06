import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import styled from 'styled-components';
import { Page } from '../components/atoms/Page';
import { Text } from '../components/atoms/Text';
import HashTitle from '../components/molecules/HashTitle';
import Footer from '../components/organisms/Footer';
import PostCard from '../components/organisms/PostCard';
import Navbar from '../components/molecules/Navbar';
import Button from '../components/atoms/Button';
import Input from '../components/molecules/Input';
import { IPost } from '../models/post';

import axios from 'axios';
import { toast } from 'react-toastify';
import { uploadImage } from '../utils/uploadImage';

const examplePosts: IPost[] = [
  {
    image: 'https://trendy-resume.now.sh/static/products/wand.png',
    _id: '111',
    author: {
      profile: 'https://github.com/junhoyeo.png',
      username: '여준호',
    },
    created: Date.now(),
    closed: false,
    agreed: true,
    agreedUsers: ['', '', '', '', ''],
    content: '진짜 코딩 했어요, 오늘도!',
  },
];

interface MatchParams {
  roomID: string;
}

const Room: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [rawImage, setRawImage] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string>('http://via.placeholder.com/150.png');
  const [posts, setPosts] = useState<IPost[]>(examplePosts);
  const [content, setContent] = useState<string>('');
  const [room, setRoom] = useState<any>({title:'', goal:'', posts:[], users:[]});
  const { roomID } = match.params;

  const getRoom = async () => {
    axios.defaults.baseURL = 'https://spes-psbxv.run.goorm.io/';
    const token = localStorage.getItem('token') as string;
    axios.defaults.headers.common['Authorization'] = token;

    try {
      const { data: roomData } = await axios.get(`/api/room/${roomID}`);
      const posts = await Promise.all(roomData.posts.map(async (post: any) => {
        const { data: author } = await axios.get(`/api/user/${post.author}`);
        return {
          ...post,
          author,
        };
      }));
      const final = {
        ...roomData,
        posts,
      };
      setRoom(final);
      console.log(roomData);
    } catch (error) {
      console.log(error);
      toast('목표방 조회에 실패했습니다.');
    }
  };

  useEffect(
    () => {
      getRoom();
    },
    [],
  );

  const onChangeImage = async (event: any) => {
    const raw = event.target.files[0];
    setRawImage(raw);
    setPreviewImage(URL.createObjectURL(raw));
  }

  const onClickCopy = () => {
    const element: any = document.getElementById('input-to-copy');
    element?.select();
    document.execCommand('copy');
    toast('클립보드에 공유 링크가 복사되었어요!');
  };

  const shareLink = `${window.location.origin}/link/${roomID}`;

  const onClickShareWithFacebook = () => {
    const shareTitle = 'Spes™으로 함께 새해 목표를 이뤄 보아요!';
    const shareURL = `https://www.facebook.com/sharer.php?u=${shareLink}&t=${shareTitle}`;
    window.open(shareURL, '', 'width=500,height=500,left=600');
  };

  const onClickCreatePost = async (event: any) => {
    event.preventDefault();
    axios.defaults.baseURL = 'https://spes-psbxv.run.goorm.io/';
    const token = localStorage.getItem('token') as string;
    axios.defaults.headers.common['Authorization'] = token;

    const filename = await uploadImage(rawImage);
    console.log(filename);
    const image = `http://spes-psbxv.run.goorm.io/api/image/${filename}`
    console.log(image);

    try {
      await axios.post(`/api/post/${roomID}`, {
        content,
        image,
      });
      toast('등록 성공!');
      await getRoom();
    } catch (error) {
      console.log(error);
      toast('포스트 등록에 실패했습니다.');
    }
  }

  return (
    <Page>
      <Navbar
        title="방 정보"
        showBack={true}
      />
      <PageContent>
        <Section>
          <FittedHashTitle
            id="basic"
            text="기본 정보"
          />
          <RoomInfo>
            <RoomTitle>{room.title}</RoomTitle>
            <RoomDesc>현재 참가자 {room.users.length}명 / {room.users.map((v: any) => v.username).join(', ')}</RoomDesc>
            <RoomShare>
              <InputToCopy
                value={shareLink}
                readOnly={true}
                inputID="input-to-copy"
              />
              <ShareButtonList>
                <ShareButton
                  onClick={onClickShareWithFacebook}
                >
                  <i className="fab fa-facebook-f" />
                  <Text>공유</Text>
                </ShareButton>
                <ShareButton
                  onClick={onClickCopy}
                >
                  <i className="fas fa-copy" />
                  <Text>복사</Text>
                </ShareButton>
              </ShareButtonList>
            </RoomShare>
          </RoomInfo>
        </Section>
        <Section>
          <FittedHashTitle
            id="goal"
            text="목표"
          />
          <SectionContent>
            {room.goal}
          </SectionContent>
        </Section>
        <Section>
          <FittedHashTitle
            id="write"
            text="글쓰기"
          />
          <FormWrap>
            <ImageWrap>
              <Label>이미지 미리보기</Label>
              <Image src={previewImage} />
            </ImageWrap>
            <Form>
              <Input
                label="오늘의 이룸"
                type="text"
                placeholder="오늘은 어떻게 노력했나요?"
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
              />
              <Input
                label="증거 사진 업로드"
                type="file"
                onChange={onChangeImage}
              />
            </Form>
          </FormWrap>
          <Button onClick={onClickCreatePost}>
            작성하기
          </Button>
        </Section>
        <Section>
          <FittedHashTitle
            id="posts"
            text="목록"
          />
          <SectionContent>
            {room.posts.map((post: any, idx: number) => {
              const { _id, author, created, closed, agreed, agreedUsers, content, image } = post;
              return (
                <PostCard
                  key={`post=${idx}`}
                  _id={_id}
                  author={author}
                  created={created}
                  closed={closed}
                  agreed={agreed}
                  agreedUsers={agreedUsers}
                  content={content}
                  image={image}
                />
              );
            })}
          </SectionContent>
        </Section>
      </PageContent>
      <Footer
        showLogout={true}
      />
    </Page>
  );
};

export default withRouter(Room);

const InputToCopy = styled(Input)`

  input {
    font-size: 10px;
    padding: 15px;
    width: 90%;
  }
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomTitle = styled(Text)`
  font-size: 1.5rem;
  letter-spacing: -0.5px;
  margin-left: 0;
`;

const RoomDesc = styled(Text)`
  color: #5b6470;
  font-size: 16px;
  font-weight: 600;
`;

const RoomShare = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-bottom: 1.8rem;
  &:not(:first-child) {
  }
`;

const SectionContent = styled(Text)`
  color: #5b6470;
  font-weight: 600;

  &:last-of-type {
    margin-bottom: 2.5rem;
  }
`;

const FittedHashTitle = styled(HashTitle)`
  width: fit-content;
`;

const FormWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Image = styled.img`
  width: 120px;
  height: 100%;
  object-fit: cover;
  margin-right: 1rem;
  border: 3px solid #E5E9F1;
  box-shadow:
    15px 15px 16px rgba(163,177,198,0.3),
    -15px -15px 16px rgba(163,177,198,0.2);
  border-radius: 30px;
`;

const Label = styled(Text)`
  font-size: 13px;
  margin-bottom: 2.5px;
  z-index: 999;
`;

const Form = styled.form`
  width: 100%;
`;

const ShareButtonList = styled.div`
  display: flex;
`;

const ShareButton = styled.div`
  display: flex;
  align-items: center;
  color: #29344a;
  border-radius: 32px;
  padding: 0rem 0.65rem;
  background-color: white;
  box-shadow: rgba(163, 177, 198, 0.6) 3px 3px 9px;
  margin-bottom: 0.5rem;
  cursor: pointer;

  i {
    font-size: 15px;
    margin-right: 0.8rem;
  }

  span {
    font-size: 18px;
    font-weight: 700;
  }

  &:first-child {
    background-color: #3b5998;
    color: white;
    margin-right: 0.5rem;

    i, span {
      text-shadow: rgba(0, 0, 255, 0.35) 3px 3px 9px;
    }

    span {
      color: white;
    }
  }
`;
