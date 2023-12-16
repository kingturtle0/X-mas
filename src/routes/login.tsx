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
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [firebaseError, setFirebaseError] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setFirebaseError('');
    const { email, password } = data;
    if (isLoading || email === '' || password === '') return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container $img={'/Login-bg.jpg'}>
      <LogoWrapper>
        <LogoX>X</LogoX>
        <LogoMas>-mas</LogoMas>
      </LogoWrapper>
      <Wrapper>
        <Title>MERRY X-mas</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email', { required: true })}
            placeholder='Email'
            type='email'
          />
          {errors.email && <Error>This field is required</Error>}
          <Input
            {...register('password', { required: true })}
            placeholder='Password'
            type='password'
          />
          {errors.password && <Error>This field is required</Error>}
          <Input type='submit' value={isLoading ? 'Loading...' : '로그인'} />
        </Form>
        {firebaseError !== '' ? <Error>{firebaseError}</Error> : null}
        <Switcher>또는</Switcher>
        <AuthButton />
      </Wrapper>
      <License
        href='https://unsplash.com/ko/@tjholowaychuk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
        target='_blank'>
        사진: Unsplash의 Tj Holowaychuk
      </License>
    </Container>
  );
}
