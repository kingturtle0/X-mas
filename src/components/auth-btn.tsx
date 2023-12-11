import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const BUTTONS = ['Github', 'Google'];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 25px;
`;

const Button = styled.span`
  margin-top: 25px;
  background-color: white;
  font-weight: 600;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
  margin-right: 10px;
`;

export default function AuthButton() {
  const navigate = useNavigate();

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
      {BUTTONS.map((name) => {
        return (
          <Button key={name} onClick={() => onClick(name)}>
            <Logo src={`/${name}-logo.svg`} />
            {`Continue With ${name}`}
          </Button>
        );
      })}
    </Wrapper>
  );
}
