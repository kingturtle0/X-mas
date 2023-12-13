import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
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
import AuthButton from '../components/auth-btn';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || name === '' || email === '' || password === '') return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  };

  return (
    <Container $img={'public/Join-bg.jpg'}>
      <Wrapper>
        <Title>Join to X-mas</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name='name'
            value={name}
            placeholder='Name'
            type='text'
            required
          />
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
          <Input type='submit' value={isLoading ? 'Loading...' : '회원가입'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switcher>또는</Switcher>
        <AuthButton />
      </Wrapper>
      <License
        href='https://unsplash.com/ko/@jeshoots?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
        target='_blank'
      >
        사진: Unsplash의 JESHOOTS.COM
      </License>
    </Container>
  );
}
