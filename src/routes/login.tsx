import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Container,
  Error,
  Form,
  Input,
  LogoMas,
  LogoWrapper,
  LogoX,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';
import AuthButton from '../components/auth-btn';

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
        <Title>Log into X-mas</Title>
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
          <Input type='submit' value={isLoading ? 'Loading...' : 'Log In'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switcher>
          Don't have an account?{' '}
          <Link to='/create-account'>Create One &rarr;</Link>
        </Switcher>
        <AuthButton />
      </Wrapper>
    </Container>
  );
}
