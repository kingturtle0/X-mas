import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AvatarImg, AvatarWrapper } from './profile-avatar';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 0.2px solid rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  width: 90%;
`;

const TextAreaWrapper = styled.div`
  position: relative;
`;

const TextArea = styled.textarea`
  border: 2px solid #275653;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #275653;
  background-color: white;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #c32e21;
  }
`;

const LimitCount = styled.label`
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: #275653;
  opacity: 0.6;
`;

const ButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileInputWrapper = styled.div`
  padding: 10px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(39, 86, 83, 0.2);
  }
  cursor: pointer;
`;

const AttachFileButton = styled.label`
  cursor: pointer;
  color: #275653;
  svg {
    width: 25px;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: ${(props) =>
    props.disabled ? 'rgba(195, 46, 33, 0.6)' : '#c32e21'};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  &:hover,
  &:active {
    opacity: ${(props) => (props.disabled ? '1' : '0.9')};
  }
`;

const MAX_LENGTH = 180;

export default function PostTweetForm() {
  const [isLoading, SetIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const user = auth.currentUser;
  const avatar = user?.photoURL;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1048576) return;
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === '' || tweet.length > MAX_LENGTH) return;

    try {
      SetIsLoading(true);
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || 'Anonymous',
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: url });
        setTweet('');
        setFile(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      SetIsLoading(false);
      setTweet('');
    }
  };

  return (
    <Wrapper>
      <AvatarWrapper>
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'>
            <path d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        )}
      </AvatarWrapper>
      <Form onSubmit={onSubmit}>
        <TextAreaWrapper>
          <TextArea
            id='text'
            required
            rows={4}
            maxLength={MAX_LENGTH}
            onChange={onChange}
            value={tweet}
            placeholder='Merry X-mas!'
          />
          <LimitCount htmlFor='text'>{`${tweet.length} / ${MAX_LENGTH}`}</LimitCount>
        </TextAreaWrapper>
        <ButtonsWrapper>
          <FileInputWrapper>
            <AttachFileInput
              onChange={onFileChange}
              id='file'
              type='file'
              accept='image/*'
            />
            <AttachFileButton htmlFor='file'>
              {file ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'>
                  <path d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'>
                  <path d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
                </svg>
              )}
            </AttachFileButton>
          </FileInputWrapper>
          <SubmitButton
            type='submit'
            value={isLoading ? 'Posting...' : 'Post X-mas'}
            disabled={!tweet}
          />
        </ButtonsWrapper>
      </Form>
    </Wrapper>
  );
}
