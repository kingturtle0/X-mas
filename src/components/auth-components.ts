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
  justify-content: center;
  align-items: center;
  width: 440px;
  height: 580px;
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
  &:focus {
    outline: 2px solid #275653;
  }
  &[type='submit'] {
    cursor: pointer;
    background-color: white;
    color: #275653;
    font-weight: 600;
    font-size: 18px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: #c32e21;
`;

export const Switcher = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 90%;
  color: rgba(255, 255, 255, 0.9);
  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.4);
    margin: 0px 10px;
  }
`;

export const License = styled.a`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
  color: white;
`;
