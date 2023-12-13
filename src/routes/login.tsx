import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Container,
  Error,
  Form,
  Input,
  License,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';
import styled from 'styled-components';
import AuthButton from '../components/auth-btn';

const LogoWrapper = styled.div`
  color: white;
  font-family: 'Permanent Marker', cursive;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
`;

const LogoX = styled.h1`
  font-size: 280px;
`;

const LogoMas = styled.h1`
  font-size: 140px;
`;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || email === '' || password === '') return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container $img={'public/Login-bg.jpg'}>
      <LogoWrapper>
        <LogoX>X</LogoX>
        <LogoMas>-mas</LogoMas>
      </LogoWrapper>
      <Wrapper>
        <Title>MERRY X-mas</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name='email'
            value={email}
            placeholder='Email'
            type='email'
            required
          />
          <Input
            onChange={onChange}
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            required
          />
          <Input type='submit' value={isLoading ? 'Loading...' : '로그인'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switcher>또는</Switcher>
        <AuthButton />
      </Wrapper>
      <License
        href='https://unsplash.com/ko/@tjholowaychuk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
        target='_blank'
      >
        사진: Unsplash의 Tj Holowaychuk
      </License>
    </Container>
  );
}
