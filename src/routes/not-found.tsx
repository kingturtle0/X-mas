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
  font-size: 60px;
  font-weight: 600;
`;

export default function NotFound() {
  return (
    <Wrapper>
      <Text>⚠404⚠</Text>
      <Text>여긴 아무 것도 없어요!</Text>
    </Wrapper>
  );
}
