import styled from 'styled-components';
import PostTweetForm from '../components/post-tweet-form';
import Timeline from '../components/timeline';

const Wrapper = styled.div`
  display: grid;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
  padding: 30px 0px;
  border-left: 0.2px solid rgba(0, 0, 0, 0.1);
  border-right: 0.2px solid rgba(0, 0, 0, 0.1);
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
