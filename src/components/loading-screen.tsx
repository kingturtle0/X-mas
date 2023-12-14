import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #275653;
`;

const Text = styled.span`
  font-size: 32px;
  font-family: 'Permanent Marker', cursive;
  color: #c32e21;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Merry X-mas</Text>
    </Wrapper>
  );
}
