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
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function CreateAccount() {
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
    const { name, email, password } = data;
    if (isLoading || name === '' || email === '' || password === '') return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(credentials.user, {
        displayName: name,
      });
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
    <Container $img={'/Join-bg.jpg'}>
      <Wrapper>
        <Title>Join to X-mas</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('name', { required: true })}
            placeholder='Name'
            type='text'
          />
          {errors.name && <Error>Name is required</Error>}
          <Input
            {...register('email', { required: true })}
            placeholder='Email'
            type='email'
          />
          {errors.email && <Error>Email is required</Error>}
          <Input
            {...register('password', { required: true })}
            placeholder='Password'
            type='password'
          />
          {errors.password && <Error>Password is required</Error>}
          <Input type='submit' value={isLoading ? 'Loading...' : '회원가입'} />
        </Form>
        {firebaseError !== '' ? <Error>{firebaseError}</Error> : null}
        <Switcher>또는</Switcher>
        <AuthButton />
      </Wrapper>
      <License
        href='https://unsplash.com/ko/@jeshoots?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
        target='_blank'>
        사진: Unsplash의 JESHOOTS.COM
      </License>
    </Container>
  );
}
