import styled from 'styled-components';

export const Container = styled.div<{ $img: string }>`
  background-image: url(${(props) => props.$img});
  width: 100%;
  height: 100%;
  background-size: cover;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 560px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
`;

export const Title = styled.h1`
  font-size: 42px;
  font-family: 'Permanent Marker', cursive;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    background-color: #275653;
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #c32e21;
  }
`;

export const LogoWrapper = styled.div`
  color: white;
  font-family: 'Permanent Marker', cursive;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
`;

export const LogoX = styled.h1`
  font-size: 280px;
`;

export const LogoMas = styled.h1`
  font-size: 140px;
`;
