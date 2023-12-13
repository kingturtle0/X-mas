import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';

const Wrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 2.5fr 1fr;
  width: 100%;
  height: 100%;
  max-width: 1000px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 50px;
  color: #275653;
  padding: 0px 20px;
  width: fit-content;
  font-size: 20px;
  svg {
    width: 30px;
    margin-right: 20px;
  }
  &.log-out svg {
    fill: #c32e21;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &.logo {
    font-family: 'Permanent Marker', cursive;
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

export default function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  const onLogOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };

  return (
    <Wrapper>
      <Menu>
        <CustomLink to='/'>
          <MenuItem className='logo'>X-mas</MenuItem>
        </CustomLink>
        <CustomLink to='/'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.0'
              stroke='currentColor'
            >
              <path d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' />
            </svg>
            Home
          </MenuItem>
        </CustomLink>
        <CustomLink to='/profile'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.0'
              stroke='currentColor'
            >
              <path d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
            </svg>
            Explore
          </MenuItem>
        </CustomLink>
        <CustomLink to='/profile'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.0'
              stroke='currentColor'
            >
              <path d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' />
            </svg>
            Notifications
          </MenuItem>
        </CustomLink>
        <CustomLink to='/profile'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.0'
              stroke='currentColor'
            >
              <path d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z' />
            </svg>
            Bookmarks
          </MenuItem>
        </CustomLink>
        <CustomLink to='/profile'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.0'
              stroke='currentColor'
            >
              <path d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z' />
              <path d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
            Settings
          </MenuItem>
        </CustomLink>

        <CustomLink to='/profile'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' />
            </svg>
          </MenuItem>
        </CustomLink>
        <MenuItem onClick={onLogOut} className='log-out'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z' />
          </svg>
        </MenuItem>
      </Menu>
      <Outlet />
      <MenuItem>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2.0'
          stroke='currentColor'
        >
          <path d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
        </svg>
        검색
      </MenuItem>
    </Wrapper>
  );
}
