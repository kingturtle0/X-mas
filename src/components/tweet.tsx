import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { ITweet } from './timeline';
import { styled } from 'styled-components';
import { deleteObject, ref } from 'firebase/storage';
import { AvatarImg, AvatarWrapper } from './profile-avatar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 0.2px solid rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Photo = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 15px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  border: 0;
  border-radius: 50%;
  background-color: #fff;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(195, 46, 33, 0.2);
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const avatar = user?.photoURL;

  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id)); // delete tweet
      if (photo) {
        await deleteObject(ref(storage, `tweets/${user.uid}/${id}`)); // delete photo
      }
    } catch (error) {
      console.log(error);
    } finally {
      alert('delete success!');
    }
  };
  return (
    <Wrapper>
      <Row>
        <UserWrapper>
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
          <Username>{username}</Username>
        </UserWrapper>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>❌</DeleteButton>
        ) : null}
      </Row>
      <Row>
        <Payload>{tweet}</Payload>
      </Row>
      <Row>{photo ? <Photo src={photo} /> : null}</Row>
    </Wrapper>
  );
}
