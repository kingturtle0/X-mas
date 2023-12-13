import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';

const BUTTONS = ['Github', 'Google'];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const Button = styled.span`
  margin-top: 15px;
  background-color: white;
  font-weight: 600;
  width: 100%;
  height: 45px;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &#switcher {
    background-color: #275653;
    color: white;
  }
  &:hover {
    opacity: 0.9;
  }
`;

const Logo = styled.img`
  height: 25px;
  margin-right: 10px;
`;

export default function AuthButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let authBtnText = '로 로그인하기';
  let switcherBtnText = '계정 만들기';
  let onSwitch = () => navigate('/create-account');
  if (pathname === '/create-account') {
    authBtnText = '에서 가입하기';
    switcherBtnText = '계정으로 로그인하기';
    onSwitch = () => navigate('/login');
  }

  const onClick = async (name: string) => {
    try {
      let provider;
      if (name === 'Github') {
        provider = new GithubAuthProvider();
      } else if (name === 'Google') {
        provider = new GoogleAuthProvider();
      } else return;

      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Button id='switcher' onClick={onSwitch}>
        {switcherBtnText} 🎅&rarr;
      </Button>
      {BUTTONS.map((name) => {
        return (
          <Button key={name} onClick={() => onClick(name)}>
            <Logo src={`/${name}-logo.svg`} />
            {name}
            {authBtnText}
          </Button>
        );
      })}
    </Wrapper>
  );
}
