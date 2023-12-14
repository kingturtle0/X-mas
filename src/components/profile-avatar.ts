import styled from 'styled-components';

export const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #c32e21;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
  position: relative;
  &:hover {
    &::after {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 26px;
      content: '💫';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const AvatarImg = styled.img`
  width: 100%;
`;

export const AvatarInput = styled.input`
  display: none;
`;

export const Name = styled.span`
  font-size: 22px;
  color: #275653;
`;

export const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #c32e21;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  svg {
    width: 35px;
    color: #275653;
  }
`;
