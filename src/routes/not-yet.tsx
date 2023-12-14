import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Text = styled.span`
  font-size: 42px;
  font-weight: 600;
  color: #275653;
`;

export default function NotYet() {
  return (
    <Wrapper>
      <Text>여긴 준비 중입니다..</Text>
    </Wrapper>
  );
}
