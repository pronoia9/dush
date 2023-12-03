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
    <div className='profile-container'>
      {currentUser.$id === user.id && (
        <div className='flex max-w-5xl w-full'>
          <Link to={`/profile/${id}`} className={`profile-tab rounded-l-lg ${pathname === `/profile/${id}` && '!bg-dark-3'}`}>
            <img src={'/assets/icons/posts.svg'} alt='posts' width={20} height={20} />
            Posts
          </Link>
          <Link to={`/profile/${id}/liked-posts`} className={`profile-tab rounded-r-lg ${pathname === `/profile/${id}/liked-posts` && '!bg-dark-3'}`}>
            <img src={'/assets/icons/like.svg'} alt='like' width={20} height={20} />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route index element={<GridPostList posts={currentUser.posts} showUser={false} />} />
        {currentUser.$id === user.id && <Route path='/liked-posts' element={<LikedPosts />} />}
      </Routes>
      <Outlet />
    </div>
  );
}

const StatBlock = ({ value, label }: { value: string | number; label: string }) => (
  <div className='flex-center gap-2'>
    <p className='small-semibold lg:body-bold text-primary-500'>{value}</p>
    <p className='small-medium lg:base-medium text-light-2'>{label}</p>
  </div>
);
