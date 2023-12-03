import { Route, Routes, Link, Outlet, useParams, useLocation } from 'react-router-dom';

import { Button, GridPostList, LikedPosts, Loader } from '@/components';
import { useUserContext } from '@/context';
import { useGetUserById } from '@/lib/react-query';

export default function Profile() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: currentUser } = useGetUserById(id || '');

  return !currentUser ? (
    <div className='flex-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <div className='profile-container'></div>
  );
}
